const { createWatchedLast } = require('./utils/database');

exports.createWatchHistory = async (req, res) => {
  try {
    if (!req.user.userId)
      return res.status(400).send({ message: 'MISSING AUTH TOKEN' });
    else if (!req.body.titleId)
      return res.status(400).send({ message: 'MISSING titleId' });

    await createWatchedLast({
      userId: req.user.userId,
      titleId: req.body.titleId,
      time: Date.now().toString()
    });

    return res.status(200).send('Record created!');
  } catch (e) {
    console.log('ERROR -- /createWatchHistory --', e);
    res.status(500).send({ message: 'Internal server error' });
  }
};
