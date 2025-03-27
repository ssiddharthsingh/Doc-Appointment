const express = require('express');
const app = express();

const mySql = require("mysql");
var ip = require("ip");



const port = 4500;
//CREATING CONNECTION
const dbConn = mySql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "DocDB",
        port: 3306,
        multipleStatements: true,
    }
);

dbConn.connect(function (err) {
  if (err) console.error(err, "\nError in database connection.");
  else {
    console.log(
      `System started on local\n host: http://localhost:${port}/ \n server: http://${ip.address()}:${port}/`
    );
    console.log("Database connection is successfull.");
    console.log('API"s',"API'S",`"here is the API's" ${port}`);
  }
});


module.exports = { dbConn };
