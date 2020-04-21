const express = require('express');
const { identityService, authenticate } = require('ryanfelt-identity-service');
const { getAllTitles } = require('./src/controllers/titles');
const { getAllEpisodes } = require('./src/controllers/episodes');
const { isSubscribed } = require('./src/controllers/subscribed');
const { createWatchHistory } = require('./src/controllers/watchHistory');

const router = express.Router();

router.use('/identity-service', identityService);

router.get('/api/titles', authenticate('1'), getAllTitles);
router.get('/api/episodes', getAllEpisodes);
router.get('/api/subscribed', authenticate('2'), isSubscribed);
router.post('/api/watchHistory', authenticate('2'), createWatchHistory);

module.exports = router;
