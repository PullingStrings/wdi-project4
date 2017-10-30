// 1. Follow a playlist if given a userId and playlistID
// 2. Unfollow
// 3. Get a user's playlists based on their spotifyId

const rp = require('request-promise');
const User = require('../models/user');

function getUsersPlaylists(req, res, next) {
  // getting a token
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'client_credentials',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  })
    .then(token => {
      // sending that token to get a users public playlists
      return rp({
        method: 'GET',
        url: `https://api.spotify.com/v1/users/${req.params.spotifyId}/playlists`,
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        },
        json: true
      });
    })
    .then(response => res.json(response))
    .catch(next);
}

function getPlaylist(req, res, next) {
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'client_credentials',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: `https://api.spotify.com/v1/users/${req.params.spotifyId}/playlists/${req.params.playlistId}/tracks`,
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        },
        json: true
      });
    })
    .then(response => res.json(response))
    .catch(next);
}

function followPlaylist(req, res, next) {
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.currentUser.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'PUT',
        url: `https://api.spotify.com/v1/users/${req.params.spotifyId}/playlists/${req.params.playlistId}/followers`,
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        },
        json: true
      });
    })
    .then(() => {
      return User
        .findById(req.currentUser.id)
        .exec()
        .then(user => {
          user.playlists.push({ userId: req.params.spotifyId, playlistId: req.params.playlistId });
          return user.save();
        });
    })
    .then(user => res.json(user))
    .catch(next);
}

function unfollowPlaylist(req, res, next) {
  return rp({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.currentUser.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'DELETE',
        url: `https://api.spotify.com/v1/users/${req.params.spotifyId}/playlists/${req.params.playlistId}/followers`,
        headers: {
          'Authorization': `Bearer ${token.access_token}`
        },
        json: true
      });
    })
    .then(() => {
      return User
        .findById(req.currentUser.id)
        .exec()
        .then(user => {
          const playlist = user.playlists.find(playlist => playlist.playlistId === req.params.playlistId);
          playlist.remove();
          return user.save();
        });
    })
    .then(user => res.json(user))
    .catch(next);
}



module.exports = { getUsersPlaylists, getPlaylist, followPlaylist, unfollowPlaylist };
