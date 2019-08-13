const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const generateToken = require('../../middleware/generateToken');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  //Get user details from email
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return next({
        status: 400,
        message: "Invalid Credentials"
      });
    }

    //Password Authentication
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next({
        status: 400,
        message: "Invalid Credentials"
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    //Return JWT Token
    const token = await generateToken(payload);

    res.json({ token });

  } catch (err) {
    next({
      status: 500,
      message: err.message
    })
  }
}