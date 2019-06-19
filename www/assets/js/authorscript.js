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



  function AddInfoAuthor(id, name, picture, bio){
    $("#textito").text(name);
  
    //PARTE de crear los elementos html
  
    var img = document.createElement("img");
    img.src = picture;
    img.className = "imag-fluid";
  
  
    var nameH = document.createElement("h2");
    var nameText = document.createTextNode(name);
    nameH.appendChild(nameText);
    
  
    var bioP = document.createElement("p");   
    var bioText = document.createTextNode(bio);
    bioP.appendChild(bioText);
  
    document.getElementById("image_author").appendChild(img);
    document.getElementById("description").appendChild(nameH);
    document.getElementById("description_author").appendChild(bioP);
  }

  function addBookElement(name, picture, genres, themes){

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
  
  
    //lista de géneros      

    var list_genres = document.createElement("ul");
    list_genres.className = "list-group list-group-horizontal";
    for(var i = 0; i < genres.length; i++){
      var genresC = document.createElement("li");
      genresC.className ="list-group-item"
      var genresH = document.createElement("p");
      var textGenres = document.createTextNode(genres[i]);
      genresH.appendChild(textGenres);
      genresC.appendChild(genresH);
      list_genres.appendChild(genresC);
    }
  
  
      //en plan los temas y géneros faltaría hacerlos más bonito metiendolos
    //en una listilla guapetona
    //lista de temas

    var list_themes = document.createElement("ul");
    list_themes.className = "list-group list-group-horizontal";
    for(var i = 0; i < themes.length; i++){
      var themesC = document.createElement("li");
      themesC.className = "list-group-item";
      var themesH = document.createElement("p");
      var textThemes = document.createTextNode(themes[i]);
      themesH.appendChild(textThemes);
      themesC.appendChild(themesH);
      list_themes.appendChild(themesC);
    }

    col_left.appendChild(img);
    col_right.appendChild(title);
    col_right.appendChild(list_genres);
    col_right.appendChild(list_themes);


    row.appendChild(col_left);
    row.appendChild(col_right);
  
    container.appendChild(row);
    item.appendChild(container);

    document.getElementById("book_list").appendChild(item);
  }

  function addBookList(id){

    var url = '/v2/authors/getBooks/'+ id;

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
      for (var i = 0; i < myObj.length; i++){
        var name =myObj[i].name;
        var id = myObj[i].id;
        var picture = myObj[i].picture;
        var literary_genres = myObj[i].literary_genres;
        var themes = myObj[i].themes;
        addBookElement(name, picture, literary_genres, themes);
      }

      //$("#textito").text(name);
  };

    xhttp.send();

  }

  $(document).ready(function(){


     //Getting the ID from the URL
    var GET = {};
    var query = window.location.search.substring(1).split("&");
    for (var i = 0, max = query.length; i < max; i++) {
      if (query[i] === "") // check for trailing & with no param
        continue;
      var param = query[i].split("=");
      GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }
    
    //We stablish the back link
    $(".backLink").attr("href",document.referrer);

    var url = '/v2/authors/'+ GET["id"];

    var xhttp = createCORSRequest('GET', url);
    if (!xhttp) {
        throw new Error('CORS not supported');
    }

    xhttp.onload = function() {
      
      var text = xhttp.responseText;
      var myJSON = text;
      var myObj = JSON.parse(myJSON);

      var name =myObj[0].name;
      var id = myObj[0].id;
      var bio = myObj[0].bio;
      var picture = myObj[0].picture;

      AddInfoAuthor(id, name, picture, bio);
      addBookList(id);
  };

    xhttp.send();

});
