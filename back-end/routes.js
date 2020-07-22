const express = require('express');
const { identityService, authenticate } = require('ryanfelt-identity-service');
const { buildRoute } = require('./src/utils/common');
const { getAllTitles, postTitle } = require('./src/controllers/titles');
const { getAllEpisodes, postEpisode } = require('./src/controllers/episodes');
const { isSubscribed } = require('./src/controllers/subscribed');
const {
  postWatchHistory,
  getWatchHistory,
} = require('./src/controllers/watchHistory');
const {
  postWatchList,
  getWatchList,
  deleteWatchList,
} = require('./src/controllers/watchList');
const { getImdbData } = require('./src/controllers/imdb');

const router = express.Router();

router.use('/identity-service', identityService);

router.get('/titles', authenticate('1'), buildRoute(getAllTitles));
router.post('/titles', authenticate('3'), buildRoute(postTitle));
router.get('/episodes', authenticate('1'), buildRoute(getAllEpisodes));
router.post('/episodes', authenticate('3'), buildRoute(postEpisode));
router.get('/subscribed', authenticate('2'), buildRoute(isSubscribed));
router.post('/watchHistory', authenticate('2'), buildRoute(postWatchHistory));
router.get('/watchHistory', authenticate('2'), buildRoute(getWatchHistory));
router.post('/watchList', authenticate('2'), buildRoute(postWatchList));
router.get('/watchList', authenticate('1'), buildRoute(getWatchList));
router.delete('/watchList', authenticate('2'), buildRoute(deleteWatchList));
router.get('/imdb_data', authenticate('3'), buildRoute(getImdbData));

module.exports = router;
