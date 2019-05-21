'use strict';


/**
 * Authors available in the inventory
 * List of all authors
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.authorsGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "name" : "Cervantes"
}, {
  "id" : 0,
  "name" : "Cervantes"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find Author's books
 * Returns an array of books
 *
 * authorId Long ID of book to search
 * returns List
 **/
exports.getAuthorBooks = function(authorId) {
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
 * Find Author by ID
 * Returns an author
 *
 * authorId Long ID of Author to return
 * returns Author
 **/
exports.getAuthorById = function(authorId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "Cervantes"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find author by name
 * Returns a ID
 *
 * authorName String Name of book to return
 * returns IdObject
 **/
exports.getAuthorId = function(authorName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "value" : 0.8008281904610115
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

