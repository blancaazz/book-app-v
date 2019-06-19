
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

function getEventById(eventId,returnFuntion){

  var url = '/v2/events/'+eventId;

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {    
    returnFuntion(xhttp.responseText);
  }

  xhttp.send();
}

function getEventsThisMonth(returnFunction){

  var url = '/v2/events/getThisMonthEvents';

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;
    //$("#response").text(text);

    returnFunction(text);
    
  };

  xhttp.send();

}



function getEventBooks(eventId,returnFuntion){

  var url = '/v2/events/getBooks/'+eventId;

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {    
    returnFuntion(xhttp.responseText);
  }

  xhttp.send();
}


function getBookByID(bookID, returnFuntion){

  var url = '/v2/books/'+ bookID;

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;

    returnFuntion(text);

    var myJSON = text;
    var myObj = JSON.parse(myJSON);

    var name =myObj[0].name;
    var themes = myObj[0].themes;
    var id = myObj[0].id;
    var literary_genres = myObj[0].literary_genres;
    var abstract = myObj[0].abstract;
    var fact_sheet = myObj[0].fact_sheet;
    var picture = myObj[0].picture;

    newListElement(name, abstract, picture, literary_genres, themes, fact_sheet);
    addAuthor(id);
    addSimilar(id);

  };

  xhttp.send();  
}


function logoutFunc(returnFuntion){

    var url = '/v2/user/logout';

    xhttp = createCORSRequest('POST', url);
    if (!xhttp) {
        throw new Error('CORS not supported');
    }

    xhttp.onload = function() {
        returnFuntion();
    };

    xhttp.send();

}

function registerUserFunction(name,username,password,residence){


  var request = "name="+name+"&username="+username+"&password="+password+"&residence="+residence;

  console.log("Button clicked");

  var url = '/v2/user/register';


  xhttp = createCORSRequest('POST', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhttp.onload = function() {
    var text = "SEND";
    

    if(xhttp.status == 200){
      console.log(xhttp.responseText);
      alert("Congratulations! You have been registered");
    }else{
      console.log("ERROR: "+xhttp.responseText);
      alert("Some error has happened, please try later");
    }

  };

  
  xhttp.send(request);

}
  
  