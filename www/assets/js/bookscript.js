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


//función que pone el titulito, imagen y las cosillas propias de la base de datos del libro

function newListElement(iTitle, iAbstract,image, genres, themes, iFactSheet) {
  
  //imagen

    var img = document.createElement("img");
    img.className = "img-fluid";
    img.src = "assets/img/portfolio/4-thumbnail.jpg";
    document.getElementById("image").appendChild(img);
   
  //título
    var title = document.createElement("h3");
    var textTitle = document.createTextNode(iTitle);
    title.appendChild(textTitle);
    document.getElementById("description").appendChild(title);


  //lista de géneros      
    var genresH = document.createElement("h5");
    var genresText = "";
    for (var i= 0; i < genres.length; i++){
      genresText += genres[i] + "   ,   ";
    }
    $("#textito").text(genresText);

    var textGenres = document.createTextNode(genresText);
    genresH.appendChild(textGenres);
    document.getElementById("genres").appendChild(genresH);

    //en plan los temas y géneros faltaría hacerlos más bonito metiendolos
  //en una listilla guapetona
  //lista de temas
    var themesH = document.createElement("h5");
    var themesText = "";
    for (var i= 0; i < themes.length; i++){
      themesText += themes[i] + "   ,   ";
    }
    $("#textito").text(themesText);

    var textThemes = document.createTextNode(themesText);
    themesH.appendChild(textThemes);
    document.getElementById("themes").appendChild(themesH);

    //abstract
    var abstract = document.createElement("p");
    var abstractText = document.createTextNode(iAbstract);
    abstract.appendChild(abstractText);
    document.getElementById("abstract").appendChild(abstract);


    //fact sheet
    var factSheet = document.createElement("p");
    var factSheetText = document.createTextNode(iFactSheet);
    factSheet.appendChild(factSheetText);
    document.getElementById("fact_sheet").appendChild(factSheet);
   
  }

  
  //funsión de prueba
function addElement(){
  var newDir = document.createElement("div");
  var newContent = document.createTextNode("holiii");
  newDir.appendChild(newContent);

  var currentDiv = document.getElementById("div1");
  currentDiv.appendChild(newDir);
}

  
//función para obtener los datos del autor/a

function addAuthor(id_book){
  var url = '/v2/books/getAuthor/'+ id_book;

  $("#textito").text(url);

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
      
    var text = xhttp.responseText;

    var myJSON = text;
    var myObj = JSON.parse(myJSON);


  //tener en cuenta que puede ser más de un autor(a)
  //for(var i =0; i<myObj.length;i++){
    var id = myObj[0].id;
    var name =myObj[0].name;
    var picture = myObj[0].picture;
    var bio = myObj[0].bio;
    
  //}
    AddInfoAuthor(id, name, picture, bio);


};

  xhttp.send();

}


//función pa poner los elementos html y la info:

function AddInfoAuthor(id, name, picture, bio){
  $("#textito").text(name);

  //PARTE de crear los elementos html
  var container = document.createElement("div");
  container.class = "card";

  var img = document.createElement("img");
  img.src = "assets/img/portfolio/4-thumbnail.jpg";
  img.class = "card-img-top";

  var cardBody = document.createElement("div");
  cardBody.class = "card-body";

  var nameH = document.createElement("h4");
  nameH.class = "card-title";
  
  var nameText = document.createTextNode(name);
  nameH.appendChild(nameText);
  

  var bioP = document.createElement("p");
  bioP.class = "card-text";
  
  var bioText = document.createTextNode(bio);
  bioP.appendChild(bioText);

  var aAuthor = document.createElement("a");
  var aText = document.createTextNode("Go to this author");
  aAuthor.class = "btn btn-primary";
  aAuthor.href = "author.html?id=" + id;
  aAuthor.appendChild(aText);

  cardBody.appendChild(nameH);
  cardBody.appendChild(bioP);
  cardBody.appendChild(aAuthor);

  container.appendChild(img);
  container.appendChild(cardBody);

  document.getElementById("author").appendChild(container);
}


$(document).ready(function(){

	var GET = {};
	var query = window.location.search.substring(1).split("&");
	for (var i = 0, max = query.length; i < max; i++) {
		if (query[i] === "") // check for trailing & with no param
			continue;
		var param = query[i].split("=");
		GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
	}
    

    //console.log("Poniendo ready esto");

    $("#textito").text(GET["id"]);

    var url = '/v2/books/'+ GET["id"];

    $("#textito").text(url);

    var xhttp = createCORSRequest('GET', url);
    if (!xhttp) {
        throw new Error('CORS not supported');
    }

    xhttp.onload = function() {
      
      var text = xhttp.responseText;
      //$("#response").text(text);

      var myJSON = text;
      var myObj = JSON.parse(myJSON);

      var name =myObj[0].name;
      var themes = myObj[0].themes;
      var id = myObj[0].id;
      var literary_genres = myObj[0].literary_genres;
      var abstract = myObj[0].abstract;
      var fact_sheet = myObj[0].fact_sheet;
      var picture = myObj[0].picture;

      $("#textito").text(literary_genres);
      newListElement(name, abstract,"WW", literary_genres, themes, fact_sheet);
      addAuthor(id);
    
  };

    xhttp.send();

});
