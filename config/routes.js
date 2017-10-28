const router = require('express').Router();
const oauth  = require('../controllers/oauth');
const users  = require('../controllers/user');
const spotify = require('../controllers/spotify');

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
  .get(spotify.getPlaylist);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
