const DietPlan = require('../models/DietPlan');

// Generate diet suggestion based on BMI
const generateSuggestion = (age, height, weight) => {
  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let category = '';
  let suggestion = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    suggestion = `Increase calorie intake with a balanced diet rich in proteins, healthy fats, and carbohydrates. Consume whole grains, lean meats, eggs, dairy, nuts, and seeds. Aim for 3 main meals and 2-3 nutrient-dense snacks daily. Include protein shakes with milk-based smoothies to support healthy weight gain.`;
  } else if (bmi < 25) {
    category = 'Normal Weight';
    suggestion = `Maintain your current diet with a balanced intake of macronutrients. Focus on whole foods, vegetables, fruits, lean proteins, and complex carbs. Drink 2-3 liters of water daily. Stay active with 30 minutes of exercise most days and avoid processed foods and excessive sugar.`;
  } else if (bmi < 30) {
    category = 'Overweight';
    suggestion = `Adopt a calorie-conscious diet. Reduce processed foods, sugary drinks, and refined carbs. Increase fiber-rich vegetables, lean proteins (chicken, fish, legumes), and healthy fats (avocado, olive oil). Practice portion control and aim for 45-60 minutes of moderate exercise daily.`;
  } else {
    category = 'Obese';
    suggestion = `Consult a registered dietitian for a personalized plan. Reduce daily caloric intake by 500-750 kcal. Avoid high-sugar, high-fat foods. Focus on vegetables, fruits, whole grains, and lean proteins. Start with low-impact exercises like walking or swimming. Track meals and monitor progress weekly.`;
  }

  return { bmi: parseFloat(bmi), category, suggestion };
};

const createDietPlan = async (req, res) => {
  try {
    const { userId, email, age, height, weight } = req.body;

    const { bmi, category, suggestion } = generateSuggestion(age, height, weight);

    const dietPlan = new DietPlan({
      userId,
      email,
      age,
      height,
      weight,
      bmi,
      suggestion: `[${category}] ${suggestion}`
    });

    await dietPlan.save();

    res.status(201).json({
      message: 'Diet plan generated successfully',
      dietPlan: {
        age,
        height,
        weight,
        bmi,
        category,
        suggestion
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyDietPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const plans = await DietPlan.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: get all diet plans
const getAllDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find().sort({ createdAt: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteDietPlan = async (req, res) => {
  try {
    const { id } = req.params;
    await DietPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Diet plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createDietPlan, getMyDietPlan, getAllDietPlans, deleteDietPlan };
