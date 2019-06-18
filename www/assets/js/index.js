

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

function indexNewListElement(name, data, picture, id_url, categoria){
    /*
    var categoriaH = document.createElement("h3");
    var categoriaText = document.createTextNode(categoria);
    categoriaH.appendChild(categoriaText);

    var lista = document.createElement("ul");
    lista.class = "list-group list-group-horizontal";
    */
    var element = document.createElement("li");
    element.class = "list-group-item";

        
    var container = document.createElement("div");
    var divRow = document.createElement("div");
    var divLeftCol  = document.createElement("div");
    var divRightCol  = document.createElement("div");
    var divButtons = document.createElement("div");

    var title = document.createElement("h3");
    var textTitle = document.createTextNode(name);

    var data1 = document.createElement("p");
    var textData1 = document.createTextNode(data);
    
    var url = document.createElement("a");
    var textUrl = document.createTextNode("Leer mas");
    //url.href = 'book.html?id=' +  id;
    url.href = id_url;

    var img = document.createElement("img");
    img.src = picture;

    container.className="container features";
    divRow.className = "row";
    divLeftCol.className = "col-lg-4 col-md-4 col-sm-12";
    divRightCol.className = "col-lg-8 col-md-4 col-sm-12";
    //divButtons.className = "row";
    divButtons.id = "listButtons";
    title.className = "feature-title";
    img.className = "img-fluid";

    title.appendChild(textTitle);
    data1.appendChild(textData1);
    url.appendChild(textUrl);

    divButtons.appendChild(url);

    divRightCol.appendChild(title);
    divRightCol.appendChild(data1);
    divRightCol.appendChild(divButtons);
    divLeftCol.appendChild(img);

    divRow.appendChild(divLeftCol);
    divRow.appendChild(divRightCol);

    container.appendChild(divRow);
    element.appendChild(container);

    document.getElementById(categoria).appendChild(element);
}


function indexPrintElements(genre){

  var categoriaH = document.createElement("h3");
  var categoriaText = document.createTextNode(genre);
  categoriaH.appendChild(categoriaText);   
  document.getElementById("indexBook").appendChild(categoriaH);

  var lista = document.createElement("ul");
  lista.className = "list-group list-group-horizontal";
  lista.id = genre;
  document.getElementById("indexBook").appendChild(lista);

  var url = '/v2/genre/getBooks/' + genre;

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;

    var myJSON = text;
    var myObj = JSON.parse(myJSON);

    var aleatorio = Math.round(Math.random() * (myObj.length - 1));
    var tope = Math.min(4, myObj.length);

    for(var i = 0; i < tope; i++){
        var name =myObj[aleatorio].name;
        var themes = myObj[aleatorio].themes;
        var id = myObj[aleatorio].id;
        var img = myObj[aleatorio].picture;
        var url = "book.html?id=" +  id
        aleatorio = (aleatorio + 1) % myObj.length;
        indexNewListElement(name, themes, img, url, genre)
    }
  };

  xhttp.send();
}


function indexAddGenres(){
  var url = '/v2/genres/getGenres';


  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
      
    var text = xhttp.responseText;

    var myJSON = text;
    var myObj = JSON.parse(myJSON);

    var aleatorio = Math.round(Math.random() * (myObj.length - 1));

    for(var i = 0; i < 4; i++){

        var genre = myObj[aleatorio].name;
        aleatorio = (aleatorio + 1) % myObj.length;
        indexPrintElements(genre);
    }
  }

  xhttp.send();
  $("#textito2").text("HOLiWI");
}


function newCardElement(name, themes, picture, url, id){
  //PARTE de crear los elementos html

  var supercontainer = document.createElement("div");
  supercontainer.className = "col-sm-4"

  var bodycontainer = document.createElement("div");
  bodycontainer.className = "card";

  var container = document.createElement("div");
  container.className = "card-body";

  //imagen
  var img = document.createElement("img");
  img.src = picture;
  img.className = "card-img-top";

  //name del autor
  var nameH = document.createElement("h3");
  nameH.className="card-title"; 
  var nameText = document.createTextNode(name);
  nameH.appendChild(nameText);  
  //bio
  var dataP = document.createElement("p");
  dataP.className = "card-text";
  var dataText = document.createTextNode(themes);
  dataP.appendChild(dataText);

  //link a la página del autor/a
  var aBook = document.createElement("a");
  var aText = document.createTextNode("Go to this book");
  aBook.className = "btn btn-primary"
  aBook.href = url;
  aBook.appendChild(aText);


  container.appendChild(nameH);
  container.appendChild(dataP);
  container.appendChild(aBook);

  bodycontainer.appendChild(img);
  bodycontainer.appendChild(container);
  //bodycontainer.getElementById(id).appendChild(nameHBook);
  supercontainer.appendChild(bodycontainer);
  document.getElementById(id).appendChild(supercontainer);
}

function createRow(maxRow, id){
  for(var i = 0; i < maxRow; i++){
    var row = document.createElement("div");
    row.className = "row";
    row.id = "booksRow" + i;
    document.getElementById(id).appendChild(row);
  }

}

function booksStructure(){
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

    var maxRow = 2;
    var bookForRow = 3;
    createRow(maxRow, "books");

    for(var i =0; i< (maxRow * bookForRow);i++){
      var name =myObj[i].name;
      var themes = myObj[i].themes;
      var id = myObj[i].id;
      var literary_genres = myObj[i].literary_genres;
      var abstract = myObj[i].abstract;
      var fact_sheet = myObj[i].fact_sheet;
      var img = myObj[i].picture;
      var url = "book.html?id=" +  id;
      newCardElement(name,themes,img,url, "booksRow" + parseInt(i / bookForRow));
    }
  };

  xhttp.send();

}

$(document).ready(function(){
    

    //create structure for books
    booksStructure();
  //this function generates 4 genres randomly, and make 4 lists for each one with a max number of books of 4 (also randomly)
    indexAddGenres();

    printElementsGroup("favourites");
 
 });
 