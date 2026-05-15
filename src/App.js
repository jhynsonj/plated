import { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import WeekPlanner from './components/WeekPlanner';
import MealsScreen from './components/MealsScreen';
import FamilyScreen from './components/FamilyScreen';
import GroceryScreen from './components/GroceryScreen';
import RecipeDetail from './components/RecipeDetail';
import { IconHome, IconCalendar, IconUtensils, IconCart, IconPeople } from './components/NavIcons';
import { defaultWeekPlan, initialFamily, recipes } from './data/mockData';
import { generateFiveDinners } from './utils/mealPlanGenerator';

const TABS = [
  { id: 'home', label: 'Home', Icon: IconHome },
  { id: 'week', label: 'This Week', Icon: IconCalendar },
  { id: 'meals', label: 'Meals', Icon: IconUtensils },
  { id: 'grocery', label: 'Grocery', Icon: IconCart },
  { id: 'family', label: 'Family', Icon: IconPeople },
];

export default function App() {
  const [tab, setTab] = useState('home');
  const [weekPlan, setWeekPlan] = useState(() => defaultWeekPlan());
  const [family, setFamily] = useState(() => initialFamily);
  const [recipeOpen, setRecipeOpen] = useState(null);
  const [weeklyBudget, setWeeklyBudget] = useState(75);
  const [pantryItems, setPantryItems] = useState([
    'olive oil',
    'rice',
    'garlic',
    'salt',
    'soy sauce',
  ]);
  const [plannerSummary, setPlannerSummary] = useState(null);

  const handleChangeMeal = (dayKey, recipeId) => {
    setWeekPlan((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], dinner: recipeId || undefined },
    }));
  };

  const handleGeneratePlan = () => {
    const result = generateFiveDinners(recipes, Number(weeklyBudget) || 0, pantryItems);
    setWeekPlan((prev) => ({ ...prev, ...result.assignments }));
    setPlannerSummary({
      shopTotal: result.shopTotal,
      withinBudget: result.withinBudget,
      pantryItemsUsed: result.pantryItemsUsed,
      note: result.note,
    });
  };

  const openRecipe = (id) => {
    setRecipeOpen(id);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header__brand">
          <div>
            <h1 className="app-header__title">Plated</h1>
            <p className="app-header__tagline">Meal planning for your table</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {tab === 'home' && (
          <HomeScreen
            weekPlan={weekPlan}
            pantryItems={pantryItems}
            family={family}
            onOpenRecipe={openRecipe}
            onNavigate={setTab}
          />
        )}
        {tab === 'week' && (
          <WeekPlanner
            weekPlan={weekPlan}
            recipes={recipes}
            onSelectRecipe={setRecipeOpen}
            onChangeMeal={handleChangeMeal}
            weeklyBudget={weeklyBudget}
            onBudgetChange={setWeeklyBudget}
            pantryItems={pantryItems}
            onAddPantry={(item) => setPantryItems((p) => (p.includes(item) ? p : [...p, item]))}
            onRemovePantry={(item) => setPantryItems((p) => p.filter((x) => x !== item))}
            onGeneratePlan={handleGeneratePlan}
            plannerSummary={plannerSummary}
          />
        )}
        {tab === 'meals' && <MealsScreen recipes={recipes} onOpenRecipe={openRecipe} />}
        {tab === 'grocery' && <GroceryScreen weekPlan={weekPlan} pantryItems={pantryItems} />}
        {tab === 'family' && <FamilyScreen family={family} onUpdateFamily={setFamily} />}
      </main>

      <nav className="bottom-nav" aria-label="Main">
        {TABS.map((t) => {
          const Icon = t.Icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={`bottom-nav__btn ${active ? 'bottom-nav__btn--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <Icon className="bottom-nav__icon" />
              <span className="bottom-nav__label">{t.label}</span>
            </button>
          );
        })}
      </nav>

      {recipeOpen && (
        <RecipeDetail recipeId={recipeOpen} family={family} onClose={() => setRecipeOpen(null)} />
      )}
    </div>
  );
}
