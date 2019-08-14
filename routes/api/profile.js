const router = require('express').Router();
const { check } = require('express-validator');

const authenticateToken = require('../../middleware/tokenAuthenticate');
const myProfile = require('../../controller/profile/myProfile');
const updateProfile = require('../../controller/profile/updateProfile');

/**
 * @route   POST /api/profile/
 * @desc    Create or update user profile
 * @access  Private
 */
router
  .route('/')
  .get((req, res, next) => {
    res.redirect('/api/profile/me');
  })
  .post(authenticateToken, [
    check('status', 'Status is Required').not().isEmpty(),
    check('skills', 'Skills is Required').not().isEmpty()
  ], updateProfile);

/**
 * @route   GET /api/profile/me
 * @desc    Get Current users profile
 * @access  Private
 */
router
  .route('/me')
  .get(authenticateToken, myProfile)
  .delete(authenticateToken);

module.exports = router;