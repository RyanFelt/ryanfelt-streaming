const { initMysql } = require('../../utils/mysql');
const { ValidationError } = require('../../utils/errors');

exports.createWatchHistory = async (req, res) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.titleId)
    throw new ValidationError({ message: 'MISSING titleId' });

  await mysql.insertWatchHistory(req.user.userId, req.body.titleId, '0');

  return 'Record created!';
};
