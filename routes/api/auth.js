const router = require('express').Router();

const { check } = require('express-validator');

const validation = require('../../middleware/validation');

const checkUserExists = require('../../controller/auth/checkUserExists');
const register = require('../../controller/auth/register');
const login = require('../../controller/auth/login');

/**
 * @route   /api/auth/register
 * @desc    Register User && Get Token
 * @access  Public
 */
router
  .route('/register')
  .post(
    [
      check('name', 'Name is Required').not().isEmpty(),
      check('email', 'Invalid Email').isEmail(),
      check('password', 'Password must be at least 8 character!').isLength({ min: 8 })
    ],
    validation,
    checkUserExists,
    register
  );

/**
 * @route   /api/auth/login
 * @desc    Login User && Get Token
 * @access  Public
 */
router
  .route('/login')
  .post(
    [check('email', 'Invalid Email').isEmail(), check('password', 'Password is Required!').exists()],
    validation,
    login
  );

module.exports = router;
