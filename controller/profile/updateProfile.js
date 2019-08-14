const Profile = require('../../models/Profile');

module.exports = async (req, res, next) => {
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

    //Update Profile
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true });

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