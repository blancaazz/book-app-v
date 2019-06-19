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


/**
 * Get all last month events
 * Returns Events Array
 *
 * returns List
 **/
exports.getLastMonthEvents = function() {

 



  return sqlDb("events")
  .then (events => {
    
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
  
    var limitMonth;
    var limitYear;
    console.log(d)

    console.log("Today is: "+day+"/"+month+"/"+year);

    if(month < 11){
      limitMonth = month + 1;
      limitYear = year;
    }
    else{
      limitMonth = 1;
      limitYear = year + 1;
    }

    console.log("Limit: "+day+"/"+limitMonth+"/"+limitYear);
    
    var arraylength = events.length;

    console.log(arraylength);

    var result = [];
    var indexR = 0;

    for(var i = 0; i < arraylength; i++)
    {

      var date = events[i].date;
      var eDay = date.substring(0,2);
      var eMonth = date.substring(3,5);
      var eYear = date.substring(6,10);

      console.log("Event: "+eDay+eMonth+eYear);

      if(eYear>year && eYear <= limitYear){
        result[indexR]=events[i];
        indexR++;
        console.log(events[i]);
      }else if(eYear==year){
        //console.log(events[i]);
        if(eMonth > month && eMonth <= limitMonth && eDay <= day){
          result[indexR]=events[i];
          indexR++;
          console.log(events[i]);
        }else if(eMonth == month){
          if(eDay >= day){
            result[indexR]=events[i];
            indexR++;
            console.log(events[i]);
          }
        }
      }
    }

    return result;
  
  })
}
  