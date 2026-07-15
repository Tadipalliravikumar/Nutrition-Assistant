const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  registerUser, loginUser,
  getProfile, updateProfile, getAllUsers
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/all', auth, getAllUsers); // admin use

module.exports = router;
