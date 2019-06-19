$(document).ready(function(){

  var url = '/v2/events';

  var xhttp = createCORSRequest('GET', url);
  if (!xhttp) {
      throw new Error('CORS not supported');
  }

  xhttp.onload = function() {
    
    var text = xhttp.responseText;
    //$("#response").text(text);

    var myJSON = text;
    var myObj = JSON.parse(myJSON);
    $("#query").text(myObj.length);

    for(var i =0; i<myObj.length;i++){
      var name =myObj[i].name;
      var place = myObj[i].place;
      var date = myObj[i].date;
      var id = myObj[i].id;
      var url = "event.html?id=" +  id
      newListElement(name,place, "", url, "AllEvents");
    }
  };

  xhttp.send();

 });
 
 
