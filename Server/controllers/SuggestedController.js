const Suggestion = require('../models/Suggestion');
const suggestNutrition = require('../utils/suggestNutrition');

// POST /api/suggestions/create  (protected)
const createSuggestion = async (req, res) => {
  try {
    const { age, height, weight, gender, activityLevel } = req.body;
    const userId = req.user.id;
    const email = req.user.email;

    const {
      bmi, bmiCategory, dailyCalories,
      protein, carbs, fats, suggestion, mealPlans, endDate
    } = suggestNutrition(
      Number(age), Number(height), Number(weight),
      gender || 'male', activityLevel || 'moderate'
    );

    const newSuggestion = new Suggestion({
      userId, email, age, height, weight,
      gender, activityLevel,
      bmi, bmiCategory, dailyCalories,
      protein, carbs, fats, suggestion, mealPlans,
      startDate: new Date(),
      endDate
    });

    await newSuggestion.save();

    res.status(201).json({
      message: 'Nutrition suggestion generated',
      data: newSuggestion
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/suggestions/my  (protected — logged-in user's suggestions)
const getMySuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/suggestions/all  (admin only)
const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find()
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 });
    res.status(200).json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/suggestions/:id  (protected)
const deleteSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Suggestion.findByIdAndDelete(id);
    res.status(200).json({ message: 'Suggestion deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createSuggestion, getMySuggestions, getAllSuggestions, deleteSuggestion };
