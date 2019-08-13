const router = require('express').Router();

/**
 * @route   /api/profile
 * @desc    Chainable Routes handlers for /api/profile
 */
router
  .route('/')
  .get((req, res, next) => {
    res.send('Profile Router');
  })

module.exports = router;