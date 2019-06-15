'use strict';

let sqlDb;

exports.eventsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if events table exists");

  return database.schema.hasTable("events").then(exists => {
    if (!exists) {
      console.log("ERROR-CHECK DATABASE");
      return;
    }
  });
};
/**
 * Find event by name
 * Returns a ID
 *
 * eventName String Name of event to return
 * returns IdObject
 **/
exports.getEventId = function(eventName) {
  return sqlDb("events")
  .where('place', '=', eventName)
  .then(result => {
    return result;
  })
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
  return sqlDb("events")
  .then (result => {
    return result;
  })
}


/**
 * Find event by ID
 * Returns an event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
exports.geteventById = function(eventId) {
  return sqlDb("events")
  .where('id',  '=', eventId)
  .then(result => {
    return result;
  })
}


/**
 * Get books of event
 * Returns a book
 *
 * eventId Long ID of event to return
 * returns List
 **/
exports.getEventsBooks = function(eventId) {
  var subquery = sqlDb("presented").where('id_event', '=', eventId).select('id_book');

  return sqlDb("books")
    .where('id', 'in', subquery)
    .then (result => {
      return result;
    })
}
  