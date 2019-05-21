'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.booksGET = function booksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Book.booksGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookAuthor = function getBookAuthor (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.getBookAuthor(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.getBookById(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookEvent = function getBookEvent (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.getBookEvent(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookId = function getBookId (req, res, next) {
  var bookName = req.swagger.params['bookName'].value;
  Book.getBookId(bookName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
