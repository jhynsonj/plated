import { estimateRecipeShopCost, countPantryHits } from './ingredientPrices';

export const WEEKDAY_DINNER_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri'];

function* indexCombinations(n, k) {
  if (k < 0 || k > n) return;
  const idx = Array.from({ length: k }, (_, i) => i);
  yield [...idx];
  while (true) {
    let i = k - 1;
    while (i >= 0 && idx[i] === i + n - k) i -= 1;
    if (i < 0) return;
    idx[i] += 1;
    for (let j = i + 1; j < k; j += 1) idx[j] = idx[j - 1] + 1;
    yield [...idx];
  }
}

/**
 * Picks 5 distinct recipes for Mon–Fri: maximize pantry overlap, stay within budget when possible.
 * @returns {{ assignments: Record<string, string>, shopTotal: number, withinBudget: boolean, pantryItemsUsed: number, note: string }}
 */
export function generateFiveDinners(recipes, weeklyBudgetUsd, pantryLines) {
  const pantry = pantryLines.map((p) => p.trim()).filter(Boolean);
  const n = recipes.length;

  if (n < 5) {
    return {
      assignments: {},
      shopTotal: 0,
      withinBudget: false,
      pantryItemsUsed: 0,
      note: 'Add at least five recipes to generate a week.',
    };
  }

  const meta = recipes.map((r) => ({
    id: r.id,
    shopCost: estimateRecipeShopCost(r, pantry),
    hits: countPantryHits(r, pantry),
  }));

  let best = null;
  for (const combo of indexCombinations(n, 5)) {
    const total = combo.reduce((s, i) => s + meta[i].shopCost, 0);
    if (total > weeklyBudgetUsd) continue;
    const hits = combo.reduce((s, i) => s + meta[i].hits, 0);
    const score = hits * 1000 - total;
    if (!best || score > best.score) {
      best = { combo, total, hits, score };
    }
  }

  if (best) {
    const assignments = {};
    WEEKDAY_DINNER_KEYS.forEach((day, i) => {
      assignments[day] = recipes[best.combo[i]].id;
    });
    return {
      assignments,
      shopTotal: Math.round(best.total * 100) / 100,
      withinBudget: true,
      pantryItemsUsed: best.hits,
      note: 'Plan fits your budget and favors what you already have.',
    };
  }

  const byCost = [...meta].map((m, i) => ({ ...m, i })).sort((a, b) => a.shopCost - b.shopCost);
  const fallbackCombo = byCost.slice(0, 5).map((x) => x.i);
  const total = fallbackCombo.reduce((s, i) => s + meta[i].shopCost, 0);
  const hits = fallbackCombo.reduce((s, i) => s + meta[i].hits, 0);
  const assignments = {};
  WEEKDAY_DINNER_KEYS.forEach((day, j) => {
    assignments[day] = recipes[fallbackCombo[j]].id;
  });

  return {
    assignments,
    shopTotal: Math.round(total * 100) / 100,
    withinBudget: false,
    pantryItemsUsed: hits,
    note:
      weeklyBudgetUsd > 0
        ? `No five-meal combo stayed under $${weeklyBudgetUsd}. Showing the five cheapest remaining shop lists—raise the budget or add more pantry items.`
        : 'Set a weekly budget above $0 to filter plans.',
  };
}
