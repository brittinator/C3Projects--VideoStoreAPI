"use strict";

var express = require('express');
var router = express.Router();
var zomgController = require("../controllers/zomgController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video Killed The Radio Star' });
});

/* GET zomg page. */
router.get('/zomg', function(req, res, next) {
  return zomgController.itWorks(req, res)
});

/* GET all customers. */
router.get('/all', function(req, res, next) {
  return zomgController.all_customers(req, res)
});

module.exports = router;
