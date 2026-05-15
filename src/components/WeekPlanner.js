import { useState } from 'react';
import { DAYS } from '../data/mockData';

export default function WeekPlanner({
  weekPlan,
  recipes,
  onSelectRecipe,
  onChangeMeal,
  weeklyBudget,
  onBudgetChange,
  pantryItems,
  onAddPantry,
  onRemovePantry,
  onGeneratePlan,
  plannerSummary,
}) {
  const [pantryDraft, setPantryDraft] = useState('');

  const handleAddPantry = (e) => {
    e.preventDefault();
    const line = pantryDraft.trim();
    if (!line) return;
    onAddPantry(line);
    setPantryDraft('');
  };

  return (
    <div className="week-planner">
      <h1 className="page-title">This Week</h1>
      <section className="planner-panel" aria-labelledby="planner-heading">
        <h2 id="planner-heading" className="planner-panel__title">
          Smart week (Mon–Fri)
        </h2>
        <p className="planner-panel__lead">
          Set a grocery budget and what you already have; we’ll pick five dinners that lean on your pantry and
          stay near budget (estimates for planning only).
        </p>

        <label className="budget-field">
          <span className="budget-field__label">Weekly dinner budget (USD)</span>
          <input
            type="number"
            min={0}
            step={5}
            className="budget-field__input"
            value={weeklyBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            aria-describedby="budget-hint"
          />
        </label>
        <p id="budget-hint" className="field-hint">
          Covers shopping for ingredients you don’t already list in your pantry.
        </p>

        <form className="pantry-form" onSubmit={handleAddPantry}>
          <span className="pantry-form__label">Pantry &amp; staples at home</span>
          <div className="pantry-form__row">
            <input
              className="pantry-form__input"
              placeholder="e.g. olive oil, rice, garlic…"
              value={pantryDraft}
              onChange={(e) => setPantryDraft(e.target.value)}
              aria-label="Add pantry item"
            />
            <button type="submit" className="btn btn-primary pantry-form__add">
              Add
            </button>
          </div>
        </form>

        {pantryItems.length > 0 && (
          <ul className="pantry-chips" aria-label="Pantry list">
            {pantryItems.map((item) => (
              <li key={item} className="pantry-chip">
                <span>{item}</span>
                <button
                  type="button"
                  className="pantry-chip__x"
                  onClick={() => onRemovePantry(item)}
                  aria-label={`Remove ${item}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="button" className="btn btn-primary btn-block planner-generate" onClick={onGeneratePlan}>
          Generate 5 dinners (Mon–Fri)
        </button>

        {plannerSummary && (
          <div
            className={`plan-summary ${plannerSummary.withinBudget ? 'plan-summary--ok' : 'plan-summary--warn'}`}
            role="status"
          >
            <p className="plan-summary__line">
              <strong>Est. shop for Mon–Fri:</strong> ${plannerSummary.shopTotal.toFixed(2)} of $
              {Number(weeklyBudget).toFixed(0)} budget
            </p>
            <p className="plan-summary__line">
              Pantry matched about <strong>{plannerSummary.pantryItemsUsed}</strong> ingredient lines across those five
              meals (more overlap = less to buy).
            </p>
            <p className="plan-summary__note">{plannerSummary.note}</p>
          </div>
        )}
      </section>

      <p className="screen-lead screen-lead--tight">Tap a meal for steps and automatic family swaps.</p>
      <div className="day-list">
        {DAYS.map((day) => {
          const recipeId = weekPlan[day.key]?.dinner;
          const recipe = recipes.find((r) => r.id === recipeId);
          return (
            <article key={day.key} className="day-card">
              <header className="day-card__head">
                <span className="day-card__dow">{day.label}</span>
                <span className="day-card__full">{day.full}</span>
              </header>
              <div className="day-card__body">
                <label className="meal-picker">
                  <span className="meal-picker__label">Dinner</span>
                  <select
                    className="meal-picker__select"
                    value={recipeId || ''}
                    onChange={(e) => onChangeMeal(day.key, e.target.value)}
                    aria-label={`Dinner for ${day.full}`}
                  >
                    <option value="">— Free night —</option>
                    {recipes.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </label>
                {recipe ? (
                  <button
                    type="button"
                    className="recipe-preview"
                    onClick={() => onSelectRecipe(recipe.id)}
                  >
                    <span className="recipe-preview__name">{recipe.name}</span>
                    <span className="recipe-preview__meta">
                      {recipe.minutes} min · {recipe.tags.join(' · ')}
                    </span>
                  </button>
                ) : (
                  <p className="day-card__empty">No dinner planned — pick a recipe or generate Mon–Fri above.</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
