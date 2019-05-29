'use strict';

let sqlDb;

exports.authorsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if authors table exists");
  return database.schema.hasTable("authors").then(exists => {
    if (!exists) {
      console.log("ERROR-CHECK DATABASE AUTHORS");
      return;
    }
  });
};




/**
 * Authors available in the inventory
 * List of all authors
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.authorsGET = function(offset,limit) {
  return sqlDb("authors")
  .limit(limit)
  .offset(offset)
  .then(data => {
    return data;
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
  var subquery = sqlDb("written").where('id_author', '=', authorId).select('id_libro');

  return sqlDb("books")
    .where('id', 'in', subquery)
    .then (result => {
      return result;
    })
}



/**
 * Find Author by ID
 * Returns an author
 *
 * authorId Long ID of Author to return
 * returns Author
 **/
exports.getAuthorById = function(authorId) {
  return sqlDb("authors")
    .where('id','=',authorId)
    .then(result => {
      
      return result.map(e => {
        console.log(e);
        return e;
      });

      
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
  return sqlDb("authors")
    .where('name','=',authorName)
    .then(result => {
      
      return result.map(e => {
        console.log(e);
        return e;
      });

      
    });
}
