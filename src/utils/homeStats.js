import { DAYS, recipeById } from '../data/mockData';
import { estimateRecipeShopCost } from './ingredientPrices';
import { buildGroceryItemsExcludingPantry } from './grocery';

export function getHomeStats(weekPlan, pantryItems) {
  let mealsPlanned = 0;
  let groceryCost = 0;

  DAYS.forEach((d) => {
    const id = weekPlan[d.key]?.dinner;
    if (!id) return;
    mealsPlanned += 1;
    const recipe = recipeById(id);
    if (recipe) {
      groceryCost += estimateRecipeShopCost(recipe, pantryItems);
    }
  });

  const groceryItems = buildGroceryItemsExcludingPantry(weekPlan, pantryItems);

  return {
    mealsPlanned,
    groceryCost: Math.round(groceryCost * 100) / 100,
    itemsLeft: groceryItems.length,
  };
}
