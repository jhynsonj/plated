const RESTRICTION_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Nut-free',
  'No honey',
  'No spice',
  'Soft foods',
  'Shellfish-free',
];

function uid() {
  return `m-${Math.random().toString(36).slice(2, 9)}`;
}

export default function FamilyScreen({ family, onUpdateFamily }) {
  const addMember = () => {
    onUpdateFamily([
      ...family,
      { id: uid(), name: 'New member', emoji: '👤', role: '', restrictions: [] },
    ]);
  };

  const updateMember = (id, patch) => {
    onUpdateFamily(family.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };

  const removeMember = (id) => {
    onUpdateFamily(family.filter((m) => m.id !== id));
  };

  const toggleRestriction = (memberId, label) => {
    const m = family.find((x) => x.id === memberId);
    if (!m) return;
    const has = m.restrictions.includes(label);
    const next = has ? m.restrictions.filter((r) => r !== label) : [...m.restrictions, label];
    updateMember(memberId, { restrictions: next });
  };

  return (
    <div className="family-screen">
      <h1 className="page-title">Family</h1>
      <p className="screen-lead">
        Profiles drive substitution hints in recipes and help you shop with everyone in mind.
      </p>
      <button type="button" className="btn btn-primary btn-block" onClick={addMember}>
        Add family member
      </button>
      <ul className="family-list">
        {family.map((member) => (
          <li key={member.id} className="family-card">
            <div className="family-card__row">
              <div className="family-card__avatar-col">
                <span className="family-avatar family-avatar--lg" aria-hidden>
                  <span className="family-avatar__face">{member.emoji || '👤'}</span>
                  {(member.restrictions || []).length > 0 && (
                    <span className="family-avatar__dot" title="Dietary restrictions" />
                  )}
                </span>
              </div>
              <div className="family-card__fields">
                <input
                  className="family-card__name"
                  value={member.name}
                  onChange={(e) => updateMember(member.id, { name: e.target.value })}
                  aria-label={`Name for ${member.name}`}
                />
                <input
                  className="family-card__role"
                  placeholder="Role (e.g. Kid)"
                  value={member.role}
                  onChange={(e) => updateMember(member.id, { role: e.target.value })}
                  aria-label={`Role for ${member.name}`}
                />
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={() => removeMember(member.id)}
                aria-label={`Remove ${member.name}`}
              >
                ×
              </button>
            </div>
            <div className="chip-grid">
              {RESTRICTION_OPTIONS.map((opt) => {
                const on = member.restrictions.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`chip ${on ? 'chip--on' : ''}`}
                    onClick={() => toggleRestriction(member.id, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
