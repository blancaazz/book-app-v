var itemsMainDiv = ('.MultiCarousel');
var itemsDiv = ('.MultiCarousel-inner');
var itemWidth = "";

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
  divLeftCol.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12";
  divRightCol.className = "col-xl-8 col-lg-8 col-md-8 col-sm-12";
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



//function to create a new element card
//the id makes reference to the id of the div to append it

function newCardElement(name, themes, picture, url, id){
  //PARTE de crear los elementos html

  var bodycontainer = document.createElement("div");
  bodycontainer.className = "card";

  var container = document.createElement("div");
  container.className = "card-body";

  //imagen
  var img = document.createElement("img");
  img.src = picture;
  img.className = "card-img-top";

  //name del autor
  var nameH = document.createElement("h3");
  nameH.className="card-title"; 
  var nameText = document.createTextNode(name);
  nameH.appendChild(nameText);  
  //data
  if(themes != null){
    var dataP = document.createElement("p");
    dataP.className = "card-text";
    var dataText = document.createTextNode(themes);
    dataP.appendChild(dataText);
  }

  //link a la página del autor/a
  var aBook = document.createElement("a");
  var aText = document.createTextNode("Go to this book");
  aBook.className = "btn btn-primary"
  aBook.href = url;
  aBook.appendChild(aText);


  container.appendChild(nameH);
  if(themes != null){
    container.appendChild(dataP);
  }
  container.appendChild(aBook);
  bodycontainer.appendChild(img);
  bodycontainer.appendChild(container);
  //bodycontainer.getElementById(id).appendChild(nameHBook);
  //supercontainer.appendChild(bodycontainer);
  document.getElementById(id).appendChild(bodycontainer);
}

function newCardElementEvent(name, city, date, url, id){
  //PARTE de crear los elementos html

  var bodycontainer = document.createElement("div");
  bodycontainer.className = "card";

  var container = document.createElement("div");
  container.className = "card-body";


  //name del event
  var nameH = document.createElement("h4");
  nameH.className="card-header"; 
  var nameText = document.createTextNode(name);
  nameH.appendChild(nameText);  
  //data

  //city
  var cityP = document.createElement("h5");
  city.className = "card-title";
  var cityText = document.createTextNode(city);
  cityP.appendChild(cityText);


  //date

  var dateP = document.createElement("p");
  dateP.className = "card-text";
  var dateText = document.createTextNode(date);
  dateP.appendChild(dateText);


  //link a la página del autor/a
  var aBook = document.createElement("a");
  var aText = document.createTextNode("Go to this event");
  aBook.className = "btn btn-primary"
  aBook.href = url;
  aBook.appendChild(aText);



  container.appendChild(cityP);
  container.appendChild(dateP);

  container.appendChild(aBook);

  bodycontainer.appendChild(nameH);
  bodycontainer.appendChild(container);
  //bodycontainer.getElementById(id).appendChild(nameHBook);
  //supercontainer.appendChild(bodycontainer);
  document.getElementById(id).appendChild(bodycontainer);
}




//version2 with the id id to put the container in

function addListGenre2(name, id){

  var genre = document.createElement("a");
  var textGenre = document.createTextNode(name);


  genre.href = "genres.html?name="+ name;
  genre.className = "list-group-item list-group-item-action";
  genre.id = name;

  genre.appendChild(textGenre);
  document.getElementById(id).appendChild(genre);
}


function addGenres2(id){
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
      addListGenre2(genre, id);
    }
  }

  xhttp.send();
}




function addListTheme2(name, id){
  var theme = document.createElement("a");
  var textTheme = document.createTextNode(name);

  theme.href = "themes.html?name="+ name;
  theme.className = "list-group-item list-group-item-action";
  theme.id = name;

  theme.appendChild(textTheme);
  document.getElementById(id).appendChild(theme);


}
  
function addThemes2(id){
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
      addListTheme2(theme, id);
    }
  }

  xhttp.send();
}



//-----------Carousel Functions-------------

    //this function define the size of the items
    function ResCarouselSize() {
  
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function () {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(',');
          $(this).parent().attr("id", "MultiCarousel" + id);


          if (bodyWidth >= 1200) {
              incno = itemsSplit[3];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 992) {
              incno = itemsSplit[2];
              itemWidth = sampwidth / incno;
          }
          else if (bodyWidth >= 768) {
              incno = itemsSplit[1];
              itemWidth = sampwidth / incno;
          }
          else {
              incno = itemsSplit[0];
              itemWidth = sampwidth / incno;
          }
          $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
          $(this).find(itemClass).each(function () {
              $(this).outerWidth(itemWidth);
          });

          $(".leftLst").addClass("over");
          $(".rightLst").removeClass("over");

      });
  }


  //this function used to move the items
  function ResCarousel(e, el, s) {
      var leftBtn = ('.leftLst');
      var rightBtn = ('.rightLst');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      }
      else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
              $(el + ' ' + rightBtn).addClass("over");
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  //It is used to get some elements from btn
  function click(ell, ee) {
      var Parent = "#" + $(ee).parent().attr("id");
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }
