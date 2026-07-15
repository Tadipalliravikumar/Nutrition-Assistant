const express = require('express');
const router = express.Router();
const {
  createDietPlan,
  getMyDietPlan,
  getAllDietPlans,
  deleteDietPlan
} = require('../controllers/dietController');

router.post('/create', createDietPlan);
router.get('/my/:userId', getMyDietPlan);
router.get('/all', getAllDietPlans);
router.delete('/:id', deleteDietPlan);

module.exports = router;
