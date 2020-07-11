const moment = require('moment');
const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { WATCH_LIST_TABLE, TITLES_TABLE } = process.env;

exports.getWatchList = async (user_id) => {
  try {
    return await query(`
      SELECT ${TITLES_TABLE}.* FROM ${WATCH_LIST_TABLE} 
      LEFT JOIN ${TITLES_TABLE} ON  ${WATCH_LIST_TABLE}.title_id = ${TITLES_TABLE}.id
      WHERE user_id = '${user_id}'
      ORDER BY date_added desc;
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - getUserWatchList - ERROR :: ${err}`);
  }
};

exports.insertWatchList = async (user_id, title_id) => {
  try {
    const date = moment().utc().format('YYYY-MM-DD HH:mm:ss');

    return await query(
      `INSERT INTO ${WATCH_LIST_TABLE} (user_id, title_id, date_added) 
      VALUES ('${user_id}', '${title_id}', '${date}');`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertWatchList - ERROR :: ${err}`);
  }
};

exports.deleteWatchList = async (user_id, title_id) => {
  try {
    return await query(
      `DELETE FROM ${WATCH_LIST_TABLE} WHERE user_id = '${user_id}' AND title_id = '${title_id}';`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - deleteWatchList - ERROR :: ${err}`);
  }
};
