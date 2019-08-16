const Posts = require('../../models/Posts');

like = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id);

    //Check if the post has been already liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return next({
        status: 400,
        message: 'Post already liked'
      })
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json({ likes: post.likes });

  } catch (err) {
    next({
      status: 404,
      message: 'No such post'
    });
  }
}


unlike = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id);

    //Check if the post has been already liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return next({
        status: 400,
        message: 'Post has not been liked by the user'
      })
    }
    //Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json({ likes: post.likes });

  } catch (err) {
    next({
      status: 404,
      message: 'No such post'
    });
  }
}


module.exports = {
  like,
  unlike
}