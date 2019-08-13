const User = require('../../models/Users');

module.exports = (req, res, next) => {

  const { email } = req.body;

  //Check if user Exists
  User.findOne({ email })
    .then(user => {
      if (user) {
        return next({
          status: 400,
          message: 'User already exists!'
        })
      }
      next();
    })
    .catch((err) => {
      next({
        status: 500,
        message: err.message
      })
    });
}