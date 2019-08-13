const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '30d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    })
  })
}