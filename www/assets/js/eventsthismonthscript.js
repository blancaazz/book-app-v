

$(document).ready(function(){
    

  let returnFunction = function(text){
    var myJSON = text;
    var myObj = JSON.parse(myJSON);
    $("#query").text(myObj.length);

    for(var i =0; i<myObj.length;i++){
      var name =myObj[i].name;
      var place = myObj[i].place;
      var date = myObj[i].date;
      var id = myObj[i].id;
      var url = "event.html?id=" +  id
      //newListElement(name,place, "", url, "AllEvents");
      newCardElementEvent(name, place, date, url, "divEventsMonth");
    }
  }

  getEventsThisMonth(returnFunction);
 
  

 
 });
 
 
