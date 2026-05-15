import { DAYS, recipeById } from '../data/mockData';
import { ingredientMatchesPantry } from './ingredientPrices';

/** Merge ingredients from all planned meals (same name+unit aggregated). */
export function buildGroceryItems(weekPlan) {
  const map = new Map();

  DAYS.forEach((d) => {
    const recipeId = weekPlan[d.key]?.dinner;
    if (!recipeId) return;
    const recipe = recipeById(recipeId);
    if (!recipe) return;

    recipe.ingredients.forEach((ing) => {
      const key = `${ing.name.toLowerCase()}|${ing.unit}`;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          name: ing.name,
          unit: ing.unit,
          amounts: [ing.qty],
        });
      } else {
        existing.amounts.push(ing.qty);
      }
    });
  });

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Same merge as {@link buildGroceryItems}, then drops lines that match the pantry list
 * (same fuzzy rules as meal planning).
 */
export function buildGroceryItemsExcludingPantry(weekPlan, pantryItems) {
  const pantry = Array.isArray(pantryItems) ? pantryItems : [];
  return buildGroceryItems(weekPlan).filter((item) => !ingredientMatchesPantry(item.name, pantry));
}

export function countPantryIngredientsSkipped(weekPlan, pantryItems) {
  const merged = buildGroceryItems(weekPlan);
  const pantry = Array.isArray(pantryItems) ? pantryItems : [];
  return merged.filter((item) => ingredientMatchesPantry(item.name, pantry)).length;
}
