const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ryan_felt',
});

exports.mysql = () => {
  const createTables = async () => {
    await pool.query('CREATE TABLE titles');
  };

  return {
    createTables,
  };
};
