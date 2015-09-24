"use strict";

var express = require('express');
var router = express.Router();
var movieController = require("../controllers/movies_controller");

// GET all movies
router.get('/all', movieController.all);
router.get('/all/:page', movieController.all);

// GET a single movie profile
router.get('/:title', movieController.title);

// GET a list of customers that have rented movie title
router.get('/:title/renting', movieController.whos_renting);

// GET a list of customers that have rented title in the past,
// sorted by customer_id || customer_name || check_out_date
router.get('/:title/rented/sort_by=:query', function(req, res, next) {
  var sorters = ['customer_id', 'customer_name', 'check_out_date'];
  var sort = req.params.query;

  if (sorters.indexOf(sort) != -1) {
    //sort word is a real one and included in array
    console.log("IT WORKS EUREKA");
    var builder = "movieController." + sort;
    console.log(builder);
    return movieController.sort(req, res);
  } else { return movieController.all(req, res); }

  // switch (sort) {
  //   case "customer_id":
  //     return movieController.rentals_by_customer_id(req, res);
  //     break;
  //   case "customer_name":
  //     return movieController.rentals_by_customer_name(req, res);
  //     break;
  //   case "check_out_date":
  //     return movieController.rentals_by_check_out_date(req, res);
  //     break;
  //   default: // all
  //     return movieController.all(req, res);
  //     break;
  //   }
});
router.get('/:title/rented/sort_by=:query/:page', function(req, res, next) {
  var sort = req.params.query;

  switch (sort) {
    case "customer_id":
      return movieController.rentals_by_customer_id(req, res);
      break;
    case "customer_name":
      return movieController.rentals_by_customer_name(req, res);
      break;
    case "check_out_date":
      return movieController.rentals_by_check_out_date(req, res);
      break;
    default: // all
      return movieController.all(req, res);
      break;
    }
});

// GET all movies sorted by release_date or title
router.get("/all/sort_by=:sort/:page", function(req, res, next) {
  var sort = req.params.sort;

  switch (sort) {
    case "release_date":
      return movieController.all_by_release_date(req, res);
      break;
    case "title":
      return movieController.all_by_title(req, res);
      break;
    default: // all
      return movieController.all(req, res);
      break;
  }
});

module.exports = router;
