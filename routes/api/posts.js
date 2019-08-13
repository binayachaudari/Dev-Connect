const router = require('express').Router();

/**
 * @route   /api/posts
 * @desc    Chainable Routes handlers for /api/posts
 */
router
  .route('/')
  .get((req, res, next) => {
    res.send('Posts Router');
  })

module.exports = router;