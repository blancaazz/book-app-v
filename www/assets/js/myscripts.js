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

function newListElement(iTitle,iData1,image) {

  var container = document.createElement("div");
  var divRow = document.createElement("div");
  var divLeftCol  = document.createElement("div");
  var divRightCol  = document.createElement("div");

  var title = document.createElement("h3");
  var textTitle = document.createTextNode(iTitle);
  
  var data1 = document.createElement("p");
  var textData1 = document.createTextNode(iData1);


  var img = document.createElement("img");
  img.src = "assets/img/portfolio/4-thumbnail.jpg";

  container.className="container features";
  divRow.className = "row";
  divLeftCol.className = "col-lg-8 col-md-4 col-sm-12";
  divRightCol.className = "col-lg-4 col-md-4 col-sm-12";
  title.className = "feature-title";
  img.className = "img-fluid";

  title.appendChild(textTitle);

  data1.appendChild(textData1);

  divLeftCol.appendChild(title);
  divLeftCol.appendChild(data1);

  divRightCol.appendChild(img);

  divRow.appendChild(divLeftCol);
  divRow.appendChild(divRightCol);

  container.appendChild(divRow);

  document.getElementById("divBooks").appendChild(container);
 
}


$(document).ready(function(){
    

    $("button").click(function(){
        
        console.log("Button clicked");

        var url = 'http://localhost:8080/v2/books';

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
            var themes = myObj[i].themes;
            newListElement(name,themes,"WW");
          }
        };

        xhttp.send();

    });

});

