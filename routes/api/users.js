const router = require('express').Router();
const userProfile = require('../../controller/users/userData');
const authenticateToken = require('../../middleware/tokenAuthenticate');

const user_idProfile = require('../../controller/users/user_idData');

/**
 * @route   /api/users
 * @desc    Chainable Routes handlers for /api/users
 * @access  Protected
 */
router.route('/')
  .get(authenticateToken, userProfile);

/**
* @route   /api/users/user_id
* @desc    Get user profile by user_id
* @access  Public
*/
router.route('/:user_id')
  .get(user_idProfile);

module.exports = router;