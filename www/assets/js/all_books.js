$(document).ready(function(){
    
  console.log("Button clicked");

  var url = '/v2/books';

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;
    

    var myJSON = text;
    var myObj = JSON.parse(myJSON);
    $("#query").text(myObj.length);

    for(var i =0; i<myObj.length;i++){
      var name =myObj[i].name;
      var themes = myObj[i].themes;
      var id = myObj[i].id;
      var literary_genres = myObj[i].literary_genres;
      var abstract = myObj[i].abstract;
      var fact_sheet = myObj[i].fact_sheet;
      var img = myObj[i].picture;
      var url = "book.html?id=" +  id
      newListElement(name,abstract,img,url, "Allbooks");
    }
  };

  xhttp.send();

});

