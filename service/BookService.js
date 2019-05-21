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
    return data.map(e => {
      e.price = { valuse: e.value, currency: e.currency };
      return e;
    });
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
  return sqlDb("books")
  .where('id','=',bookId)
  .then(data => {
    return data.map(e => {
      e.price = { valuse: e.value, currency: e.currency };
      return e;
    });
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "name" : "Book Expo",
  "location" : "Politecnico di Milano",
  "date" : "21-10-1998"
}, {
  "id" : 0,
  "name" : "Book Expo",
  "location" : "Politecnico di Milano",
  "date" : "21-10-1998"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find book by name
 * Returns a ID
 *
 * bookName String Name of book to return
 * returns IdObject
 **/
exports.getBookId = function(bookName) {
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