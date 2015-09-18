"use strict";
var customerTable = require('../models/customer');

module.exports = {
  itWorks: function itWorks(req, res) {
    // this is zomg action
    var result = {
      it_works: "it works!",
      no_really: "no, really!"
    }

    return res.status(200).json(result);
  },

  all_customers: function(req, res) {
    // this is all customer (test)
    var customers = new customerTable();
    var result = customers.all(10);

    return res.status(200).json(result);
  }
}
