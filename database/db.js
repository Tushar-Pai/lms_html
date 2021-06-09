const mysql = require('mysql');


const con = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  port: 3306,
  password: "project",
  database: "lms",
  multipleStatements: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;