/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.1
 */

//LW: loads onLoadDropDowns file without executing it to reuse functions
$.getScript("js/onLoadDropDowns.js", function(){
   console.log("onLoadDropDowns script loaded.");
});

$(document).ready(function() {
    //LW: display new players when new team is selected
    $("#selectTeam").on('change', function(){
        var teamID = this.value;
        getAllPlayers(teamID);
    });
    
    //BD: function updates player atributes in the database once btnPlayerPitcherUpdate is clicked on updatePlayerPitcher.html
    $("#btnPlayerPitcherUpdate").click(function() {
        fname = $("#fname").val(); 
        lname = $("#lname").val();
        teamID = $("#selectTeamChange").val();
        playerID = $("#selectPlayer").val();
        position = $("#selectPosition").val();
        errText = "";
        errFocus = "";
        
        //BD:Validation Checks - teamID and Position not needed for validation since values are populated dynamically from database
        if ($.type(fname) !== "string" || fname === "" || fname.length > 100) {
            errText = "Please Enter a Valid First Name";
            errFocus = "#fname";
        } else if ($.type(lname) !== "string" || lname === "" || lname.length > 100) {
            errText = "Please Enter a Valid Last Name";
            errFocus = "#lname";
        }
       // BD:if no error, validation success and runs updatePlayerPitcher.php to updating exisiting player 
        //in database. else display error
        
        if(errText === "") { 
            $.get("php/updatePlayerPitcher.php?fname=" + fname
                + "&lname="+lname
                + "&teamID="+teamID
                + "&position="+position
                + "&playerID="+playerID,
            function(data, status){
                $("#status").text(data + " record(s), " + fname + " " + lname + " has been added to Team ID:" + teamID + 
                        " in the position of " + position
                        + " in the database.");
             
            }); //BD:ends get function
        } //BD: ends if for errText
        else {
            window.alert(errText);
            $(errFocus).focus();
        } //BD: ends else
    }); //BD: ends btnPlayerPitcherUpdate function
    
        //BD: jquery to show updatePlayer div once the user decides on the player to update, and clicks the editPlayer button
    $('#editPlayer').click(function() {
        var playerID = $("#selectPlayer").val();
        if (playerID === "null"){
            window.alert("Please select a player");
        }else{
            $('#updatePlayer').show();
        }
    }); //BD: ends jquery of editPlayer click function
}); //BD: ends document ready