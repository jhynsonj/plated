/** Demo content — replace with API / persistence later */

export const DAYS = [
  { key: 'mon', label: 'Mon', full: 'Monday' },
  { key: 'tue', label: 'Tue', full: 'Tuesday' },
  { key: 'wed', label: 'Wed', full: 'Wednesday' },
  { key: 'thu', label: 'Thu', full: 'Thursday' },
  { key: 'fri', label: 'Fri', full: 'Friday' },
  { key: 'sat', label: 'Sat', full: 'Saturday' },
  { key: 'sun', label: 'Sun', full: 'Sunday' },
];

export const MEALS = ['dinner']; // single main meal per day for simpler mobile UI

export const initialFamily = [
  {
    id: 'james',
    name: 'James',
    emoji: '👨',
    role: 'Adult',
    restrictions: [],
  },
  {
    id: 'brittany',
    name: 'Brittany',
    emoji: '👩',
    role: 'Adult',
    restrictions: ['Dairy-free'],
  },
  {
    id: 'bryana',
    name: 'Bryana',
    emoji: '🧒',
    role: 'Child',
    restrictions: ['No spice'],
  },
  {
    id: 'amyri',
    name: 'Amyri',
    emoji: '👶',
    role: 'Age 1',
    restrictions: ['Soft foods', 'Nut-free', 'No honey'],
  },
];

export const recipes = [
  {
    id: 'lemon-herb-chicken',
    name: 'Lemon Herb Sheet-Pan Dinner',
    minutes: 45,
    tags: ['Dinner', 'Sheet pan'],
    ingredients: [
      { name: 'Chicken thighs', qty: '1.5', unit: 'lb' },
      { name: 'Baby potatoes', qty: '1.5', unit: 'lb' },
      { name: 'Green beans', qty: '12', unit: 'oz' },
      { name: 'Lemon', qty: '2', unit: 'whole' },
      { name: 'Olive oil', qty: '3', unit: 'tbsp' },
      { name: 'Butter', qty: '2', unit: 'tbsp' },
      { name: 'Garlic', qty: '4', unit: 'cloves' },
      { name: 'Fresh thyme', qty: '1', unit: 'tbsp chopped' },
    ],
    steps: [
      { text: 'Heat oven to 425°F. Toss potatoes with half the oil, salt, and pepper on a large rimmed sheet.' },
      { text: 'Nestle chicken thighs skin-side up among potatoes. Drizzle with remaining oil and lemon juice.' },
      { text: 'Roast 25 minutes, then add green beans and dot butter over chicken. Roast 12–15 minutes more.' },
      { text: 'Rest 5 minutes, sprinkle thyme, and serve with lemon wedges.' },
    ],
  },
  {
    id: 'veggie-stir-fry',
    name: 'Rainbow Veggie Stir-Fry',
    minutes: 25,
    tags: ['Vegan-friendly', 'Quick'],
    ingredients: [
      { name: 'Broccoli', qty: '1', unit: 'head' },
      { name: 'Bell peppers', qty: '2', unit: 'medium' },
      { name: 'Carrots', qty: '2', unit: 'medium' },
      { name: 'Snap peas', qty: '8', unit: 'oz' },
      { name: 'Ginger', qty: '1', unit: 'tbsp grated' },
      { name: 'Soy sauce', qty: '3', unit: 'tbsp' },
      { name: 'Sesame oil', qty: '1', unit: 'tsp' },
      { name: 'Cooked rice', qty: '3', unit: 'cups' },
    ],
    steps: [
      { text: 'Prep all vegetables into even pieces so they cook uniformly.' },
      { text: 'Stir-fry hard vegetables first on high heat, then add tender vegetables.' },
      { text: 'Add soy sauce, ginger, and a splash of water; toss until glossy.' },
      { text: 'Finish with sesame oil off heat. Serve over rice.' },
    ],
  },
  {
    id: 'taco-night',
    name: 'Family Taco Night',
    minutes: 35,
    tags: ['Customizable', 'Kid-friendly'],
    ingredients: [
      { name: 'Ground beef or turkey', qty: '1', unit: 'lb' },
      { name: 'Taco seasoning', qty: '1', unit: 'packet' },
      { name: 'Black beans', qty: '1', unit: 'can' },
      { name: 'Corn tortillas', qty: '12', unit: 'count' },
      { name: 'Shredded lettuce', qty: '2', unit: 'cups' },
      { name: 'Tomatoes', qty: '2', unit: 'medium' },
      { name: 'Shredded cheese', qty: '1', unit: 'cup' },
      { name: 'Lime', qty: '1', unit: 'whole' },
    ],
    steps: [
      { text: 'Brown meat with taco seasoning and a little water until saucy.' },
      { text: 'Warm beans and tortillas. Set out toppings family-style.' },
      { text: 'Everyone builds their own tacos; squeeze lime over the top.' },
    ],
  },
  {
    id: 'pasta-primavera',
    name: 'Creamy Pasta Primavera',
    minutes: 30,
    tags: ['Pasta', 'Spring'],
    ingredients: [
      { name: 'Penne pasta', qty: '1', unit: 'lb' },
      { name: 'Asparagus', qty: '1', unit: 'bunch' },
      { name: 'Peas', qty: '1', unit: 'cup frozen' },
      { name: 'Heavy cream', qty: '¾', unit: 'cup' },
      { name: 'Parmesan', qty: '½', unit: 'cup grated' },
      { name: 'Shallot', qty: '1', unit: 'large' },
      { name: 'Vegetable broth', qty: '½', unit: 'cup' },
    ],
    steps: [
      { text: 'Boil pasta until al dente; reserve 1 cup pasta water.' },
      { text: 'Sauté shallot and asparagus, add peas, then broth and cream; simmer gently.' },
      { text: 'Toss pasta with sauce, loosen with pasta water, finish with parmesan.' },
    ],
  },
  {
    id: 'lentil-tomato-stew',
    name: 'Lentil & Tomato Stew',
    minutes: 40,
    tags: ['Budget', 'One pot'],
    ingredients: [
      { name: 'Red lentils', qty: '1', unit: 'cup dry' },
      { name: 'Canned tomatoes', qty: '1', unit: '28 oz can' },
      { name: 'Yellow onion', qty: '1', unit: 'medium' },
      { name: 'Carrots', qty: '2', unit: 'medium' },
      { name: 'Vegetable broth', qty: '4', unit: 'cups' },
      { name: 'Olive oil', qty: '2', unit: 'tbsp' },
      { name: 'Cumin', qty: '1', unit: 'tsp' },
      { name: 'Garlic', qty: '3', unit: 'cloves' },
    ],
    steps: [
      { text: 'Dice onion and carrots. Warm oil in a pot; sauté until softened.' },
      { text: 'Add garlic and cumin, then lentils, tomatoes, and broth. Simmer 25–30 minutes until lentils break down.' },
      { text: 'Season to taste and serve with crusty bread or rice if you like.' },
    ],
  },
  {
    id: 'cumin-rice-bean-bowls',
    name: 'Cumin Rice & Bean Bowls',
    minutes: 30,
    tags: ['Vegetarian', 'Bowls'],
    ingredients: [
      { name: 'Cooked rice', qty: '3', unit: 'cups' },
      { name: 'Black beans', qty: '1', unit: 'can drained' },
      { name: 'Corn kernels', qty: '1', unit: 'cup frozen' },
      { name: 'Lime', qty: '1', unit: 'whole' },
      { name: 'Avocado', qty: '1', unit: 'large' },
      { name: 'Cumin', qty: '1', unit: 'tsp' },
      { name: 'Olive oil', qty: '2', unit: 'tbsp' },
      { name: 'Cherry tomatoes', qty: '1', unit: 'cup halved' },
    ],
    steps: [
      { text: 'Warm beans and corn with cumin and a splash of water until hot.' },
      { text: 'Toss rice with lime juice, oil, and salt.' },
      { text: 'Layer rice, beans, corn, tomato, and avocado in bowls; top with extra lime.' },
    ],
  },
  {
    id: 'sheet-sausage-peppers',
    name: 'Sheet-Pan Sausage & Peppers',
    minutes: 35,
    tags: ['Sheet pan', 'Hearty'],
    ingredients: [
      { name: 'Italian sausage links', qty: '1', unit: 'lb' },
      { name: 'Bell peppers', qty: '3', unit: 'large' },
      { name: 'Yellow onion', qty: '1', unit: 'large' },
      { name: 'Baby potatoes', qty: '1', unit: 'lb' },
      { name: 'Olive oil', qty: '3', unit: 'tbsp' },
      { name: 'Garlic', qty: '3', unit: 'cloves' },
      { name: 'Dried oregano', qty: '1', unit: 'tsp' },
    ],
    steps: [
      { text: 'Heat oven to 400°F. Slice peppers, onion, and halve small potatoes.' },
      { text: 'Toss vegetables with oil, oregano, and minced garlic on a sheet pan.' },
      { text: 'Nestle sausage among vegetables; roast 28–32 minutes, turning sausage once, until browned and tender.' },
    ],
  },
];

export function recipeById(id) {
  return recipes.find((r) => r.id === id);
}

export function defaultWeekPlan() {
  const plan = {};
  const ids = [
    'lemon-herb-chicken',
    'veggie-stir-fry',
    'taco-night',
    'pasta-primavera',
    'lentil-tomato-stew',
    'cumin-rice-bean-bowls',
    'sheet-sausage-peppers',
  ];
  DAYS.forEach((d, i) => {
    plan[d.key] = { dinner: ids[i % ids.length] };
  });
  return plan;
}
