

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


function printElementsGroup(group_name){
  
  //$("#divBooks").html("");

  console.log("Button clicked");

  var url = '/v2/group/' + group_name;

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
      var url = "book.html?id=" +  id
      newListElement(name,themes,img,url, group_name);
    }

  };

  xhttp.send();
}


function newListElement(iTitle,iData1,image, id_url, group_name) {

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
  var textUrl = document.createTextNode("Leer mas");
  //url.href = 'book.html?id=' +  id;
  url.href = id_url;

  var img = document.createElement("img");
  img.src = image;

  container.className="container features listItem";
  divRow.className = "row";
  divLeftCol.className = "col-lg-4 col-md-4 col-sm-12";
  divRightCol.className = "col-lg-8 col-md-8 col-sm-12";
  //divButtons.className = "row";
  divButtons.id = "listButtons";
  data1.className = "listMainData";
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

  document.getElementById("divBooks" + group_name).appendChild(container);
 
}

