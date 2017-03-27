/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 21, 2017
 * Last Modified: March 21, 2017
 * Version: 1.2
 */

function verifyLogin(){
    $.get("php/loginCheck.php",
            function(data){
                //LW: if user is logged in already, go to admin view
                if (data === "true"){
                    window.location.replace("addNewTeam.html");
                //LW: otherwise, display the page
                }else{
                    $("#wrapper").css("display", "block");
                }
            });
}

function isLoggedIn(){
    $.get("php/loginCheck.php",
            function(data){
                if (data === "false"){
                    window.location.replace("login.html");
                //LW: otherwise, display the page
                }else{
                    $("#wrapper").css("display", "block");
                }
            });
}