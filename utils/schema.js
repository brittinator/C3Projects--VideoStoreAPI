"use strict";

var sqlite3 = require('sqlite3').verbose();
// verbose gives useful stack traces
var dbEnv = process.env.DB || 'development' || 'test';
var db = new sqlite3.Database('db/' + dbEnv + '.db');

// put column names and data types into array
var movieFields = [
  // ['title', 'text'],
  ['overview', 'text'],
  ['release_date', 'text'],
  ['inventory', 'integer']
]

var customerFields = [
  // ['id', 'integer'],
  ['name', 'text'],
  ['registered_at', 'text'],
  ['address', 'text'],
  ['city', 'text'],
  ['state', 'text'],
  ['postal_code', 'text'],
  ['phone', 'text'],
  ['account_credit', 'integer'] // need to convert seeds to cents
]

var rentalFields = [
  // ['id', 'integer'], // primary key
  ['movie_title', 'text'],  // foreign key
  ['customer_id', 'integer'], // foreign key
  ['returned', 'integer'],  // 0 = false, 1 = true
  ['check_out_date', 'text'],
  ['return_date', 'text']
]

db.serialize(function() {
  // drop existing stale tables
  db.run('DROP TABLE IF EXISTS movies;');
  db.run('DROP TABLE IF EXISTS customers;');
  db.run('DROP TABLE IF EXISTS rentals;');

  // create fresh tables with primary keys
  db.run('CREATE TABLE movies (title TEXT PRIMARY KEY);');
  db.run('CREATE TABLE customers (id INTEGER PRIMARY KEY);');
  db.run('CREATE TABLE rentals (id INTEGER PRIMARY KEY);');
  // add foreign keys to rentals table
  // db.run('ALTER TABLE rentals ADD COLUMN movie_title TEXT FOREIGN KEY;');
  // db.run('ALTER TABLE rentals ADD COLUMN customer_id INTEGER FOREIGN KEY;');


  // create movie table
  movieFields.forEach(function(field) {
    var fieldName = field[0];
    var fieldType = field[1];

    db.run(
      'ALTER TABLE movies ADD COLUMN '
      + fieldName
      + ' '
      + fieldType
      + ';'
    );
  });

  // create customer table
  customerFields.forEach(function(field) {
    var fieldName = field[0];
    var fieldType = field[1];

    db.run(
      'ALTER TABLE customers ADD COLUMN '
      + fieldName
      + ' '
      + fieldType
      + ';'
    );
  });

  // create rental table
  rentalFields.forEach(function(field) {
    var fieldName = field[0];
    var fieldType = field[1];

    db.run(
      'ALTER TABLE rentals ADD COLUMN '
      + fieldName
      + ' '
      + fieldType
      + ';'
    );
  });
})