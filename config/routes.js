const router = require('express').Router();
const oauth  = require('../controllers/oauth');

router.route('/oauth/spotify')
  .post(oauth.spotify);

router.route('/oauth/spotify')
  .get(oauth.spotify);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
