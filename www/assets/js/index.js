

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

//categoria refers to the id of the div container
//the rest are the data to put

function indexNewListElement(name, data, picture, id_url, categoria){
   /*
    var element = document.createElement("li");
    element.className = "list-group-item"
    idElement = "element" + aleatorio;
    element.id =  idElement;

        
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
    */
}

//this function would create a list with id = genre
//load the books of a specified genre
//and call a function to append it to the html
function indexPrintElements(genre){

  var categoriaH = document.createElement("h3");
  categoriaH.className = "categoria";


  var categoriaText = document.createTextNode(genre);
  categoriaH.appendChild(categoriaText);   

  var categoriaA = document.createElement("a");
  categoriaA.href = "genres.html?name=" + genre;
  var text = document.createTextNode("Display all the books");
  categoriaA.appendChild(text);
  categoriaH.appendChild(categoriaA);

  document.getElementById("indexBook").appendChild(categoriaH);
/*
  
  var lista = document.createElement("ul");
  lista.className = "list-group list-group-horizontal genres";
  lista.id = genre;
  //document.getElementById("indexBook").appendChild(lista);

  document.getElementById("indexBook").appendChild(lista);
  */

  var row = document.createElement("div");
  row.className = "row rowGenre";
  row.id = genre;
  document.getElementById("indexBook").appendChild(row);
  

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

        //create the element of the list 
       /* 
        var element = document.createElement("li");
        element.className = "list-group-item";
        var idElement = "element" + aleatorio + genre;
        element.id =  idElement;
        //we append the element to the list:
        lista.appendChild(element);
        //call for creating a card and append it to the previous element;
        */

        var element = document.createElement("div");
        element.className = "col-sm-3";
        var idElement = "element" + aleatorio + genre;
        element.id = idElement;
        row.appendChild(element);
        newCardElement(name,null, img, url, idElement);
       
    }
  };

  xhttp.send();
}

//this function creates the 4 genres (randomly)
//inside there is a call for a function that will print 
//the book of each genre
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

}

//creates a col and append it to the row
//then call the generic function newCardElement to creates a new card
function newCardElementIndex(name, themes, picture, url, id, i){
  var supercontainer = document.createElement("div");
  supercontainer.className = "col-sm-4"
  var newId = "col" + id + i;
  supercontainer.id = newId;

  document.getElementById(id).appendChild(supercontainer);

  //newId is the id of the element, to append the card 
  newCardElement(name, themes, picture, url, newId);
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
      newCardElementIndex(name, themes, img, url, "booksRow" + parseInt(i/ bookForRow), i);
      //newCardElement(name,themes,img,url, "booksRow" + parseInt(i / bookForRow));
    }
  };

  xhttp.send();

}


$(document).ready(function(){
    

    //create structure for books
    booksStructure();

  //this function generates 4 genres randomly, and make 4 lists for each one with a max number of books of 4 (also randomly)
    indexAddGenres(); 
 });
 