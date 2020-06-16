const moment = require('moment');
const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { WATCH_HISTORY_TABLE } = process.env;

exports.getWatchHistory = async (user_id, title_id) => {
  try {
    return await query(
      `SELECT * FROM ${WATCH_HISTORY_TABLE} WHERE user_id = '${user_id}' AND title_id = '${title_id}';`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - getWatchHistory - ERROR :: ${err}`);
  }
};

exports.insertWatchHistory = async (
  user_id,
  title_id,
  watched_time = 0,
  watched_percentage = 0
) => {
  try {
    const date = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    return await query(
      `INSERT INTO ${WATCH_HISTORY_TABLE} (user_id, title_id, watched_time, watched_percentage, date_updated) 
      VALUES ('${user_id}', '${title_id}', '${watched_time}', ${watched_percentage}, '${date}');`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertWatchHistory - ERROR :: ${err}`);
  }
};

exports.updateWatchHistory = async (
  user_id,
  title_id,
  watched_time,
  watched_percentage
) => {
  try {
    const date = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    let sql = `UPDATE ${WATCH_HISTORY_TABLE} SET watched_time='${watched_time}', watched_percentage=${watched_percentage}, date_updated='${date}' WHERE user_id='${user_id}' AND title_id='${title_id}';`;

    if (watched_time === undefined || watched_time === null) {
      sql = `UPDATE ${WATCH_HISTORY_TABLE} SET date_updated='${date}' WHERE user_id='${user_id}' AND title_id='${title_id}';`;
    }

    return await query(sql);
  } catch (err) {
    throw new ValidationError(`MYSQL - insertWatchHistory - ERROR :: ${err}`);
  }
};

exports.getWatchedLatest = async (user_id) => {
  try {
    return await query(
      `SELECT * FROM ${WATCH_HISTORY_TABLE} WHERE user_id = '${user_id}' ORDER BY date_updated;`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - getWatchedLatest - ERROR :: ${err}`);
  }
};
