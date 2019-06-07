var xhttp;

//import { createCORSRequest } from './comfunctions.js';
var com = import('./comfunctions.js');
// no path if it's an npm module

$(document).ready(function(){
    

    $("#bLogout").click(function(){
        let returnFunction = function(){
            $("#res").text(xhttp.status);
        };
        com.logoutFunc(returnFunction);
      
  });

});