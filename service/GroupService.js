'use strict';

let sqlDb;

exports.groupDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if group table exists");

  return database.schema.hasTable("themes").then(exists => {
    if (!exists) {
      console.log("ERROR-CHECK DATABASE");
      return;
    }
  });
};


/**
 * Get list of books
 * Returns an array of books
 *
 * genreName String ID of book to search
 * returns List
 **/
exports.getGenresBooks = function(genreName) {
  return sqlDb("books")
  .where('literary_genres', '@>', [genreName])
  .then (data => {
    return data;
  })
}


/**
 * Get Genres names
 * Returns Group Array
 *
 * returns List
 **/
exports.getGenresList = function() {
  return sqlDb("literary_genres")
  .then( data => {
    return data;
  })
}


/**
 * Get list of books
 * Returns an array of books
 *
 * themeName String Name of book to search
 * returns List
 **/
exports.getThemesBooks = function(themeName) {
  
  return sqlDb("books")
  .where('themes', '@>', [themeName])
  .then (data => {
    return data;
  })
}


/**
 * Get Themes names
 * Returns Group Array
 *
 * returns List
 **/
exports.getThemesList = function() {
  return sqlDb("themes")
  .then (data => {
    return data;
  })
}

