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
      var url = "event.html?id=" +  id;

      if(i % 2 == 0){
        cont = document.createElement("div");
        cont.className = "container-fluid";
        cont.id = "cont" + i;
        row = document.createElement("div");
        row.className = "row";
        row.id = "row" + parseInt(i/2);
        document.getElementById("AllEvents").appendChild(cont);
        document.getElementById("cont" + i).appendChild(row);
      }

      col = document.createElement("div");
      col.className = "col-sm-6";
      idCol = "col" + i;
      col.id = idCol;
      document.getElementById("row" + parseInt(i/2)).appendChild(col);

      newCardElementEvent(name, place, date, url, idCol);
      //newListElement(name,place, "", url, "AllEvents");
    }
  };

  xhttp.send();

 });
 
 
