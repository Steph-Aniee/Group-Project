require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  url: DB_URL,
  host: DB_HOST || "containers-us-west-47.railway.app",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "railway",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `profiles` & `favourites` was successful!");

    console.log("Closing...");
  });

  con.end();
});
