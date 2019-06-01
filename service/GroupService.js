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


/**
 * Get list of books
 * Returns an array of books
 *
 * groupName String Name of book group
 * returns List
 **/
exports.getGroupBooks = function(groupName) {
  var subquery = [];
  if(groupName == "favourites"){
    subquery = sqlDb("favourites").select('id');

  }
  else if(groupName == "best_sellers"){
    subquery = sqlDb("best_sellers").select('id');
  }
  return sqlDb("books")
  .where('id', 'in', subquery)
  .then(data =>{
    return data;
  })
}

