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
      console.log(result);
      if(result[0].password == password){
        resolve();
      }else{
        reject("Wrong Password");
      }
    }).catch(function(){
      reject("Wrong Name");
    });

    // if(username == "admin" && password == "abc"){
    //   resolve();
    // }else{
    //   reject("Wrong Password");
    // }

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

