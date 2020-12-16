const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'photoapp',
  password: 'password',
  database: 'csc317db',
  connectionLimit: 50,
  debug: false,
  port: 3306
});

const promisePool = pool.promise();
module.exports = promisePool;
