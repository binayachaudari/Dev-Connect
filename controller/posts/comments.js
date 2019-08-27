const Posts = require('../../models/Posts');
const User = require('../../models/Users');

addComment = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(['id', 'name', 'avatar']);
    const post = await Posts.findById(req.params.post_id);

    const newComment = {
      user,
      text: req.body.text
    }

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);

  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
};

deleteComment = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id);

    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //Make Sure comment exists
    if (!comment) {
      return next({
        status: 404,
        message: 'Comment not found'
      });
    }

    // Check User
    if (comment.user._id.toString() !== req.user.id) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }

    //Get remove index
    const removeIndex = post.comments.indexOf(comment)
    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json({ comments: post.comments });

  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
}

module.exports = {
  addComment,
  deleteComment
}