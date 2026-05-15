import { HEB_CURBSIDE_URL } from '../constants/heb';
import { buildGroceryItemsExcludingPantry, countPantryIngredientsSkipped } from '../utils/grocery';

export default function GroceryScreen({ weekPlan, pantryItems }) {
  const items = buildGroceryItemsExcludingPantry(weekPlan, pantryItems);
  const skipped = countPantryIngredientsSkipped(weekPlan, pantryItems);

  return (
    <div className="grocery-screen">
      <h1 className="page-title">Grocery</h1>
      <p className="screen-lead">
        Everything from this week’s dinners, merged by ingredient. Items that match your pantry on the Week tab are left
        off so you only shop what you still need.
      </p>

      {skipped > 0 && (
        <p className="grocery-pantry-note" role="status">
          Skipped <strong>{skipped}</strong> ingredient line{skipped === 1 ? '' : 's'} already covered by your pantry list.
        </p>
      )}

      <a
        className="btn btn-heb btn-block"
        href={HEB_CURBSIDE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Shop H-E-B curbside pickup
      </a>
      <p className="grocery-heb-hint">Opens H-E-B’s curbside &amp; delivery page in a new tab — add items from your list there.</p>

      <ul className="grocery-list">
        {items.map((item) => (
          <li key={`${item.name}-${item.unit}`} className="grocery-row">
            <label className="grocery-row__label">
              <input type="checkbox" className="grocery-row__check" />
              <span className="grocery-row__text">
                <span className="grocery-row__name">{item.name}</span>
                <span className="grocery-row__qty">
                  {item.amounts.join(' + ')} {item.unit}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="empty-hint">
          {skipped > 0
            ? 'Everything on your plan is covered by your pantry — adjust meals or pantry items if you still need to shop.'
            : 'Plan some dinners on the Week tab first.'}
        </p>
      )}
    </div>
  );
}
