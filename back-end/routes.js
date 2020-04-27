const express = require('express');
const { identityService, authenticate } = require('ryanfelt-identity-service');
const { buildRoute } = require('./src/utils/common');
const { getAllTitles } = require('./src/controllers/titles');
const { getAllEpisodes } = require('./src/controllers/episodes');
const { isSubscribed } = require('./src/controllers/subscribed');
const { createWatchHistory } = require('./src/controllers/watchHistory');

const router = express.Router();

router.use('/identity-service', identityService);

router.get('/titles', authenticate('1'), buildRoute(getAllTitles));
router.get('/episodes', buildRoute(getAllEpisodes));
router.get('/subscribed', authenticate('2'), buildRoute(isSubscribed));
router.post('/watchHistory', authenticate('2'), buildRoute(createWatchHistory));

module.exports = router;
