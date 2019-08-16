const Posts = require('../../models/Posts');

addComment = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id).populate('user', ['name', 'avatar']);

    const newComment = {
      user: req.user.id,
      text: req.body.text
    }

    post.comments.push(newComment);
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

    //Check User
    if (comment.user.toString() !== req.user.id) {
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