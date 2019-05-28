'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.getGenresBooks = function getGenresBooks (req, res, next) {
  var genreName = req.swagger.params['genreName'].value;
  Group.getGenresBooks(genreName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGenresList = function getGenresList (req, res, next) {
  Group.getGenresList()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getThemesBooks = function getThemesBooks (req, res, next) {
  var themeName = req.swagger.params['themeName'].value;
  Group.getThemesBooks(themeName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getThemesList = function getThemesList (req, res, next) {
  Group.getThemesList()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
