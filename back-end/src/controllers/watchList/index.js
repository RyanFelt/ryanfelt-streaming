const { initMysql } = require('../../utils/mysql');
const { ValidationError } = require('../../utils/errors');

exports.postWatchList = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.titleId)
    throw new ValidationError({ message: 'MISSING TITLE ID' });

  await mysql.insertWatchList(req.user.userId, req.body.titleId);

  return;
};

exports.getWatchList = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });

  return await mysql.getWatchList(req.user.userId, req.body.titleId);
};

exports.deleteWatchList = async (req) => {
  const mysql = initMysql();

  if (!req.user.userId)
    throw new ValidationError({ message: 'MISSING AUTH TOKEN' });
  else if (!req.body.titleId)
    throw new ValidationError({ message: 'MISSING TITLE ID' });

  await mysql.deleteWatchList(req.user.userId, req.body.titleId);

  return;
};
