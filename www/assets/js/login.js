var xhttp;


function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    
    return xhr;

}


$(document).ready(function(){
    

    $("#bLogin").click(function(){
        
        var user = $("#name").val();
        var password = $("#password").val();

        var request = "username="+user+"&password="+password;

        console.log("Button clicked");

        var url = '/v2/user/login';


        xhttp = createCORSRequest('POST', url);
        if (!xhttp) {
            throw new Error('CORS not supported');
        }

        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhttp.onload = function() {
          var text = "SEND";
          $("#res").text(xhttp.status);

        };

        
        xhttp.send(request);

    });

    $("#bLogout").click(function(){
      
      console.log("Button LOGOUT clicked");

      var url = '/v2/user/logout';

      xhttp = createCORSRequest('POST', url);
      if (!xhttp) {
          throw new Error('CORS not supported');
      }

      xhttp.onload = function() {
        var text = "LOGGED OUT";
        $("#res").text(text);
      };
      
      xhttp.send();

  });

});