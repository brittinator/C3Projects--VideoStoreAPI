"use strict";
var movieTable = require('../models/movie');
var sqlite3 = require("sqlite3").verbose();
var dbEnv = process.env.DB || "development";

module.exports = {
  // this is all movies
  all_movies: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();

    // prepare statement
    var pageNumber = request.params.page; // we still need to handle for page 1
    var offset = (pageNumber - 1) * movies.limit;
    var statement = "SELECT * FROM movies LIMIT " + movies.limit +
      " OFFSET " + offset + ";";

    db.all(statement, function(err, results) { // closure
      if(err) {
        console.log(err); // error handling
        return;
      }
      return response.status(200).json(results);
    });

    db.close();
  },

  title: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();

    // prepare statement
    var pageNumber = request.params.page; // we still need to handle for page 1
    var offset = (pageNumber - 1) * movies.limit;
    var statement = "SELECT * FROM movies ORDER BY (title) LIMIT "
      + movies.limit + " OFFSET " + offset + ";";

    db.all(statement, function(err, results) { // closure
      if(err) {
        console.log(err); // error handling
        return;
      }

      return response.status(200).json(results);
    });

    db.close();
  },

  release_date: function(request, response) {
    function convertReleaseDate(arrayOfMovies) {
      arrayOfMovies = arrayOfMovies.map(function(movie) {
        var convertReleaseDate = Number(movie.release_date);
        var dateOfRelease = new Date(convertReleaseDate);
        var humanReadableDate = dateOfRelease.toDateString();
        var humanReadableTime = dateOfRelease.toTimeString();
        movie.release_date = humanReadableDate + " " + humanReadableTime;

        return movie;
      });

      return arrayOfMovies;
    }

    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();

    // prepare statement
    var pageNumber = request.params.page; // we still need to handle for page 1
    var offset = (pageNumber - 1) * movies.limit;
    var statement =
      "SELECT * FROM movies \
      ORDER BY (release_date) \
      LIMIT " + movies.limit + " \
      OFFSET " + offset + ";";
    console.log(statement);

    db.all(statement, function(err, results) { // closure
      if(err) {
        console.log(err); // error handling
        return;
      }
      results = convertReleaseDate(results);

      return response.status(200).json(results);
    });

    db.close();
  },

  by_title: function(request, response) {
    console.log("INSIDE BY_TITLE");
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();
    var queried_title = request.params.title;

    var statement =
      "SELECT * FROM movies \
      WHERE title = '" + queried_title + "'";

      console.log(statement);


    db.all(statement, function(err, result) {
      if(err) {
        console.log(err); // error handling
        return;
      };
      return response.status(200).json(result);

    });
    db.close();
  },

  customer_id: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();
    var title = request.params.title;
    var query = request.params.query;
    var page = request.params.page || 1;
    var offset = (page - 1) * movies.limit;

    var statement =
      "SELECT * FROM rentals \
      WHERE movie_title = '" + title +
      "'AND returned = 1 \
      ORDER BY customer_id \
      LIMIT " + movies.limit + " \
      OFFSET " + offset;

    db.all(statement, function(err, result) {
      if(err) {
        console.log(err); // error handling
        return;
      };
      return response.status(200).json(result);

    });
    db.close();
  },

  customer_name: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();
    var title = request.params.title;
    var query = request.params.query;
    var page = request.params.page || 1;
    console.log("INSIDE CUSTOMER_NAME");
    var offset = (page - 1) * movies.limit;

    var statement =
      "SELECT customers.name, rentals.check_out_date, \
      rentals.movie_title \
      FROM rentals LEFT JOIN customers \
      ON rentals.customer_id = customers.id \
      WHERE rentals.movie_title = 'Alien' \
      AND rentals.returned = 0";

      console.log("STATEMENT: " + statement);


    db.all(statement, function(err, result) {
      if(err) {
        console.log(err); // error handling
        return;
      };
      return response.status(200).json(result);
    });
    db.close();
  },

  check_out_date: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();
    var title = request.params.title;
    var query = request.params.query;
    var page = request.params.page;
    var offset = (page - 1) * movies.limit;

    var statement =
      "SELECT * FROM rentals \
      WHERE movie_title = '" + title + "' \
      AND returned = 1 \
      ORDER BY check_out_date \
      LIMIT " + movies.limit + " \
      OFFSET " + offset + ");";
      console.log(statement);


    db.all(statement, function(err, result) {
      if(err) {
        console.log(err); // error handling
        return;
      };
      return response.status(200).json(result);

    });
    db.close();
  },

  whos_renting: function(request, response) {
    var db = new sqlite3.Database("db/" + dbEnv + ".db");
    var movies = new movieTable();
    var title = request.params.title;
    var page = request.params.page || 1;
    var offset = (page - 1) * movies.limit;

    var statement =
      "SELECT * FROM rentals \
      WHERE movie_title = '" + title + "' \
      AND returned = 0 \
      LIMIT " + movies.limit + " \
      OFFSET " + offset;

    db.all(statement, function(err, result) {
      if(err) {
        console.log(err); // error handling
        return;
      };
      return response.status(200).json(result);

    });
    db.close();
  }

}