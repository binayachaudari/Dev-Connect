const User = require('../../models/Users');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
}