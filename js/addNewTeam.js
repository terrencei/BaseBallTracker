/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.1
 */

$(document).ready(function() { 
    //BD:function to add new team to database, includes validation
    $("#btnTeamAdd").click(function() {
        teamName = $("#teamName").val(); 
        teamCity = $("#teamCity").val();
        teamState = $("#teamState").val(); 
        yearFounded = $("#yearFounded").val();
        yearFoundedInt = parseInt(yearFounded);
        wins = $("#wins").val();
        winsInt = parseInt(wins);
        losses = $("#losses").val();
        lossesInt = parseInt(losses);
        errText = "";
        errFocus = "";
        
        //BD:Validation Checks
        if (teamName === "" || $.type(teamName) !== "string" || teamName.length > 100) {
            errText = "Please Enter a Valid Team Name";
            errFocus = "#teamName";
        } else if (teamCity === "" || $.type(teamCity) !== "string" || teamCity.length > 100) {
            errText = "Please Enter a Valid Team City";
            errFocus = "#teamCity";
        } else if (yearFounded === "") {
            errText = "Please Enter a Valid Year Founded";
            errFocus = "#yearFounded";
        } else if (yearFoundedInt > 2017 || isNaN(yearFoundedInt)) {
            errText = "Sorry, " + yearFounded + " is not a valid Year Founded";
            errFocus = "#yearFounded";
        } else if (isNaN(winsInt)) {
            errText = "Sorry, " + wins + " is not a valid input for Wins";
            errFocus = "#wins";
        } else if (isNaN(lossesInt)) {
            errText = "Sorry, " + losses + " is not a valid input for Losses";
            errFocus = "#losses";
        }
        
        //BD:if no error, validation success and runs addTeam.php to add new team 
        //to database. else display error and focus on the invalid element
        
        if(errText === "") {
            $.get("php/addTeam.php?teamName=" + teamName 
                + "&teamCity="+teamCity 
                + "&teamState="+teamState
                + "&yearFounded="+yearFounded
                + "&wins="+wins
                + "&losses="+losses,
            function(data, status){
                $("#status").text(data + " record(s), " + teamCity + " " + teamName 
                        + ", has been added to database."); 
            }); //BD:ends get php function
    //BD: clears all inputs and focuses on #teamName upon successful database INSERT
    $("#teamName").val("");
    $("#teamCity").val("");
    $("#teamState").val("");
    $("#yearFounded").val("");
    $("#wins").val("");
    $("#losses").val("");
    $("#teamName").focus();
        } //BD: ends if for errText
        else {
            window.alert(errText);
            $(errFocus).focus();
        } //BD: ends else 
    }); //BD: ends click function
}); //BD: ends document ready function