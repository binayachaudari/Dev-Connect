const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const jwtSecret = config.get('jwtSecret') || process.env.jwtSecret;
  //Get token from the header
  let token;
  if (req.headers['authorization']) {
    token = req.headers['authorization'];
  }
  if (req.headers['x-access-token']) {
    token = req.headers['x-access-token'];
  }
  if (req.headers['token']) {
    token = req.headers['token'];
  }
  if (req.query['token']) {
    token = req.query['token'];
  }

  if (!token) {
    return next({
      status: 403,
      message: "No access token, Access Denied!"
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;

    next();

  } catch (err) {
    next({
      status: 401,
      message: 'Access Denied!'
    })
  }
}