const Profile = require('../../models/Profile');

addEducation = async (req, res, next) => {
  const {
    school,
    degree,
    field_of_study,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    field_of_study,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);

    await profile.save();

    res.json({ profile });

  } catch (err) {
    console.log(err)
    next({
      status: 500,
      message: err
    })
  }
}

editEducation = async (req, res, next) => {
  const {
    school,
    degree,
    field_of_study,
    from,
    to,
    current,
    description
  } = req.body;

  const editEdu = {
    school,
    degree,
    field_of_study,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get update index
    const editIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education[editIndex] = editEdu;
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err)
    next({
      status: 400,
      message: err
    })
  }
}

deleteEducation = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err)
    next({
      status: 400,
      message: err
    })
  }
}

module.exports = {
  addEducation,
  editEducation,
  deleteEducation
}