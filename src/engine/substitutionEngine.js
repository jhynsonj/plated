/**
 * Rule-based substitution engine: adapts each recipe step from family dietary tags.
 * Extend RULES when you add new restriction labels in the Family screen.
 */

function buildSignals(recipe) {
  const ingredientBlob = recipe.ingredients.map((i) => i.name.toLowerCase()).join(' ');
  const stepBlob = recipe.steps.map((s) => s.text.toLowerCase()).join(' ');
  const blob = `${ingredientBlob} ${stepBlob}`;
  return {
    ingredientBlob,
    stepBlob,
    blob,
    hasDairy: /\b(butter|cream|milk|cheese|parmesan|ricotta|yogurt|sour cream|heavy cream)\b/i.test(blob),
    hasMeat:
      /\b(chicken|beef|pork|turkey|fish|salmon|tuna|shrimp|meat|ground beef|ground turkey|bacon|anchovy)\b/i.test(
        blob,
      ),
    hasNuts: /\b(peanut|almond|cashew|pecan|walnut|hazelnut|pistachio|macadamia|pesto|tree nut)\b/i.test(blob),
    hasHoney: /\bhoney\b/.test(blob),
    hasSoySauce: /\bsoy sauce\b/.test(blob),
    hasPasta: /\b(pasta|penne|spaghetti|noodle|fettuccine)\b/i.test(blob),
    hasShellfish: /\b(shrimp|crab|lobster|shellfish|mussel|clam|oyster|scallop)\b/i.test(blob),
    hasEgg: /\b(eggs?|egg white|yolk)\b/i.test(blob),
    hasTacoSeasoning: /\btaco seasoning\b/i.test(blob),
  };
}

function dedupeMessages(list) {
  const seen = new Set();
  return list.filter((m) => {
    const k = m.toLowerCase().trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function dairyMessages(name, ctx) {
  const t = ctx.stepLower;
  const out = [];
  if (/\bbutter\b/.test(t)) {
    out.push(`${name}: Use olive oil or plant-based butter instead of dairy butter here.`);
  }
  if (/\b(heavy cream|cream)\b/.test(t) && !/\bcoconut cream\b/.test(t)) {
    out.push(`${name}: Swap cream for coconut cream or extra broth + a splash of unsweetened DF milk.`);
  }
  if (/\b(cheese|parmesan|ricotta|shredded cheese)\b/.test(t)) {
    out.push(`${name}: Omit cheese or use a dairy-free shreds / parm-style swap on her portion.`);
  }
  if (/\bmilk\b/.test(t)) {
    out.push(`${name}: Use unsweetened dairy-free milk in this step.`);
  }
  if (/\b(yogurt|sour cream)\b/.test(t)) {
    out.push(`${name}: Use coconut yogurt or DF sour cream alternative.`);
  }
  if (
    out.length === 0 &&
    ctx.signals.hasDairy &&
    /dot|finish|sprinkle|toss with|simmer gently|broth and cream/i.test(t)
  ) {
    out.push(
      `${name}: This step finishes with dairy elsewhere in the recipe—plate her portion before adding cream, butter, or cheese, or use DF substitutes in her batch.`,
    );
  }
  return out;
}

function meatMessages(name, ctx) {
  if (!ctx.signals.hasMeat) return [];
  const t = ctx.stepLower;
  if (!/\b(chicken|beef|turkey|pork|fish|shrimp|meat|ground)\b/i.test(t)) return [];
  return [
    `${name}: Replace animal protein with extra beans, lentils, tofu, tempeh, or more vegetables for this step.`,
  ];
}

function noSpiceMessages(name, ctx) {
  const t = ctx.stepLower;
  const out = [];
  if (/\bsalt and pepper\b/i.test(t)) {
    out.push(`${name}: Season lightly—pepper on the side or skip pepper on her potatoes/veg.`);
  } else if (
    /\b(black )?pepper\b|cayenne|chili|chilli|hot sauce|jalapeño|red pepper|crushed red|ginger\b/i.test(t)
  ) {
    out.push(
      `${name}: Keep heat mild—halve spices/ginger, or set aside her portion before adding pepper or hot elements.`,
    );
  }
  if (ctx.signals.hasTacoSeasoning && /\b(brown|season|meat|packet)\b/i.test(t)) {
    out.push(
      `${name}: Taco seasoning can be spicy—use a smaller amount, a mild blend, or plain salt + cumin on her serving.`,
    );
  }
  return dedupeMessages(out);
}

function nutMessages(name, ctx) {
  const t = ctx.stepLower;
  const out = [];
  if (ctx.signals.hasNuts || /\bpeanut|tree nut|almond|walnut|pecan|cashew|pistachio\b/i.test(t)) {
    out.push(`${name}: No peanut/tree-nut ingredients or cross-contact from shared boards—verify labels.`);
  }
  if (/\bsesame\b/i.test(t)) {
    out.push(
      `${name}: Sesame appears in this step—confirm with your care team whether sesame fits your nut-free plan.`,
    );
  }
  return dedupeMessages(out);
}

function honeyMessages(name, ctx) {
  if (!ctx.signals.hasHoney && !/\bhoney\b/i.test(ctx.stepLower)) return [];
  return [
    `${name}: Omit honey; use a pediatrician-approved swap (e.g. fruit purée) if sweetness is needed—no honey under 12 months.`,
  ];
}

function softFoodMessages(name, ctx) {
  const t = ctx.stepLower;
  if (/roast|oven|425|sheet|bake/i.test(t)) {
    return [
      `${name}: Cook until very tender; shred or finely mash proteins; avoid firm skins and crunchy edges for baby.`,
    ];
  }
  if (/boil|al dente|pasta water|drain/i.test(t)) {
    return [
      `${name}: Boil pasta/veg extra soft; cut tiny, fork-mash sauced bites, and cool to lukewarm before serving.`,
    ];
  }
  if (/sauté|simmer|cream|broth/i.test(t)) {
    return [
      `${name}: Soften vegetables completely; thin or mash sauce; keep salt low and pieces pea-sized or smaller.`,
    ];
  }
  if (/stir-fry|high heat|wok|toss until glossy/i.test(t)) {
    return [
      `${name}: Offer very soft fork-mashed veg and rice; avoid firm snap peas or large chunks; cool well.`,
    ];
  }
  if (/warm|tortilla|toppings|set out|family-style|beans and/i.test(t)) {
    return [
      `${name}: Choose smashed beans, thinned avocado, and tiny torn tortilla pieces—skip hard shells and tough raw veg.`,
    ];
  }
  if (/build|everyone|squeeze lime|serve/i.test(t)) {
    return [
      `${name}: Keep acid and seasoning minimal; supervise closely; pieces smaller than a pea if self-feeding.`,
    ];
  }
  return [
    `${name}: Aim for very soft or mashed texture, lukewarm temperature, and easy-to-swallow pieces.`,
  ];
}

function glutenMessages(name, ctx) {
  const t = ctx.stepLower;
  const out = [];
  if (/\bsoy sauce\b/.test(t) || (ctx.signals.hasSoySauce && /sauce|soy/i.test(t))) {
    out.push(`${name}: Use tamari or coconut aminos labeled gluten-free instead of soy sauce.`);
  }
  if (ctx.signals.hasPasta && /pasta|boil|drain|al dente|toss pasta/i.test(t)) {
    out.push(`${name}: Use gluten-free pasta and confirm broth/seasoning packets are GF.`);
  }
  if (/\b(flour|breadcrumbs?|roux)\b/i.test(t)) {
    out.push(`${name}: Swap wheat flour or crumbs for a certified gluten-free blend or GF crumbs.`);
  }
  return out;
}

function shellfishMessages(name, ctx) {
  if (!ctx.signals.hasShellfish) return [];
  if (!/\b(shrimp|crab|lobster|shellfish|clam|mussel|oyster)\b/i.test(ctx.stepLower)) return [];
  return [
    `${name}: Omit shellfish in her portion; use a safe protein and avoid shared cooking liquid if needed.`,
  ];
}

function eggMessages(name, ctx) {
  if (!ctx.signals.hasEgg) return [];
  if (!/\begg|yolk|white\b/i.test(ctx.stepLower)) return [];
  return [`${name}: Use an egg replacer or omit egg-only finishes on her plate (e.g. DF + vegan binders).`];
}

const HANDLERS = {
  'Dairy-free': (member, ctx) => dairyMessages(member.name, ctx),
  Vegetarian: (member, ctx) => meatMessages(member.name, ctx),
  Vegan: (member, ctx) =>
    dedupeMessages([
      ...meatMessages(member.name, ctx),
      ...dairyMessages(member.name, ctx),
      ...eggMessages(member.name, ctx),
    ]),
  'Gluten-free': (member, ctx) => glutenMessages(member.name, ctx),
  'Nut-free': (member, ctx) => nutMessages(member.name, ctx),
  'No honey': (member, ctx) => honeyMessages(member.name, ctx),
  'No spice': (member, ctx) => noSpiceMessages(member.name, ctx),
  'Soft foods': (member, ctx) => softFoodMessages(member.name, ctx),
  'Shellfish-free': (member, ctx) => shellfishMessages(member.name, ctx),
};

/**
 * @returns {Array<{ memberId: string, memberName: string, items: Array<{ restriction: string, message: string }> }>}
 */
export function adaptationsForStep(recipe, stepIndex, family) {
  const step = recipe.steps[stepIndex];
  const stepLower = step.text.toLowerCase();
  const signals = buildSignals(recipe);
  const ctx = { recipe, stepIndex, stepLower, signals };

  const results = [];

  for (const member of family) {
    const restrictions = member.restrictions || [];
    if (restrictions.length === 0) continue;

    const items = [];
    for (const restriction of restrictions) {
      const handler = HANDLERS[restriction];
      if (!handler) continue;
      const messages = dedupeMessages(handler(member, ctx));
      for (const message of messages) {
        items.push({ restriction, message });
      }
    }

    if (items.length > 0) {
      results.push({
        memberId: member.id,
        memberName: member.name,
        items,
      });
    }
  }

  return results;
}
