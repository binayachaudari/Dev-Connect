const User = require('../../models/Users');
const Posts = require('../../models/Posts');

getPosts = async (req, res, next) => {
  try {
    const posts = await Posts.find().populate('user', ['name', 'avatar']).sort({ date: -1 });
    res.json({ posts });
  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
}

getPostByID = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id).populate('user', ['name', 'avatar']);

    if (!post) {
      return next({
        status: 404,
        message: 'Post not found!'
      });
    }

    res.json({ post })

  } catch (err) {
    next({
      status: 404,
      message: 'Post not found'
    });
  }
}

deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.post_id);

    if (post.user.toString() !== req.user.id) {
      return next({
        status: 401,
        message: 'Unauthorized'
      });
    }

    await post.remove();
    res.json({ status: 200, message: 'Post removed!' });
  } catch (err) {
    next({
      status: 404,
      message: 'Post not found'
    });
  }
}

addPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(['id', 'name', 'avatar']);

    const newPost = new Posts({
      text: req.body.text,
      user: req.user.id
    });

    await newPost.save();
    res.json({ ...newPost._doc, user });

  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
};

module.exports = {
  getPosts,
  getPostByID,
  deletePost,
  addPost,
}