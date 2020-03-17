const { createWatchHistoryRecord } = require('./utils/database');

exports.createWatchHistory = async (req, res) => {
  try {
    if (!req.body.videoId)
      return res.status(400).send({ message: 'MISSING videoId' });

    // await createWatchHistoryRecord({
    //   userIdVideoId: `${req.user.userId}#${req.body.videoId}`,
    //   timeWatched: Date.now().toString(),
    //   userId: req.user.userId,
    //   videoId: req.body.videoId
    // });

    return res.status(200).send('Record created!');
  } catch (e) {
    console.log('ERROR -- /createWatchHistory --', e);
    res.status(500).send({ message: 'Internal server error' });
  }
};
