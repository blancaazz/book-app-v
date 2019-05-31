'use strict';

let sqlDb;




exports.booksDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if books table exists");

  return database.schema.hasTable("books").then(exists => {
    if (!exists) {
      console.log("ERROR-CHECK DATABASE");
      return;
    }
  });
};



/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.booksGET = function(offset,limit) {
  return sqlDb("books")
  .limit(limit)
  .offset(offset)
  .then(data => {
    return data;
  });
}


/**
 * Find book Author
 * Returns an author
 *
 * bookId Long ID of book to search
 * returns List
 **/
exports.getBookAuthor = function(bookId) {

  var subquery = sqlDb('written').where('id_libro', '=', bookId).select('id_author');
  
  return sqlDb("authors")
  .where('id', 'in', subquery)
  .then(data => {
    return data;
  });
}


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return sqlDb("books")
  .where('id','=',bookId)
  .then(data => {
    return data;
  });
}


/**
 * Find book Event
 * Returns an event
 *
 * bookId Long ID of book to search
 * returns List
 **/
exports.getBookEvent = function(bookId) {
  var subquery = sqlDb("presented").where('id_book', '=', bookId).select('id_event');

  return sqlDb("events")
  .where('id', 'in', subquery)
  .then(data => {
    return data;
  })
}



/**
 * Find book by name
 * Returns a ID
 *
 * bookName String Name of book to return
 * returns IdObject
 **/
exports.getBookId = function(bookName) {
  return sqlDb("books")
  .where('name','=',bookName)
  .then(data => {
    return data;
  });
}



/**
 * Find similar book
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getSimilarBook = function(bookId) {
  var subquery = sqlDb("similar").where('id_book', '=', bookId).select('others');
  var subq = subquery.join(", ");
  return sqlDb("books")
  .where('id', '<@', subq)
  .then(data => {
    return data;
  })
}