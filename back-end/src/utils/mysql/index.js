const mysql = require('mysql');
const { createTables, dropTables } = require('./setup');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

exports.pool = mysql.createPool({
  connectionLimit: 10,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

module.exports = () => {
  return {
    createTables,
    dropTables,
  };
};
