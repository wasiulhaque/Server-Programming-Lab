var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "labtask",
  user: "root",
  password: ""
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = con;