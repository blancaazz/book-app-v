// import {addThemes} from "assets/js/navbar.js";
// import {addGenres} from "assets/js/navbar.js";
// let { addThemes } = require("assets/js/navbar.js");
// let { addGenres } = require("assets/js/navbar.js");

//import './navBar.js';
//import * as lib from './navBar.js';

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


function deleteBook(bookId){
  var request = "bookId="+bookId;

  var url = '/v2/user/deleteReservedBook';

  xhttp = createCORSRequest('POST', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhttp.onload = function() {
    printElements();
  };

  xhttp.send(request);
}


function printElements(){
  
  $("#divBooks").html("");

  console.log("Button clicked");

  var url = '/v2/user/getShoppingCart';

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;
    //$("#response").text(xhttp.getAllResponseHeaders());

    // $("#query").text(text);
    var myJSON = text;
    var myObj = JSON.parse(myJSON);
    //$("#query").text(myObj.length);

    for(var i =0; i<myObj.length;i++){
      var name =myObj[i].name;
      var themes = myObj[i].abstract;
      var id = myObj[i].id;
      var img = myObj[i].picture;
      newListElement(name,themes,img, id);
    }

    $(".deleteButton").click(function(){
      console.log("Delete button pressed: "+this.id);
      deleteBook(this.id);    
    });
  };

  xhttp.send();
}


function newListElement(iTitle,iData1,image, id) {

  var container = document.createElement("div");
  var divRow = document.createElement("div");
  var divLeftCol  = document.createElement("div");
  var divRightCol  = document.createElement("div");
  var divButtons = document.createElement("div");

  var title = document.createElement("h3");
  var textTitle = document.createTextNode(iTitle);

  var data1 = document.createElement("p");
  var textData1 = document.createTextNode(iData1);
  
  var url = document.createElement("a");
  var textUrl = document.createTextNode("Read more");
  url.href = 'book.html?id=' +  id;

  var deleteButton = document.createElement("button");
  // var idDeleteButton = document.createTextNode(id);
  var textDeleteButton = document.createTextNode("Delete Reservation");
  deleteButton.id = id;

  var img = document.createElement("img");
  img.src = image;

  container.className="container features";
  divRow.className = "row";
  divLeftCol.className = "col-md-4 col-sm-12";
  divRightCol.className = "col-md-8 col-sm-12";
  //divButtons.className = "row";
  divButtons.id = "listButtons";
  title.className = "feature-title";
  img.className = "img-fluid";
  deleteButton.className = "deleteButton"

  title.appendChild(textTitle);
  data1.appendChild(textData1);
  url.appendChild(textUrl);
  deleteButton.appendChild(textDeleteButton);

  divButtons.appendChild(url);
  divButtons.appendChild(deleteButton);

  divRightCol.appendChild(title);
  divRightCol.appendChild(data1);
  divRightCol.appendChild(divButtons);
  divLeftCol.appendChild(img);

  divRow.appendChild(divLeftCol);
  divRow.appendChild(divRightCol);

  container.appendChild(divRow);

  document.getElementById("divBooks").appendChild(container);
 
}


$(document).ready(function(){
     
  printElements();

});