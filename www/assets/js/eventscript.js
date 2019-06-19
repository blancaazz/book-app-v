  
  //función que pone el titulito, imagen y las cosillas propias de la base de datos del libro
  
  $(document).ready(function(){
  
    var eventID;
  
    //Getting the ID from the URL
    var GET = {};
    var query = window.location.search.substring(1).split("&");
    for (var i = 0, max = query.length; i < max; i++) {
      if (query[i] === "") // check for trailing & with no param
        continue;
      var param = query[i].split("=");
      GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    }
    
    //Variable with the actual book ID;
    eventID = GET["id"];

    //We stablish the back link
    $(".backLink").attr("href",document.referrer);

  
    let returnFunction = function(response){

      var text = response;
      console.log(text);

      var myJSON = text;
      var myObj = JSON.parse(myJSON);
      $("#eventName").text(myObj[0].name);
      $("#eventPlace").text(myObj[0].place);
      $("#eventDate").text(myObj[0].date);
    
      return;
    }
      
    let printBooksFunction = function(response){
      var myJSON = response;
      var myObj = JSON.parse(myJSON);
  
      for(var i =0; i<myObj.length;i++){
        var name =myObj[i].name;
        var themes = myObj[i].abstract;
        var id = myObj[i].id;
        var img = myObj[i].picture;
        var url = "book.html?id=" +  id;
        newListElement(name,themes,img,url, "Event");
      }
   
    }

    getEventById(eventID,returnFunction);
    getEventBooks(eventID,printBooksFunction);



  });
  