const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// @route   POST api/auth/register
// @desc    Register new user
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  authController.register
);

// @route   POST api/auth/login
// @desc    Authenticate user and return token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

// @route   GET api/auth/user
// @desc    Get logged-in user data (requires auth middleware)
// @access  Private
router.get('/user', authController.getUser);

module.exports = router;
