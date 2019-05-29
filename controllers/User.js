'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  
  User.userLoginPOST(username,password)
    .then(function (response) {

      //LOGIN
      if(!req.session.loggedin) {        
        req.session.loggedin = true;
        console.log("Need to Log in");
      } else {
         console.log("Already Logged in");
      }

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      req.session = null;
      utils.writeJson(res, response, 404);
    });
};


module.exports.userLogoutPOST = function userLogoutPOST (req, res, next) {

  req.session = null;

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
