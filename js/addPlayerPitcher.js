/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.1
 */

$(document).ready(function() {
    $("#btnPlayerAdd").click(function(){
        var teamID = $("#selectTeam").val();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var position = $("#selectPosition").val();
        
        //LW: verifies if the first and last name is valid
        //LW: teamID and position do not need to be verified since they are drop-downs
        if($.type(fname) !== "string" || fname === "" || fname.length > 100){
            window.alert("Please enter a valid first name.");
        }else if($.type(lname) !== "string" || lname === "" || lname.length > 100){
            window.alert("Please enter a valid last name.");
        
        //LW: if it passes the verification, add a new player or pitcher
        }else{
            $.get("php/addPlayerPitcher.php?teamID=" + teamID
                    + "&fname=" + fname
                    + "&lname=" + lname
                    + "&position=" + position,
                    function(data, status){
                    $("#status").text(data + " record(s), " + fname + " " + lname 
                        + ", has been added to database."
                    );
                    }
            );
        }
   });
});