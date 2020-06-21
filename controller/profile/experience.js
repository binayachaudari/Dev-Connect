const Profile = require('../../models/Profile');

addExperience = async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);

    await profile.save();

    res.json({ profile });
  } catch (err) {
    console.log(err);
    next({
      status: 500,
      message: err
    });
  }
};

editExperience = async (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;

  const editExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get update index
    const editIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);

    profile.experience[editIndex] = editExp;
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    next({
      status: 400,
      message: err
    });
  }
};

deleteExperience = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.experience.map((item) => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err);
    next({
      status: 400,
      message: err
    });
  }
};

module.exports = {
  addExperience,
  editExperience,
  deleteExperience
};
