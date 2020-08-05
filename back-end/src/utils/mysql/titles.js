const { query } = require('./setup');
const { ValidationError } = require('../errors');

const {
  TITLES_TABLE,
  SEASONS_TABLE,
  WATCH_HISTORY_TABLE,
  GENRES_TABLE,
} = process.env;

exports.getAllTitles = async (userId) => {
  try {
    return await query(`
      SELECT  ${TITLES_TABLE}.*, s.seasons, ${WATCH_HISTORY_TABLE}.watched_percentage, g.genres
      FROM  ${TITLES_TABLE}
      LEFT JOIN (
        SELECT title_id, GROUP_CONCAT(${SEASONS_TABLE}.season ORDER BY CAST(${SEASONS_TABLE}.season AS signed)) AS seasons 
        FROM ${SEASONS_TABLE} 
        JOIN ${TITLES_TABLE} ON ${SEASONS_TABLE}.title_id = ${TITLES_TABLE}.id
        GROUP BY title_id
      )s 
      ON ${TITLES_TABLE}.id = s.title_id 
      LEFT JOIN ${WATCH_HISTORY_TABLE}
      ON ${TITLES_TABLE}.id = ${WATCH_HISTORY_TABLE}.title_id AND "${userId}" = ${WATCH_HISTORY_TABLE}.user_id
      LEFT JOIN (
        SELECT title_id, GROUP_CONCAT(${GENRES_TABLE}.genre) AS genres 
        FROM ${GENRES_TABLE} 
        JOIN ${TITLES_TABLE} ON ${GENRES_TABLE}.title_id = ${TITLES_TABLE}.id
        GROUP BY title_id
      )g
      ON ${TITLES_TABLE}.id = g.title_id 
      WHERE parent_id IS NULL AND active = 1;
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllTitles - ERROR :: ${err}`);
  }
};

exports.getAllEpisodes = async (series, userId) => {
  try {
    return await query(`
      SELECT *
      FROM ${TITLES_TABLE}
      LEFT JOIN ${WATCH_HISTORY_TABLE}
      ON ${TITLES_TABLE}.id = ${WATCH_HISTORY_TABLE}.title_id AND "${userId}" = ${WATCH_HISTORY_TABLE}.user_id
      WHERE parent_id = (SELECT id FROM ${TITLES_TABLE} WHERE title = "${series}") AND active = 1
      ORDER BY ${TITLES_TABLE}.season, CAST(${TITLES_TABLE}.episode AS UNSIGNED);
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - getAllEpisodes - ERROR :: ${err}`);
  }
};

exports.getTitleByVideoFile = async (videoFile) => {
  try {
    return await query(`
      SELECT *
      FROM ${TITLES_TABLE}
      WHERE video_file = "${videoFile}";
    `);
  } catch (err) {
    throw new ValidationError(
      `MYSQL - getEpisodeByVideoFile - ERROR :: ${err}`
    );
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
  imdb_data,
}) => {
  try {
    return await query(`
      INSERT INTO ${TITLES_TABLE}(id, title, type, banner_image, active, video_file, year, imdb_data) 
      VALUES ("${id}", "${title}", "${type}", "${banner_image}", ${active}, "${video_file}", "${year}", '${imdb_data}');
    `);
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
    return await query(`
      INSERT INTO ${TITLES_TABLE}(id, title, active, parent_id, video_file, season, episode, description ) 
      VALUES ("${id}", "${title}", ${active}, "${parent_id}", "${video_file}", "${season}", "${episode}", "${description}");
    `);
  } catch (err) {
    throw new ValidationError(`MYSQL - insertEpisode - ERROR :: ${err}`);
  }
};
