const router = require('express').Router();
const authenticateToken = require('../../middleware/tokenAuthenticate');

const { userData, userDataByID, allUserData } = require('../../controller/users/users');

/**
 * @route   /api/users
 * @desc    Chainable Routes handlers for /api/users
 * @access  Protected
 */
router.route('/').get(authenticateToken, userData);

/**
 * @route   /api/users/all
 * @desc    Get all users
 * @access  Private
 */
router.route('/all').get(allUserData);

/**
 * @route   /api/users/user_id
 * @desc    Get user profile by user_id
 * @access  Public
 */
router.route('/:user_id').get(userDataByID);

module.exports = router;
