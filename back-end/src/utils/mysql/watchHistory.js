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

exports.insertWatchHistory = async (user_id, title_id, video_time) => {
  try {
    const date = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    return await query(
      `INSERT INTO ${WATCH_HISTORY_TABLE} (user_id, title_id, video_time, date_updated) 
      VALUES ('${user_id}', '${title_id}', '${video_time}', '${date}');`
    );
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
