$(document).ready(function(){
    

    $("#sendButton").click(function(){
        

        var name = $("#nameInput").val();
        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();
        var residence = $("#residenceInput").val();

        registerUserFunction(name,username,password,residence);

    });

});