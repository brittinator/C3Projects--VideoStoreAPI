"use strict";

// --------------- helper functions --------------- //
var helps = "../helpers/";
var fixTime = require(helps + "milliseconds_to_date");
var movies = helps + "movies/";
var validateParams = require(helps + "validate_params");
var ourWebsite = require(helps + "url_base");

var Movie = function() { // movie constructor
  this.limit = 10; // we like ten
}

Movie.prototype.movieInfo = function(error, data) {

  var results = { meta: {} };
  var status;
  if (error) { // log error if error
    status = 500; // internal server error
    results.data = {
      status: status,
      message: error
    }
  } else if (data.length == 0) { // handling for no results
    status = 303; // see other
    results.data = {
      status: status,
      message: "No results found. You must query this endpoint with an exact title."
    };
  } else {
    data = fixTime(data, "release_date"); // fixing time
    status = 200; // ok
    results.data = {
      status: status,
      movieInfo: data[0]
    };

    var title = results.data.movieInfo.title;
    results.meta.customersHoldingCopies = ourWebsite + "/rentals/" + title + "/customers";
  };

  results.meta.rentalInfo = ourWebsite + "/rentals/" + title;
  results.meta.yourQuery = ourWebsite + "/movies/" + title;

  return results;

}

Movie.prototype.addPageMetadata = function(data) {
  var results = { meta: {} };
  // results.meta.yourQuery = ourWebsite + "/movies/" + title;
  if (page >= 1 && totalResults > 10 * page)
    results.meta.nextPage = results.meta.yourQuery + "/" + (page + 1);
  if (page >= 2)
    results.meta.prevPage = results.meta.yourQuery + "/" + (page - 1);
  if (page != 1)
  //   results.meta.yourQuery += "/" + page;
  // results.meta.previousPage =  ;
  // results.meta.nextPage =  ;
}

module.exports = Movie;
