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
    var title = document.createElement("h1");
    var textTitle = document.createTextNode(iTitle);
    title.appendChild(textTitle);
    document.getElementById("description").appendChild(title);


  //lista de géneros      
    /*
    var genresH = document.createElement("h5");
    var genresText = "";
    for (var i= 0; i < genres.length; i++){
      genresText += genres[i] + "   ,   ";
    }
    //$("#textito").text(genresText);

    var textGenres = document.createTextNode(genresText);
    genresH.appendChild(textGenres);
    document.getElementById("genres").appendChild(genresH);
    */
    //var genresC = document.createElement("div");

;
    for(var i = 0; i < genres.length; i++){
      var genresC = document.createElement("li");
      var genresH = document.createElement("p");
      var textGenres = document.createTextNode(genres[i]);
      genresH.appendChild(textGenres);
      genresC.appendChild(genresH);
      document.getElementById("genres").appendChild(genresC);
    }


    //en plan los temas y géneros faltaría hacerlos más bonito metiendolos
  //en una listilla guapetona
  //lista de temas
    for(var i = 0; i < themes.length; i++){
      var themesC = document.createElement("li");
      var themesH = document.createElement("p");
      var textThemes = document.createTextNode(themes[i]);
      themesH.appendChild(textThemes);
      themesC.appendChild(themesH);
      document.getElementById("themes").appendChild(themesC);
    }
    //$("#textito").text(themesText);


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

  //$("#textito").text(url);

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

function addListSimilar(id, name, picture, numero){
  
  if((numero % 3) == 0){
    console.log("holi")
    var container = document.createElement("div");
    container.class = "carousel-item";
    var list = document.createElement("ul");
    list.id = "lista" + parseInt(numero / 3);
    $("#textito").text(list.id);
    //container.id = "carousel" + (numero / 3);
    var element = document.createElement("li");
    var nameH = document.createElement("h3");
    var textName = document.createTextNode(name);
    nameH.appendChild(textName);
    var img = document.createElement("img");
    img.src = "assets/img/portfolio/4-thumbnail.jpg";

    element.appendChild(nameH);
    element.appendChild(img);
    list.appendChild(element);
    container.appendChild(list);
    document.getElementById("carouselSimilarInner").appendChild(container);
    
  }
  
  else{

    var list = document.getElementById("lista" + parseInt(numero/3));

    var element = document.createElement("li");
    var nameH = document.createElement("h3");
    var textName = document.createTextNode(name);
    nameH.appendChild(textName);
    var img = document.createElement("img");
    img.src = "assets/img/portfolio/4-thumbnail.jpg";

    element.appendChild(nameH);
    element.appendChild(img);

    //list.appendChild(element);
    
  }
  
  //$("#textito").text(numero);

}

function addSimilar(id_book){
  var url = '/v2/books/getSimilar/'+ id_book;



  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
      
    var text = xhttp.responseText;

    var myJSON = text;
    var myObj = JSON.parse(myJSON);

    var numero = 0;
  //tener en cuenta que puede ser más de un autor(a)
  for(var i =0; i<myObj.length;i++){
    var id = myObj[i].id;
    var name =myObj[i].name;
    var picture = myObj[i].picture;
   // $("#textito").text(numero % 3);
    addListSimilar(id, name, picture, numero)
    numero = numero + 1;
  }
  //$("#textito").text(2 % 3);

};

  xhttp.send();

}


//función pa poner los elementos html y la info:

function AddInfoAuthor(id, name, picture, bio){
  //$("#textito").text(name);

  //PARTE de crear los elementos html
  var container = document.createElement("div");
  container.class = "card-body";

  //imagen
  var img = document.createElement("img");
  img.src = "assets/img/portfolio/4-thumbnail.jpg";
  img.class = "card-img-top";

  //name del autor
  var nameH = document.createElement("h3");
  nameH.class="card-title"; 
  var nameText = document.createTextNode(name);
  nameH.appendChild(nameText);

  //Nombre del autor pa ponerlo debajo del titulo del libro:

  var nameHBook = document.createElement("h3"); 
  var nameTextBook = document.createTextNode(name);
  nameHBook.appendChild(nameTextBook);
  
  //bio
  var bioP = document.createElement("p");
  bioP.class = "card-text";
  var bioText = document.createTextNode(bio);
  bioP.appendChild(bioText);

  //link a la página del autor/a
  var aAuthor = document.createElement("a");
  var aText = document.createTextNode("Go to this author");
  aAuthor.href = "author.html?id=" + id;
  aAuthor.appendChild(aText);


  container.appendChild(nameH);
  container.appendChild(bioP);
  container.appendChild(aAuthor);

  document.getElementById("author_card").appendChild(img);
  document.getElementById("author_card").appendChild(container);
  document.getElementById("author_book").appendChild(nameHBook);


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

    //$("#textito").text(GET["id"]);

    var url = '/v2/books/'+ GET["id"];

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

      var name =myObj[0].name;
      var themes = myObj[0].themes;
      var id = myObj[0].id;
      var literary_genres = myObj[0].literary_genres;
      var abstract = myObj[0].abstract;
      var fact_sheet = myObj[0].fact_sheet;
      var picture = myObj[0].picture;

      //$("#textito").text(literary_genres);
      newListElement(name, abstract,"WW", literary_genres, themes, fact_sheet);
      addAuthor(id);
      addSimilar(id);
    
  };

    xhttp.send();

});
