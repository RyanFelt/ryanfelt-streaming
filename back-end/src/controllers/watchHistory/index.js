const { initMysql } = require('../../utils/mysql');
const { ValidationError } = require('../../utils/errors');

exports.postWatchHistory = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.titleId)
    throw new ValidationError({ message: 'MISSING titleId' });

  const historyRecords = await mysql.getWatchHistory(
    req.user.userId,
    req.body.titleId
  );

  if (historyRecords && !historyRecords[0]) {
    await mysql.insertWatchHistory(
      req.user.userId,
      req.body.titleId,
      req.body.watchedTime,
      parseInt(req.body.watchedPercentage) || 0
    );
  } else {
    await mysql.updateWatchHistory(
      req.user.userId,
      req.body.titleId,
      req.body.watchedTime,
      parseInt(req.body.watchedPercentage) || 0
    );
  }

  return;
};

exports.getWatchHistory = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.query.titleId)
    throw new ValidationError({ message: 'MISSING titleId' });

  const historyRecords = await mysql.getWatchHistory(
    req.user.userId,
    req.query.titleId
  );

  return historyRecords[0];
};
