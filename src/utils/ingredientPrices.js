/**
 * Rough grocery estimates (USD) for demo planning — not store-specific.
 */

const PATTERNS = [
  [/chicken|turkey|beef|pork|sausage|meat|fish|salmon|shrimp|tuna|anchovy|bacon|ham/i, 6.5],
  [/lentil|bean|black bean|chickpea/i, 1.25],
  [/pasta|penne|spaghetti|noodle|tortilla/i, 2.25],
  [/rice|cooked rice/i, 1.0],
  [/potato/i, 2.5],
  [/cream|milk|cheese|parmesan|butter|yogurt|ricotta/i, 3.5],
  [/broccoli|pepper|carrot|asparagus|peas|lettuce|tomato|onion|shallot|celery|snap pea|green bean|mushroom/i, 2.0],
  [/lemon|lime|ginger|garlic|thyme|herb|spice|seasoning|cumin/i, 1.5],
  [/oil|sesame oil|olive oil/i, 2.75],
  [/soy sauce|broth|stock|vegetable broth/i, 2.0],
  [/egg/i, 2.5],
  [/bread|bun|roll/i, 2.5],
  [/tofu|tempeh/i, 3.0],
];

const DEFAULT_PRICE = 2.0;

export function estimateIngredientPriceUSD(name) {
  const s = String(name);
  for (const [re, price] of PATTERNS) {
    if (re.test(s)) return price;
  }
  return DEFAULT_PRICE;
}

export function ingredientMatchesPantry(ingredientName, pantryList) {
  const n = normalize(ingredientName);
  if (!n) return false;
  return pantryList.some((p) => pantryLineMatchesIngredient(n, normalize(p)));
}

function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pantryLineMatchesIngredient(ingNorm, panNorm) {
  if (!panNorm) return false;
  if (ingNorm.includes(panNorm)) return true;
  if (panNorm.includes(ingNorm)) return true;
  const ingWords = ingNorm.split(' ').filter((w) => w.length > 2);
  const panWords = panNorm.split(' ').filter((w) => w.length > 2);
  return ingWords.some((w) => panWords.includes(w) || panNorm.includes(w));
}

export function estimateRecipeShopCost(recipe, pantryList) {
  return recipe.ingredients.reduce((sum, ing) => {
    if (ingredientMatchesPantry(ing.name, pantryList)) return sum;
    return sum + estimateIngredientPriceUSD(ing.name);
  }, 0);
}

export function countPantryHits(recipe, pantryList) {
  return recipe.ingredients.filter((ing) => ingredientMatchesPantry(ing.name, pantryList)).length;
}
