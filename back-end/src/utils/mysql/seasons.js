const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { SEASONS_TABLE } = process.env;

exports.insertSeason = async (title_id, season) => {
  try {
    return await query(`
      INSERT INTO ${SEASONS_TABLE}(title_id, season, active) 
      VALUES ("${title_id}", "${season}", true);
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - insertSeason - ERROR :: ${err}`);
  }
};
