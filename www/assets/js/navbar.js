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

function checkLog(returnFuntion){

  var url = '/v2/user/getUserName';

  xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    returnFuntion();
  };

  xhttp.send();
}



function addListTheme(name){
  var theme = document.createElement("a");
  var textTheme = document.createTextNode(name);

  theme.href = "themes.html?name="+ name;
  theme.className = "dropdown-item";

  theme.appendChild(textTheme);
  document.getElementById("themes_dropdown").appendChild(theme);


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
  console.log(name);
  var genre = document.createElement("a");
  var textGenre = document.createTextNode(name);


  genre.href = "genres.html?name="+ name;
  genre.className = "dropdown-item";

  genre.appendChild(textGenre);
  document.getElementById("genres_dropdown").appendChild(genre);
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




function addUserArea(){
  
  let returnFuntion = function(){
    var response = xhttp.responseText;
    if (xhttp.status==200){
      var html = 
      '<li class="nav-item"><a class="nav-link" href="/shoppingcart.html">Welcome '+ response +'</a></li>' +
      '<li class="nav-item"><a class="nav-link" href="/logout.html">logout</a></li>';
      $("#userArea").html(html);
    }else{
      var html = 
      '<li class="nav-item"><a class="nav-link" href="/login.html">Login</a></li>'+
      '<li class="nav-item"><a class="nav-link" href="/regiter.html">Register</a></li>';
      $("#userArea").html(html);
    }
    console.log(response);
  }


  checkLog(returnFuntion);
}

$(document).ready(function(){  
  addThemes();
  addGenres();
  addUserArea();
});