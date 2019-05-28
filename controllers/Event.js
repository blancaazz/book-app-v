'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventId = function getEventId (req, res, next) {
  var eventName = req.swagger.params['eventName'].value;
  Event.getEventId(eventName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEvents = function getEvents (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Event.getEvents(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.geteventById = function geteventById (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.geteventById(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
