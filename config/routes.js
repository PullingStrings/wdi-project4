const router = require('express').Router();
const oauth  = require('../controllers/oauth');
const users  = require('../controllers/user');
const spotify = require('../controllers/spotify');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

router.route('/playlists')
  .get(spotify.getUsersPlaylists);

router.route('/oauth/spotify')
  .post(oauth.spotify);

router.route('/spotify/users/:spotifyId')
  .get(spotify.getUsersPlaylists);

router.route('/spotify/users/:spotifyId/playlists/:playlistId')
  .get(spotify.getPlaylists);

router.route('/spotify/users/:spotifyId/playlists/:playlistId/followers')
  .put(secureRoute, spotify.followPlaylist);

router.all('/*', (req, res) => res.notFound());

module.exports = router;

// 1. React app makes Axios request to Express API (URLS must match)
// 2. Express API makes request-promise request to Spotify
// 3. Spotify returns data to Express API, and Express API returns data to React app
// 4. React app displays data on the page
