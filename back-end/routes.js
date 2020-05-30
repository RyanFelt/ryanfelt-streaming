const express = require('express');
const { identityService, authenticate } = require('ryanfelt-identity-service');
const { buildRoute } = require('./src/utils/common');
const { getAllTitles, postTitle } = require('./src/controllers/titles');
const { getAllEpisodes } = require('./src/controllers/episodes');
const { isSubscribed } = require('./src/controllers/subscribed');
const {
  postWatchHistory,
  getWatchHistory,
} = require('./src/controllers/watchHistory');

const router = express.Router();

router.use('/identity-service', identityService);

router.get('/titles', authenticate('1'), buildRoute(getAllTitles));
router.post('/titles', authenticate('1'), buildRoute(postTitle));
router.get('/episodes', authenticate('1'), buildRoute(getAllEpisodes));
router.get('/subscribed', authenticate('2'), buildRoute(isSubscribed));
router.post('/watchHistory', authenticate('2'), buildRoute(postWatchHistory));
router.get('/watchHistory', authenticate('2'), buildRoute(getWatchHistory));

module.exports = router;
