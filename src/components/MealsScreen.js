export default function MealsScreen({ recipes, onOpenRecipe }) {
  return (
    <div className="meals-screen">
      <h1 className="page-title">Meals</h1>
      <p className="screen-lead">Browse saved dinners — open any card for ingredients and automatic family swaps.</p>
      <div className="meals-grid">
        {recipes.map((r) => (
          <button
            key={r.id}
            type="button"
            className="meal-tile"
            onClick={() => onOpenRecipe(r.id)}
          >
            <span className="meal-tile__name">{r.name}</span>
            <span className="meal-tile__meta">
              {r.minutes} min · {r.tags[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
