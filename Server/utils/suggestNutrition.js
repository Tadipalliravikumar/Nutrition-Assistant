/**
 * suggestNutrition.js
 * Core logic to generate personalized nutrition suggestions based on user input.
 * Uses Harris-Benedict BMR formula with activity multipliers.
 */

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

/**
 * Calculate BMI and category
 */
const calcBMI = (weight, height) => {
  const heightM = height / 100;
  const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
  let category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal Weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  return { bmi, category };
};

/**
 * Calculate daily calorie needs using Harris-Benedict BMR
 */
const calcDailyCalories = (age, weight, height, gender, activityLevel) => {
  let bmr;
  if (gender === 'female') {
    bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  } else {
    bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  }
  const multiplier = activityMultipliers[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate macronutrient targets (grams)
 */
const calcMacros = (dailyCalories, bmiCategory) => {
  let proteinPct, carbsPct, fatsPct;

  switch (bmiCategory) {
    case 'Underweight':
      proteinPct = 0.30; carbsPct = 0.50; fatsPct = 0.20;
      break;
    case 'Overweight':
      proteinPct = 0.35; carbsPct = 0.35; fatsPct = 0.30;
      break;
    case 'Obese':
      proteinPct = 0.40; carbsPct = 0.30; fatsPct = 0.30;
      break;
    default: // Normal Weight
      proteinPct = 0.30; carbsPct = 0.40; fatsPct = 0.30;
  }

  return {
    protein: Math.round((dailyCalories * proteinPct) / 4),  // 4 cal/g
    carbs: Math.round((dailyCalories * carbsPct) / 4),       // 4 cal/g
    fats: Math.round((dailyCalories * fatsPct) / 9)          // 9 cal/g
  };
};

/**
 * Generate text suggestion based on BMI category
 */
const generateSuggestionText = (bmiCategory, dailyCalories, activityLevel) => {
  const activityLabel = {
    sedentary: 'sedentary lifestyle',
    light: 'lightly active lifestyle',
    moderate: 'moderately active lifestyle',
    active: 'active lifestyle',
    very_active: 'very active lifestyle'
  }[activityLevel] || 'moderate activity';

  const tips = {
    Underweight: `You are underweight. With your ${activityLabel}, you need approximately ${dailyCalories} kcal/day to gain healthy weight. Focus on calorie-dense whole foods: whole grains, legumes, nuts, dairy, eggs, and lean meats. Eat 5-6 meals per day with protein-rich snacks. Add strength training 3x per week to build muscle mass alongside a calorie surplus.`,
    'Normal Weight': `Great job maintaining a healthy weight! With your ${activityLabel}, aim for ${dailyCalories} kcal/day to stay balanced. Continue eating a variety of colorful vegetables, fruits, lean proteins, and complex carbohydrates. Stay hydrated with 2-3 liters of water daily and maintain regular physical activity for long-term wellness.`,
    Overweight: `You are overweight. Aim for ${Math.round(dailyCalories * 0.85)} kcal/day (a 15% deficit) to lose weight gradually with your ${activityLabel}. Prioritize vegetables, lean proteins (chicken, fish, legumes), and fiber-rich foods. Reduce refined carbs, sugary drinks, and processed snacks. Exercise 45-60 minutes most days, combining cardio and strength training.`,
    Obese: `Your BMI indicates obesity. Target ${Math.round(dailyCalories * 0.80)} kcal/day with medical supervision. With your ${activityLabel}, transition to low-impact exercises like walking and swimming. Eliminate processed foods, fast food, and sugary beverages. Consult a registered dietitian for a structured meal plan and consider behavioral support for sustainable lifestyle changes.`
  };

  return tips[bmiCategory] || tips['Normal Weight'];
};

/**
 * Generate 3 meal plan options based on BMI category
 */
const generateMealPlans = (bmiCategory) => {
  const plans = {
    Underweight: [
      {
        planName: "Option 1: Classic Muscle Builder",
        breakfast: "🥣 Oatmeal with whole milk, peanut butter, banana, and a scoop of whey protein.",
        lunch: "🍗 Grilled chicken breast (150g), 1.5 cups quinoa, mixed vegetables with olive oil.",
        evening: "🍎 Greek yogurt with honey and mixed nuts, plus one boiled egg.",
        dinner: "🍣 Salmon (150g), sweet potato mash, and steamed broccoli with butter."
      },
      {
        planName: "Option 2: High Calorie Vegetarian",
        breakfast: "🥑 3 scrambled eggs, 2 slices whole wheat toast with avocado, and a glass of whole milk.",
        lunch: "🍛 Large portion of lentil curry (dal) with brown rice and mixed roasted root vegetables.",
        evening: "🥤 High-calorie smoothie (banana, oats, peanut butter, milk).",
        dinner: "🧀 Paneer (cottage cheese) stir-fry with quinoa and a side salad with olive oil dressing."
      },
      {
        planName: "Option 3: Quick & Dense",
        breakfast: "🥞 Protein pancakes with maple syrup and walnuts.",
        lunch: "🥪 2 Turkey and cheese sandwiches on whole wheat bread with a side of mixed nuts.",
        evening: "🍫 Dark chocolate squares and a handful of almonds.",
        dinner: "🥩 Lean beef steak (150g), large baked potato with sour cream, and green beans."
      }
    ],
    'Normal Weight': [
      {
        planName: "Option 1: Balanced & Fresh",
        breakfast: "🍳 3 scrambled eggs with spinach, 2 slices whole wheat toast, and green tea.",
        lunch: "🥗 Grilled chicken salad with mixed greens, cherry tomatoes, quinoa, and light vinaigrette.",
        evening: "🍌 A piece of fruit (apple/banana) and a handful of almonds.",
        dinner: "🐟 Baked cod or tilapia, 1/2 cup brown rice, and roasted asparagus."
      },
      {
        planName: "Option 2: Mediterranean Style",
        breakfast: "🥣 Greek yogurt topped with mixed berries and a sprinkle of chia seeds.",
        lunch: "🌯 Whole wheat wrap with hummus, falafel, cucumber, and feta cheese.",
        evening: "🥕 Carrot sticks and bell peppers with guacamole.",
        dinner: "🍗 Lemon-herb chicken thigh, couscous, and a Mediterranean tomato-cucumber salad."
      },
      {
        planName: "Option 3: Comfort but Healthy",
        breakfast: "🥣 Bowl of oatmeal with skim milk, sliced apples, and cinnamon.",
        lunch: "🍲 Hearty vegetable and minestrone soup with a slice of sourdough bread.",
        evening: "🧀 A string cheese and a small handful of grapes.",
        dinner: "🍝 Whole wheat pasta with lean ground turkey bolognese and a side salad."
      }
    ],
    Overweight: [
      {
        planName: "Option 1: Low Carb Lean",
        breakfast: "🥚 2 boiled eggs, half a grapefruit, and black coffee/green tea.",
        lunch: "🌯 Turkey wrap in a low-carb tortilla with plenty of lettuce, cucumber, and mustard.",
        evening: "🥕 Carrot and celery sticks with 2 tbsp hummus.",
        dinner: "🍗 Grilled chicken breast (100g), large portion of steamed zucchini and cauliflower."
      },
      {
        planName: "Option 2: High Protein Focus",
        breakfast: "🥤 Protein shake (whey + water + spinach) and a small apple.",
        lunch: "🥗 Tuna salad (mixed with Greek yogurt instead of mayo) over a large bed of mixed greens.",
        evening: "🥚 1 hard-boiled egg with a pinch of black pepper.",
        dinner: "🥩 Lean beef sirloin (120g) with roasted brussels sprouts and side salad."
      },
      {
        planName: "Option 3: Plant-Based Deficit",
        breakfast: "🥣 Chia seed pudding made with unsweetened almond milk and raspberries.",
        lunch: "🍲 Large bowl of mixed bean and vegetable chili (no rice).",
        evening: "🥒 Cucumber slices with a pinch of salt and lemon juice.",
        dinner: "🥗 Baked tofu cubes over a massive green salad with light balsamic dressing."
      }
    ],
    Obese: [
      {
        planName: "Option 1: Strict Calorie Control",
        breakfast: "🍓 Protein shake (whey + water) and a small handful of berries.",
        lunch: "🥗 Large leafy green salad with grilled chicken breast, no oil-based dressing.",
        evening: "🥒 Cucumber slices with a pinch of salt and lemon juice.",
        dinner: "🐟 White fish (120g) baked with herbs, served with steamed green beans."
      },
      {
        planName: "Option 2: Volume Eating (High Fiber)",
        breakfast: "🥣 Small bowl of plain oatmeal (made with water) topped with 1/2 cup blueberries.",
        lunch: "🍲 Large bowl of clear vegetable broth soup with celery, cabbage, and carrots.",
        evening: "🍅 Cherry tomatoes and a slice of low-fat cheese.",
        dinner: "🍗 Grilled chicken breast (100g) with 2 cups of steamed broccoli (no butter)."
      },
      {
        planName: "Option 3: Simple & Clean",
        breakfast: "🍳 2 egg whites with mushrooms and spinach.",
        lunch: "🥗 Chopped salad (lettuce, cucumber, tomatoes) with 100g grilled turkey breast.",
        evening: "🍏 1 small green apple.",
        dinner: "🐟 Baked salmon (100g) with a large portion of steamed asparagus."
      }
    ]
  };
  return plans[bmiCategory] || plans['Normal Weight'];
};

/**
 * Main function: takes user inputs, returns full nutrition recommendation
 */
const suggestNutrition = (age, height, weight, gender = 'male', activityLevel = 'moderate') => {
  const { bmi, category: bmiCategory } = calcBMI(weight, height);
  const dailyCalories = calcDailyCalories(age, weight, height, gender, activityLevel);
  const { protein, carbs, fats } = calcMacros(dailyCalories, bmiCategory);
  const suggestion = generateSuggestionText(bmiCategory, dailyCalories, activityLevel);
  const mealPlans = generateMealPlans(bmiCategory);

  // Plan end date = 4 weeks from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 28);

  return { bmi, bmiCategory, dailyCalories, protein, carbs, fats, suggestion, mealPlans, endDate };
};

module.exports = suggestNutrition;
