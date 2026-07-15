const mongoose = require('mongoose');

// Suggestion = Diet Plan + nutritional analysis result
const suggestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  gender: { type: String, default: 'male' },
  activityLevel: { type: String, default: 'moderate' },
  bmi: { type: Number },
  bmiCategory: { type: String },
  dailyCalories: { type: Number },
  protein: { type: Number },  // grams
  carbs: { type: Number },    // grams
  fats: { type: Number },     // grams
  suggestion: { type: String, required: true },
  mealPlans: [{
    planName: { type: String },
    breakfast: { type: String },
    lunch: { type: String },
    evening: { type: String },
    dinner: { type: String }
  }],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', suggestionSchema);
