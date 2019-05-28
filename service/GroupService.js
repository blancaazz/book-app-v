'use strict';


/**
 * Get list of books
 * Returns an array of books
 *
 * genreName String ID of book to search
 * returns List
 **/
exports.getGenresBooks = function(genreName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
}, {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Genres names
 * Returns Group Array
 *
 * returns List
 **/
exports.getGenresList = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "name" : "Group X"
}, {
  "id" : 0,
  "name" : "Group X"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get list of books
 * Returns an array of books
 *
 * themeName String Name of book to search
 * returns List
 **/
exports.getThemesBooks = function(themeName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
}, {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get Themes names
 * Returns Group Array
 *
 * returns List
 **/
exports.getThemesList = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "name" : "Group X"
}, {
  "id" : 0,
  "name" : "Group X"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

