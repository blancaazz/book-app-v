'use strict';


/**
 * Find event by name
 * Returns a ID
 *
 * eventName String Name of event to return
 * returns IdObject
 **/
exports.getEventId = function(eventName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "value" : 10
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all events
 * Returns Events Array
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit) {
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
 * Find event by ID
 * Returns an event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
exports.geteventById = function(eventId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "Book Expo",
  "location" : "Politecnico di Milano",
  "date" : "21-10-1998"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

