const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createSuggestion,
  getMySuggestions,
  getAllSuggestions,
  deleteSuggestion
} = require('../controllers/SuggestedController');

router.post('/create', auth, createSuggestion);
router.get('/my', auth, getMySuggestions);
router.get('/all', auth, getAllSuggestions); // admin
router.delete('/:id', auth, deleteSuggestion);

module.exports = router;
