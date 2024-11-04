const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 50,
  debug: false,
  port: process.env.DB_PORT,
});

const promisePool = pool.promise();
module.exports = promisePool;
