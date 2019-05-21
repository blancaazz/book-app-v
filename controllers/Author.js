'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.authorsGET = function authorsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Author.authorsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorBooks = function getAuthorBooks (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  Author.getAuthorBooks(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorById = function getAuthorById (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  Author.getAuthorById(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorId = function getAuthorId (req, res, next) {
  var authorName = req.swagger.params['authorName'].value;
  Author.getAuthorId(authorName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
