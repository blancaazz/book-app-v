var xhttp;


$(document).ready(function(){
    

    $("#bLogout").click(function(){
        let returnFunction = function(){
            $("#res").text(xhttp.status);
        };
        logoutFunc(returnFunction);
      
  });

});