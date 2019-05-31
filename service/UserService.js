'use strict';

let sqlDb;

exports.userDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if events table exists");

  return database.schema.hasTable("users").then(exists => {
    if (!exists) {
      console.log("ERROR-CHECK DATABASE");
      return;
    }
  });
};

/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {

    return sqlDb("users")
    .where('name_user', '=', username)
    .then(result => {
      //console.log(result);
      if(result[0].password == password){
        resolve(result[0].id);
      }else{
        reject("Wrong Password");
      }
    }).catch(function(){
      reject("Wrong Name");
    });

  });
}


/**
 * Logout
 * Logout with a form
 *
 * no response value expected for this operation
 **/
exports.userLogoutPOST = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}



/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

/**
 * Get actual user name
 * Returns string
 *
 * returns String
 **/
exports.getUserName = function(userId) {
  return sqlDb("users")
  .where('id', '=', userId)
  .then(result => {
    console.log(result[0].name_user),
    resolve(result[0].name_user);
    return result[0].name_user;
    
  }).catch(function(){
    reject("Wrong Id");
  });

}

/**
 * reserveBook
 * Logged user Reserve Book
 *
 * bookId String 
 * no response value expected for this operation
 **/
exports.userReserveBook = function(bookId,userId) {
  return sqlDb("users")
  .where('id', '=', userId)
  .update({
    reserves: sqlDb.raw('array_append(reserves,?)', [bookId])
  })
}

/**
 * reserveBook
 * Logged user Reserve Book
 *
 * bookId String 
 * no response value expected for this operation
 **/
exports.userDeleteReserve = function(bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}



/**
 * Get actual user shopping cart
 * Returns array of books
 *
 * returns List
 **/
exports.getShoppingCart = function(userId) {
  //var subquery = sqlDb('users').where('id', '=', userId).select('reserves').map;
  
  return sqlDb("users")
  .where('id', '=', userId)
  .select('reserves')
  .map(e=>function(e){
    return e;
  });
}

