const Profile = require('../../models/Profile');
const User = require('../../models/Users');

module.exports = async (req, res, next) => {
  try {
    /**
     * @todo Delete user Posts
     * @desc Remove Profile
     */
    await Profile.findOneAndDelete({ user: req.user.id });
  } catch (err) {
    next({
      status: 400,
      message: "Server Error"
    })
  }
}