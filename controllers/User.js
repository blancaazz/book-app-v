'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;


  if(username == "carlos" && password == "abc"){
    if(!req.session.loggedin) {
      if(req.session.isNew){
        req.session.loggedin = true;
        console.log("Need to Log in");
      }
    } else {
       req.session.loggedin = !req.session.loggedin;
       console.log("Already Log in");
    }
    console.log("Acepted User");
  }
  
  User.userLoginPOST(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      req.session = null;
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
