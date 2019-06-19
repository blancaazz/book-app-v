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

function reserveBook(bookId,loadFunction){
  var request = "bookId="+bookId;

  var url = '/v2/user/reserveBook';

  xhttp = createCORSRequest('POST', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhttp.onload = function() {
    console.log("Book added: "+ xhttp.status);
    loadFunction();
  };

  xhttp.send(request);
}

//función que pone el titulito, imagen y las cosillas propias de la base de datos del libro

function newListElement(iTitle, iAbstract,image, genres, themes, iFactSheet) {
  
    //imagen

    var img = document.createElement("img");
    img.className = "img-fluid";
    img.src = image;
    document.getElementById("image").appendChild(img);
   
    //título
    var title = document.createElement("h1");
    var textTitle = document.createTextNode(iTitle);
    title.appendChild(textTitle);
    document.getElementById("description").appendChild(title);


    //lista de géneros      
    for(var i = 0; i < genres.length; i++){
      var genresC = document.createElement("li");
      genresC.className ="list-group-item"
      var genresH = document.createElement("label");
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
      themesC.className = "list-group-item";
      var themesH = document.createElement("label");
      var textThemes = document.createTextNode(themes[i]);
      themesH.appendChild(textThemes);
      themesC.appendChild(themesH);
      document.getElementById("themes").appendChild(themesC);
    }
    


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

function addListSimilar(id, name, url, picture){
  
  
    var container = document.createElement("div");
    container.className= "item";
   
    var element = document.createElement("div");
    element.className = "pad15 ";

    var nameH = document.createElement("p");
    nameH.className = "lead";
    var textName = document.createTextNode(name);
    nameH.appendChild(textName);

    var img = document.createElement("img");
    img.src = picture;

    var aBook = document.createElement("a");
    var aText = document.createTextNode("Go to this book");
    aBook.className = "btn btn-primary btn-block"
    aBook.href = url;
    aBook.appendChild(aText);



    element.appendChild(nameH);
    element.appendChild(img);
    element.appendChild(aBook);
    container.appendChild(element);

  
    document.getElementById("carouselSimilarInner").appendChild(container);
   

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

   
  //tener en cuenta que puede ser más de un autor(a)
  for(var i =0; i<myObj.length;i++){
    var id = myObj[i].id;
    var name =myObj[i].name;
    var picture = myObj[i].picture;

    var url = "book.html?id=" +  id;
   // $("#textito").text(numero % 3);
    addListSimilar(id, name, url,picture)
    
  }
  //$("#textito").text(2 % 3);


  ResCarouselSize();

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
  img.src = picture;
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
  aAuthor.className = "btn btn-primary";


  container.appendChild(nameH);
  container.appendChild(bioP);
  container.appendChild(aAuthor);

  document.getElementById("author_card").appendChild(img);
  document.getElementById("author_card").appendChild(container);
  document.getElementById("author_book").appendChild(nameHBook);


}


$(document).ready(function(){

  var bookID;

  //Getting the ID from the URL
  var GET = {};
	var query = window.location.search.substring(1).split("&");
	for (var i = 0, max = query.length; i < max; i++) {
		if (query[i] === "") // check for trailing & with no param
			continue;
		var param = query[i].split("=");
		GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
	}
  
  //Variable with the actual book ID;
  bookID = GET["id"];

  //We stablish the back link
  $(".backLink").attr("href",document.referrer);

  var url = '/v2/books/'+ bookID;

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
    newListElement(name, abstract, picture, literary_genres, themes, fact_sheet);
    addAuthor(id);
    addSimilar(id);

    

  };

  xhttp.send();


  //Definition of the button events
  $("#reserveButton").click(function(){
    
    var loadFunction = function(){
      $("#reserveButton").value = "Reserve Done"
    };

    reserveBook(bookID,loadFunction);
  });


  
  $('.leftLst, .rightLst').click(function () {
      var condition = $(this).hasClass("leftLst");
      if (condition)
          click(0, this);
      else
          click(1, this)
  });


  

  $(window).resize(function () {
      ResCarouselSize();
  });

});
