"use strict";
var customerTable = require('../models/customer');
var sqlite3 = require("sqlite3").verbose();
var dbEnv = process.env.DB || "development";


module.exports = {
  itWorks: function itWorks(request, response) {
    // this is zomg action
    var result = {
      it_works: "it works!",
      no_really: "no, really!"
    }

    return response.status(200).json(result);
  },

  // this is all customer (test)
  all_customers: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var customers = new customerTable();
    // var result = customers.all(1);
    console.log("customers.limit: " + customers.limit);

    // prepare statement
    var pageNumber = 3;
    var offset = (pageNumber - 1) * customers.limit;
    var statement = "SELECT * FROM customers LIMIT " + customers.limit +
      " OFFSET " + offset + ";";

    db.all(statement, function(err, results) { // closure
      if(err) {
        console.log(err); // error handling
        return;
      }
      console.log('results are: ' + results);
      return response.status(200).json(results);
    });

    db.close();
  },

  registered_at: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var customers = new customerTable();

    // prepare statement
    var pageNumber = request.params.page;
    var offset = (pageNumber - 1) * customers.limit;
    var statement = "SELECT * FROM customers ORDER BY (registered_at) LIMIT "
      + customers.limit + " OFFSET " + offset + ";";

    db.all(statement, function(err, results) { // closure
      if(err) {
        console.log(err); // error handling
        return;
      }
      console.log('results are: ' + results);
      return response.status(200).json(results);
    });

    db.close();
  }

}
