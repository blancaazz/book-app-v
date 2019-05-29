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
    

    $("#send").click(function(){
        
        var user = $("#user").text;
        var password = $("#password").text;

        // var obj = `{
        //   "username" : "Raj",
        //   "password" : 32
        //   }`;

        // var newJson = JSON.parse(obj);
        // newJson.username = user;
        // newJson.password = password;

        var request = "username="+user+"&password="+password;

        console.log("Button clicked");

        var url = 'v2/user/login';


        xhttp = createCORSRequest('POST', url);
        if (!xhttp) {
            throw new Error('CORS not supported');
        }

        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhttp.onload = function() {
          var text = xhttp.getResponseHeader("Set-Cookie");
          $("#res").text(text);

        };

        
        xhttp.send(request);

    });

});