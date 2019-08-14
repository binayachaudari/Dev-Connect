const Profile = require('../../models/Profile');

module.exports = async (req, res, next) => {
  try {
    const profileID = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profileID) {
      return next({
        status: 400,
        message: 'No profile for this user'
      })
    }

    res.json({ profile: profileID })

  } catch (err) {
    next({
      status: 500,
      message: err
    })
  }
}