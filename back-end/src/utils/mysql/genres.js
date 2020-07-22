const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { GENRES_TABLE } = process.env;

exports.insertGenre = async (title_id, genre) => {
  try {
    return await query(`
      INSERT INTO ${GENRES_TABLE}(title_id, genre) 
      VALUES ("${title_id}", "${genre}");
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - insertGenre - ERROR :: ${err}`);
  }
};

exports.deleteGenre = async (title_id, genre) => {
  try {
    return await query(`
      DELETE FROM ${GENRES_TABLE}
      WHERE title_id="${title_id}" AND genre="${genre}";
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - deleteGenre - ERROR :: ${err}`);
  }
};
