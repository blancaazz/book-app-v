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
    

    // $("button").click(function(){
         
         console.log("Button clicked");
 
         var url = '/v2/authors';
 
         var xhttp = createCORSRequest('GET', url);
         if (!xhttp) {
             throw new Error('CORS not supported');
         }
 
         xhttp.onload = function() {
           
           var text = xhttp.responseText;
           //$("#response").text(text);
 
           var myJSON = text;
           var myObj = JSON.parse(myJSON);
           $("#query").text(myObj.length);
 
           for(var i =0; i<myObj.length;i++){
             var name =myObj[i].name;
             var bio = myObj[i].bio;
             var picture = myObj[i].picture;
             var id = myObj[i].id;
             var url = "author.html?id=" +  id
             newListElement(name, bio, picture, url, "AllAuthors");
           }
         };
 
         xhttp.send();
 
   //  });
 
 });
 
 
