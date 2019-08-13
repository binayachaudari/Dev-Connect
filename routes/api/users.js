const router = require('express').Router();
const userProfile = require('../../controller/users/userProfile');

/**
 * @route   /api/users
 * @desc    Chainable Routes handlers for /api/users
 * @access  Protected
 */
router.route('/')
  .get(userProfile);

module.exports = router;