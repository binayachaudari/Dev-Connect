const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (payload) => {
  const jwtSecret = config.get('jwtSecret') || process.env.jwtSecret;
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '30d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
