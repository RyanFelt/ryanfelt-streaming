const { createWatchedLast } = require('../../utils/database');
const { ValidationError } = require('../../utils/errors');

exports.createWatchHistory = async (req, res) => {
  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.titleId)
    throw new ValidationError({ message: 'MISSING titleId' });

  await createWatchedLast({
    userId: req.user.userId,
    titleId: req.body.titleId,
    time: Date.now().toString(),
  });

  return 'Record created!';
};
