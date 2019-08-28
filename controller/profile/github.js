const request = require('request');
const config = require('config');


module.exports = async (req, res, next) => {
  const githubClientID = config.get('githubClientID') || process.env.githubClientID;
  const githubSecret = config.get('githubSecret') || process.env.githubSecret;
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=7&sort=created:asc
      &client_id=${githubClientID}&client_secret=${githubSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if (error) {
        return next({
          status: 400,
          message: err
        });
      }

      if (response.statusCode !== 200) {
        return next({
          status: 404,
          message: 'No github Profile'
        })
      }

      res.json(JSON.parse(body));

    })
  } catch (err) {
    next({
      status: 500,
      message: err
    })
  }
}