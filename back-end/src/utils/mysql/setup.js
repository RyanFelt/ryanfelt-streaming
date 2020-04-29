const { pool } = require('./index');

const TITLES_TABLE = 'titles';
const SEASONS_TABLE = 'seasons';

exports.createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ${TITLES_TABLE} (
      id VARCHAR(100),
      title VARCHAR(500),
      type VARCHAR(50),
      banner_image VARCHAR(200),
      active BOOLEAN,
      video_file VARCHAR(200),
      year VARCHAR(50),
      season VARCHAR(25),
      episode VARCHAR(25),
      description VARCHAR(2000),
      parent_id VARCHAR(100),
      PRIMARY KEY (id),
      FOREIGN KEY (parent_id) REFERENCES ${TITLES_TABLE} (id)
    );

    CREATE TABLE IF NOT EXISTS ${SEASONS_TABLE} (
      title_id VARCHAR(100),
      season VARCHAR(25),
      PRIMARY KEY (title_id, season),
      FOREIGN KEY (title_id) REFERENCES ${TITLES_TABLE} (id)
    );
  `);
};

exports.dropTables = async () => {
  await pool.query(
    `DROP TABLE IF EXISTS ${TITLES_TABLE}, ${SEASONS_TABLE} CASCADE`
  );
};

// CREATE TABLE IF NOT EXISTS episodes (
//   id VARCHAR(100)
//   title VARCHAR(500),
//   season VARCHAR(25),
//   episode VARCHAR(25),
//   episode_title VARCHAR(500),
//   description VARCHAR(2000),
//   video_file VARCHAR(200),
//   active BOOLEAN,
//   PRIMARY KEY (id),
//   FOREIGN KEY (title) REFERENCES ${TITLES_TABLE} (title)
// );
