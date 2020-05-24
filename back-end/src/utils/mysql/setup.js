const mysql = require('mysql');

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  TITLES_TABLE,
  SEASONS_TABLE,
  WATCH_HISTORY_TABLE,
} = process.env;

exports.pool = mysql.createPool({
  connectionLimit: 10,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

const query = (sqlQuery) => {
  const sql = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });
  sql.connect();
  return new Promise((resolve, reject) => {
    sql.query(sqlQuery, function (error, results, fields) {
      sql.end();
      if (error) reject(error);
      resolve(results);
    });
  });
};

exports.query = query;

exports.createTables = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS ${TITLES_TABLE} (
      id VARCHAR(100),
      title VARCHAR(500),
      type VARCHAR(50),
      banner_image VARCHAR(200),
      active BOOLEAN,
      video_file VARCHAR(200),
      year VARCHAR(50),
      season VARCHAR(10),
      episode VARCHAR(10),
      description VARCHAR(2000),
      parent_id VARCHAR(100),
      PRIMARY KEY (id),
      FOREIGN KEY (parent_id) REFERENCES ${TITLES_TABLE} (id)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS ${SEASONS_TABLE} (
      title_id VARCHAR(100),
      season VARCHAR(10),
      PRIMARY KEY (title_id, season),
      FOREIGN KEY (title_id) REFERENCES ${TITLES_TABLE} (id)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS ${WATCH_HISTORY_TABLE} (
      user_id VARCHAR(100),
      title_id VARCHAR(100),
      watched_time VARCHAR(100),
      date_updated TIMESTAMP,
      PRIMARY KEY (user_id, title_id),
      FOREIGN KEY (title_id) REFERENCES ${TITLES_TABLE} (id)
    );
  `);
};

exports.dropTables = async () => {
  await query(
    `DROP TABLE IF EXISTS ${TITLES_TABLE}, ${SEASONS_TABLE}, ${WATCH_HISTORY_TABLE} CASCADE`
  );
};
