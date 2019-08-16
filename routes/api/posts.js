const router = require('express').Router();
const { check } = require('express-validator');
const validation = require('../../middleware/validation');

const authenticateToken = require('../../middleware/tokenAuthenticate');
const { getPosts, getPostByID, deletePost, addPost } = require('../../controller/posts/posts');
const { like, unlike } = require('../../controller/posts/likes');
const { addComment, deleteComment } = require('../../controller/posts/comments');

/**
 * @route   GET, POST /api/posts
 * @desc    Get post
 *          Create a post
 * @access  Private
 */
router
  .route('/')
  .get(authenticateToken, getPosts)
  .post(authenticateToken, [
    check('text', 'Text is required').not().isEmpty()
  ], validation, addPost);

/**
 * @route   GET /api/posts/post_id
 * @desc    Get post by post_id
 * @access  Private
 */
router
  .route('/:post_id')
  .get(authenticateToken, getPostByID)
  .delete(authenticateToken, deletePost);


/**
* @route   PUT /api/posts/like/post_id
* @desc    Like a post
* @access  Private
*/
router
  .route('/like/:post_id')
  .put(authenticateToken, like);

/**
* @route   PUT /api/posts/unlike/post_id
* @desc    Unlike a post
* @access  Private
*/
router
  .route('/unlike/:post_id')
  .put(authenticateToken, unlike);


/**
* @route   PUT /api/posts/comment/post_id
* @desc    Comment on a post
* @access  Private
*/
router
  .route('/comment/:post_id')
  .put(authenticateToken, [
    check('text', 'Text is required').not().isEmpty()
  ], validation, addComment);



/**
* @route   DELETE /api/posts/comment/post_id/comment_id
* @desc    Delete Comment on a post
* @access  Private
*/
router
  .route('/comment/:post_id/:comment_id')
  .delete(authenticateToken, deleteComment);

module.exports = router;