'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  
  var statusCode = 200;


  User.userLoginPOST(username,password)
    .then(response=> {
      //LOGIN
      console.log("Return message: "+ response);
      if(!req.session.loggedin) {        
        req.session.loggedin = true;
        req.session.name = response;
        console.log("Need to Log in");
      } else {
         console.log("Already Logged in: "+req.session.name);
      }

      utils.writeJson(res, response,"200");

    })
    .catch(err=> {
      // req.session = null;
      console.log("Error logging: "+err);
      //utils.writeJson(res, err);
    });
};


module.exports.userLogoutPOST = function userLogoutPOST (req, res, next) {

  req.session = null;
  //req.session.name = "";

  console.log("Logout");

  User.userLogoutPOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.userRegisterPOST = function userRegisterPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userRegisterPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.getUserName = function getUserName (req, res, next) {
  console.log("Getting name of: "+ req.session.name);
  User.getUserName(req.session.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userReserveBook = function userReserveBook (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  User.userReserveBook(bookId,req.session.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userDeleteReserve = function userDeleteReserve (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  User.userDeleteReserve(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getShoppingCart = function getShoppingCart (req, res, next) {
  User.getShoppingCart(req.session.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

