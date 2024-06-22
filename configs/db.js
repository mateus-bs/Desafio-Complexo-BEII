// configs/db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Mb$15032001',
  database: 'mateusbs'
});

module.exports = pool;
