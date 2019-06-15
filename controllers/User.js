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

      
      try {
        utils.writeJson(res);
      }
      catch(err) {
        console.log("Try error: "+err);
      }


    })
    .catch(err=> {
      req.session = null;
      console.log("Error logging: "+err);

      try {
        utils.writeJson(res, null,404);
      }
      catch(err) {
        console.log("Try error: "+err);
      }

    });
};

// module.exports.userLoginPOST = function userLoginPOST(req, res, next) {
//   var username = req.swagger.params["username"].value;
//   var password = req.swagger.params["password"].value;

//   if(!req.session.loggedin) {
//     if(req.session.isNew){
//       req.session.loggedin = true;
//       console.log("Need to Log in");
//     }
//   } else {
//      req.session.loggedin = !req.session.loggedin;
//      console.log("Already Log in");
//   }

//   User.userLoginPOST(username, password)
//     .then(function(response) {
//       try {
//         utils.writeJson(res, response);
//       }
//       catch(err) {
//         console.log("Try error: "+err);
//       }
//     })
//     .catch(function(response) {
//       console.log("error: "+response);
//       utils.writeJson(res, response);
//     });
// };


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
  User.getUserName(req.session.name)
    .then(function (response) {
      console.log("Username: "+ response);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response,404);
    });
};

module.exports.userReserveBook = function userReserveBook (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;

  console.log("Adding book: "+bookId+" by: "+req.session.name);

  User.userReserveBook(bookId,req.session.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(err => {
      console.log(err);
      utils.writeJson(res, err,404);
    });
};

module.exports.userDeleteReserve = function userDeleteReserve (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  User.userDeleteReserve(bookId,req.session.name)
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

