const Profile = require('../../models/Profile');

module.exports = async (req, res, next) => {
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