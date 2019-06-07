
function printListGenre(name){
  console.log(name);

  var element = document.createElement("div");
  element.className = "p-2 flex-fill";
  var genre = document.createElement("a");
  var textGenre = document.createTextNode(name);


  genre.href = "genres.html?name="+ name;

  genre.appendChild(textGenre);
  element.appendChild(genre);
  document.getElementById("flex_genres").appendChild(element);
}

function printGenres(){
  var url = '/v2/genres/getGenres';


  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
      
    var text = xhttp.responseText;

    var myJSON = text;
    var myObj = JSON.parse(myJSON);

  //tener en cuenta que puede ser más de un autor(a)
    for(var i =0; i<myObj.length;i++){
      var genre = myObj[i].name;
      //$("#textito").text(theme);
      printListGenre(genre);
    }
  }

  xhttp.send();
}


$(document).ready(function(){
     
    printGenres();
    printElementsGroup("favourites");
  
  });