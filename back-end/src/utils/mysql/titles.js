const { query } = require('./setup');
const { ValidationError } = require('../errors');

const { TITLES_TABLE } = process.env;

exports.getAllTitles = async () => {
  try {
    return await query(`SELECT * FROM ${TITLES_TABLE} WHERE parent_id IS NULL`);
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllTitles - ERROR :: ${err}`);
  }
};

exports.getAllEpisodes = async (series) => {
  try {
    return await query(
      `SELECT * FROM ${TITLES_TABLE} WHERE parent_id = (SELECT id FROM ${TITLES_TABLE} WHERE title = "${series}")`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllEpisodes - ERROR :: ${err}`);
  }
};

exports.insertTitle = async ({
  id,
  title,
  type,
  banner_image,
  active,
  video_file = null,
  year = null,
}) => {
  try {
    return await query(
      `INSERT INTO ${TITLES_TABLE}(id, title, type, banner_image, active, video_file, year) 
      VALUES ("${id}", "${title}", "${type}", "${banner_image}", ${active}, "${video_file}", "${year}");`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertTitle - ERROR :: ${err}`);
  }
};

exports.insertEpisode = async ({
  id,
  title,
  active,
  parent_id,
  video_file,
  season,
  episode,
  description,
}) => {
  try {
    return await query(
      `INSERT INTO ${TITLES_TABLE}(id, title, active, parent_id, video_file, season, episode, description ) 
      VALUES ("${id}", "${title}", ${active}, "${parent_id}", "${video_file}", "${season}", "${episode}", "${description}");`
    );
  } catch (err) {
    throw new ValidationError(`MYSQL - insertEpisode - ERROR :: ${err}`);
  }
};
