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

    var url = '/v2/authors/'+ GET["id"];

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
      var id = myObj[0].id;
      var bio = myObj[0].bio;
      var picture = myObj[0].picture;

      //$("#textito").text(name);

    AddInfoAuthor(id, name, picture, bio);
  };

    xhttp.send();

});
