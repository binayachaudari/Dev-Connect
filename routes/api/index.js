const router = require('express').Router();

/**
 * @route   /api/auth
 * @desc    Middleware for /api/auth Route
 * @access  Public
 */
router.use('/auth', require('./auth'));

/**
 * @route   /api/posts
 * @desc    Middleware for /api/posts Route
 * @access  
 */
router.use('/posts', require('./posts'));

/**
 * @route   /api/profile
 * @desc    Middleware for /api/profile Route
 * @access  
 */
router.use('/profile', require('./profile'));

/**
 * @route   /api/users
 * @desc    Middleware for /api/users Route
 * @access  Protected
 */
router.use('/users', require('./users'));


module.exports = router;