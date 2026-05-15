import { recipeById } from '../data/mockData';
import { todayPlanDayKey } from '../utils/dateUtils';
import { getHomeStats } from '../utils/homeStats';
import { DAYS } from '../data/mockData';

function greetingLabel() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({
  weekPlan,
  pantryItems,
  family,
  onOpenRecipe,
  onNavigate,
}) {
  const todayKey = todayPlanDayKey();
  const todayMeta = DAYS.find((d) => d.key === todayKey);
  const tonightId = weekPlan[todayKey]?.dinner;
  const tonightRecipe = tonightId ? recipeById(tonightId) : null;
  const stats = getHomeStats(weekPlan, pantryItems);

  return (
    <div className="home-screen">
      <p className="home-greeting">{greetingLabel()}</p>
      <h1 className="home-title">Tonight at your table</h1>

      {tonightRecipe ? (
        <button
          type="button"
          className="tonight-hero"
          onClick={() => onOpenRecipe(tonightRecipe.id)}
        >
          <span className="tonight-hero__eyebrow">Today · {todayMeta?.full}</span>
          <span className="tonight-hero__name">{tonightRecipe.name}</span>
          <span className="tonight-hero__meta">
            {tonightRecipe.minutes} min · {tonightRecipe.tags.slice(0, 2).join(' · ')}
          </span>
          <span className="tonight-hero__cta">View recipe →</span>
        </button>
      ) : (
        <button type="button" className="tonight-hero tonight-hero--empty" onClick={() => onNavigate('week')}>
          <span className="tonight-hero__eyebrow">Today · {todayMeta?.full}</span>
          <span className="tonight-hero__name">Nothing planned yet</span>
          <span className="tonight-hero__meta">Add tonight’s dinner on This Week — we’ll keep it cozy.</span>
          <span className="tonight-hero__cta">Plan this week →</span>
        </button>
      )}

      <div className="stat-grid" aria-label="Week snapshot">
        <div className="stat-card">
          <span className="stat-card__value">{stats.mealsPlanned}</span>
          <span className="stat-card__label">Meals planned</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">${stats.groceryCost.toFixed(0)}</span>
          <span className="stat-card__label">Est. grocery</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{stats.itemsLeft}</span>
          <span className="stat-card__label">Items to buy</span>
        </div>
      </div>

      <section className="home-family-section" aria-labelledby="home-family-heading">
        <div className="home-family-head">
          <h2 id="home-family-heading" className="section-heading">
            Your people
          </h2>
          <button type="button" className="text-link" onClick={() => onNavigate('family')}>
            Edit
          </button>
        </div>
        <p className="home-family-lead">Emoji avatars show who’s at the table; amber dots mean dietary notes.</p>
        <div className="family-strip" role="list">
          {family.map((m) => (
            <button
              key={m.id}
              type="button"
              className="family-strip__item"
              onClick={() => onNavigate('family')}
              role="listitem"
            >
              <span className="family-avatar" aria-hidden>
                <span className="family-avatar__face">{m.emoji || '👤'}</span>
                {(m.restrictions || []).length > 0 && (
                  <span className="family-avatar__dot" title="Has dietary restrictions" />
                )}
              </span>
              <span className="family-strip__name">{m.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
