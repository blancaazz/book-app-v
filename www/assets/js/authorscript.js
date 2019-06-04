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
  
  
    var nameH = document.createElement("h4");
    var nameText = document.createTextNode(name);
    nameH.appendChild(nameText);
    
  
    var bioP = document.createElement("p");   
    var bioText = document.createTextNode(bio);
    bioP.appendChild(bioText);
  
    document.getElementById("image_author").appendChild(img);
    document.getElementById("description_author").appendChild(nameH);
    document.getElementById("description_author").appendChild(bioP);
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
