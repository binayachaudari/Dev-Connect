const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const generateToken = require('../../middleware/generateToken');

function saveToDatabase(user, res, next) {
  //Add user on Database
  user
    .save()
    .then(() => {
      const payload = {
        user: {
          id: user.id
        }
      };
      //  Return JWT
      generateToken(payload)
        .then((token) => {
          res.json({ token });
        })
        .catch((err) => {
          next({
            status: 500,
            message: err
          });
        });
    })
    .catch((err) => {
      next({
        status: 503,
        message: err
      });
    });
}

module.exports = (req, res, next) => {
  const { name, email, password } = req.body;

  const avatar = 'https://avatars.githubusercontent.com/username';

  const user = new User({
    name,
    email,
    password,
    avatar
  });

  //Encrypt Password
  bcrypt
    .genSalt(10)
    .then((salt) => {
      bcrypt.hash(password, salt).then((hash) => {
        user.password = hash;
        saveToDatabase(user, res, next);
      });
    })
    .catch((err) => {
      next({
        status: 400,
        message: err
      });
    });
};
