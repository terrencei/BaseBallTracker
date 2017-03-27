/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 3, 2017
 * Last Modified: March 17, 2017
 * Version: 2.1
 */

$(document).ready(function() {
    //LW: verifies login information on login.html
    $("#login").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        
        //LW: checks if the fields are blank or out of bounds
        if (username === "" || password === ""){
            window.alert("Please fill in all the fields to log in.");
        }else if (username.length > 20 || password.length > 20){
            window.alert("Please enter a valid username or password.");
        //LW: if the fields are filled in and valid, run php to verify login info
        }else{
            var sql = "select * from administrator where username = '" + username + "';";
            var verify = false;
            $.get("php/getData.php?sql=" + sql,
                function(data, status){
                    if (!$.trim(data)){
                        //LW: if no data is returned, display error
                        $("#password").val("");
                        $("#incorrect").empty();
                        $("#incorrect").append("Incorrect username or password. Please try again.");
                        $("#incorrect").css("color", "red");
                    }
                    else{
                        //LW: if data returned is not blank or null, check username against password
                        $.each(data, function(index, record){
                        if(record['pw'] === password){
                            verify = true;
                        }else{
                            verify = false;
                        }

                        //LW: load administrator view if login info was valid
                        //LW: otherwise, display error message
                        if(verify === true){
                            $.get("php/verifyAdmin.php");
                            window.location.href='addNewTeam.html';
                        }else{
                            $("#password").val("");
                            $("#incorrect").empty();
                            $("#incorrect").append("Incorrect username or password. Please try again.");
                            $("#incorrect").css("color", "red");
                        }
                        });
                    }
                }
            );
        }
    });
});