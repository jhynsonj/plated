import { recipeById } from '../data/mockData';
import { adaptationsForStep } from '../engine/substitutionEngine';

export default function RecipeDetail({ recipeId, family, onClose }) {
  if (!recipeId) return null;
  const recipe = recipeById(recipeId);
  if (!recipe) return null;

  const hasAnyTags = family.some((m) => (m.restrictions || []).length > 0);

  return (
    <div className="recipe-overlay" role="dialog" aria-modal="true" aria-labelledby="recipe-title">
      <div className="recipe-sheet">
        <header className="recipe-sheet__head">
          <button type="button" className="btn btn-ghost recipe-sheet__close" onClick={onClose}>
            Close
          </button>
          <h2 id="recipe-title" className="recipe-sheet__title">
            {recipe.name}
          </h2>
          <p className="recipe-sheet__sub">
            {recipe.minutes} min · {recipe.tags.join(' · ')}
          </p>
        </header>

        <section className="recipe-section">
          <h3 className="recipe-section__title">Ingredients</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing) => (
              <li key={`${ing.name}-${ing.qty}`}>
                <strong>{ing.name}</strong>{' '}
                <span className="ingredient-qty">
                  {ing.qty} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h3 className="recipe-section__title">Steps &amp; automatic adaptations</h3>
          <p className="recipe-engine-hint">
            Swaps are generated from each person’s dietary tags on the Family tab.
            {!hasAnyTags && (
              <span className="recipe-engine-hint__note"> Add tags to family members to see changes here.</span>
            )}
          </p>
          <ol className="step-list">
            {recipe.steps.map((step, i) => {
              const adaptations = adaptationsForStep(recipe, i, family);
              return (
                <li key={i} className="step-card">
                  <span className="step-card__num">{i + 1}</span>
                  <div className="step-card__body">
                    <p className="step-card__text">{step.text}</p>
                    {adaptations.length > 0 ? (
                      <div className="adaptation-box" role="region" aria-label={`Adaptations for step ${i + 1}`}>
                        <span className="adaptation-box__title">Changes by person</span>
                        {adaptations.map((entry) => (
                          <div key={entry.memberId} className="adapt-person">
                            <div className="adapt-person__name">{entry.memberName}</div>
                            <ul className="adapt-person__list">
                              {entry.items.map((it, j) => (
                                <li key={`${it.restriction}-${j}`} className="adapt-person__item">
                                  <span className="adapt-person__tag">{it.restriction}</span>
                                  <span className="adapt-person__msg">{stripLeadingName(it.message, entry.memberName)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}

/** Avoid repeating the person's name at the start of every line (engine includes it for standalone use). */
function stripLeadingName(message, name) {
  const prefix = `${name}: `;
  if (message.startsWith(prefix)) return message.slice(prefix.length);
  return message;
}
