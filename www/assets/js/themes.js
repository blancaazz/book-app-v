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



  function newListElement(name, picture, abstract){

    var item = document.createElement("li");
    var container = document.createElement("div");
    var row = document.createElement("div");
    var col_left = document.createElement("div");
    var col_right = document.createElement("div");

    container.className = "container-fluid";
    row.className = "row";
    col_left.className = "col-sm-4";
    col_right.className = "col-sm-8";



      //imagen

    var img = document.createElement("img");
    img.className = "img-fluid";
    img.src = picture;
     
    //título
    var title = document.createElement("h1");
    var textTitle = document.createTextNode(name);
    title.appendChild(textTitle);
  
  
    //abstract
    var abstractT = document.createElement("p");
    var textAbstract = document.createTextNode(abstract);
    abstractT.appendChild(textAbstract);

    col_left.appendChild(img);
    col_right.appendChild(title);
    col_right.appendChild(textAbstract);


    row.appendChild(col_left);
    row.appendChild(col_right);
  
    container.appendChild(row);
    item.appendChild(container);

    document.getElementById("list_theme_x").appendChild(item);  
}


$(document).ready(function(){

    //pa la navbar
  
    addThemes();
    addGenres();
  
      var GET = {};
      var query = window.location.search.substring(1).split("&");
      for (var i = 0, max = query.length; i < max; i++) {
          if (query[i] === "") // check for trailing & with no param
              continue;
          var param = query[i].split("=");
          GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
      }
      
  
      //console.log("Poniendo ready esto");
  
      //$("#textito").text(GET["id"]);
  
      var url = '/v2/themes/getBooks/'+ GET["name"];
  
      //$("#textito").text(url);
  
      var xhttp = createCORSRequest('GET', url);
      if (!xhttp) {
          throw new Error('CORS not supported');
      }
  
      xhttp.onload = function() {
        
        var text = xhttp.responseText;
        //$("#response").text(text);
  
        var myJSON = text;
        var myObj = JSON.parse(myJSON);
        
        for(var i = 0; i < myObj.length; i++){
            var name =myObj[i].name;
            var themes = myObj[i].themes;
            var id = myObj[i].id;
            var literary_genres = myObj[i].literary_genres;
            var abstract = myObj[i].abstract;
            var fact_sheet = myObj[i].fact_sheet;
            var picture = myObj[i].picture;
            newListElement(name, picture, abstract);
        }

        //$("#textito").text(literary_genres);

      
    };
  
      xhttp.send();
  
  });