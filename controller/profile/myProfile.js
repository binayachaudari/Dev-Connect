const Profile = require('../../models/Profile');
const User = require('../../models/Users');

myProfile = async (req, res, next) => {
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

updateProfile = async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    github_username,
    skills,
    facebook,
    twitter,
    instagram,
    youtube,
    linked_in
  } = req.body;

  //Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (github_username) profileFields.github_username = github_username;
  if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

  //Build Social Object
  profileFields.social = {}
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (youtube) profileFields.social.youtube = youtube;
  if (linked_in) profileFields.social.linked_in = linked_in;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    let user = await User.findById(req.user.id).select('avatar');

    if (user) {
      user.avatar = github_username ? `https://avatars.githubusercontent.com/${github_username}` : 'https://avatars.githubusercontent.com/username';
      await user.save();
    }

    //Update Profile
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }).populate('user', ['name', 'email']);

      return res.json(profile);
    }

    //Create Profile
    profile = new Profile(profileFields);
    await profile.save();

    res.json(profile);

  } catch (err) {
    next({
      status: 500,
      message: err
    })
  }
}

deleteProfile =
  module.exports = async (req, res, next) => {
    try {
      /**
       * @todo Delete user Posts
       * @desc Remove Profile
       */
      await Profile.findOneAndDelete({ user: req.user.id });

      //Delete User
      await User.findOneAndDelete({ _id: req.user.id });

      res.json({
        status: 200,
        message: 'User has been deleted'
      });

    } catch (err) {
      console.log(err)
      next({
        status: 400,
        message: "Server Error"
      })
    }
  }

module.exports = {
  myProfile,
  updateProfile,
  deleteProfile
}