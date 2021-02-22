const mysql = require("mysql");
var dbName = require("./dbName") //will change based on new database creation

module.exports = async () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin",
      database: dbName,
    });
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });