const Profile = require('../../models/Profile');
const User = require('../../models/Users');

userData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
      return next({
        status: 404,
        message: 'User does not exist'
      })

    res.json({ user });

  } catch (err) {
    next({
      status: 500,
      message: err.message
    });
  }
}

userDataByID = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return next({
        status: 400,
        message: 'Profile does not Exist!'
      })
    }

    res.json({ profile });

  } catch (err) {
    console.log(err);
    next({
      status: 500,
      message: "Invalid User ID"
    })
  }
}

module.exports = {
  userData,
  userDataByID
}