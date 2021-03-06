const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/user');

function secureRoute(req, res, next) {
  console.log('INSIDE secureRoute', req.headers.authorization);
  if(!req.headers.authorization) return res.unauthorized();
  console.log('TOKEN FOUND');

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt.verifyAsync(token, secret)
    .then((payload) => {
      return User.findById(payload.userId);
    })
    .then((user) => {
      if(!user) return res.unauthorized();
      req.currentUser = user;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
