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
 
         var url = '/v2/events';
 
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
             var place = myObj[i].place;
             var date = myObj[i].date;
             var id = myObj[i].id;
             var url = "event.html?id=" +  id
             newListElement(name,place, "", url, "AllEvents");
           }
         };
 
         xhttp.send();
 
   //  });
 
 });
 
 