const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');

function spotify(req, res, next) {
  console.log(req, res);
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    qs: {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      code: req.body.code
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/playlists',
        qs: token,
        headers: {
          'User-Agent': 'Request-Promise'
        },
        json: true
      });
    })
    .then(profile => {
      return User
        .findOne({ $or: [{ spotify: profile.id }, { email: profile.email }] })
        .then((user) => {
          if(!user) {
            user = new User({
              username: profile.login,
              email: profile.email
            });
          }

          user.spotifyId = profile.id;
          if(profile.email) user.email = profile.email;
          return user.save();
        });
    })
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });

      res.json({ message: `Welcome ${user.username}!`, token });
    })
    .catch(next);
}

module.exports = { spotify };
