function addListTheme(name){
  $("#textito").text(name);
  var item = document.createElement("li");
  var theme = document.createElement("a");
  var textTheme = document.createTextNode(name);

  theme.href = "themes.html?name="+ name;

  theme.appendChild(textTheme);
  item.appendChild(theme);
  document.getElementById("themes_dropdown").appendChild(item);


}
  
function addThemes(){
  var url = '/v2/themes/getThemes';


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
      var theme = myObj[i].name;
      //$("#textito").text(theme);
      addListTheme(theme);
    }
  }

  xhttp.send();
}


function addListGenre(name){
  $("#textito").text(name);
  var item = document.createElement("li");
  var genre = document.createElement("a");
  var textGenre = document.createTextNode(name);

  genre.href = "genres.html?name="+ name;

  genre.appendChild(textGenre);
  item.appendChild(genre);
  document.getElementById("genres_dropdown").appendChild(item);


}

function addGenres(){
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
      addListGenre(genre);
    }
  }

  xhttp.send();
}