$(document).ready(function(){

  //Get the query info
  var GET = {};
  var query = window.location.search.substring(1).split("&");
  for (var i = 0, max = query.length; i < max; i++) {
      if (query[i] === "") // check for trailing & with no param
          continue;
      var param = query[i].split("=");
      GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
  }

  var url = '/v2/genre/getBooks/'+ GET["name"];

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
        var img = myObj[i].picture;
        var url = "book.html?id=" +  id
        newListElement(name,abstract,img,url, "Genres");
    }
  };

    xhttp.send();

  });