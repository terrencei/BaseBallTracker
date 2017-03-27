/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.2
 */

//LW: loads onLoadDropDowns file without executing it to reuse functions
$.getScript("js/onLoadDropDowns.js", function(){
   console.log("onLoadDropDowns script loaded.");
});

//LW: loads onLoadData file without executing it to reuse functions
$.getScript("js/onLoadData.js", function(){
   console.log("onLoadData script loaded.");
});

$(document).ready(function() {
    //LW: display new players when new team is selected
    $("#selectTeam").on('change', function(){
        var teamID = this.value;
        getPlayers(teamID);
    });
    
    //LW: display selected player data
    $("#choosePlayerToDisplay").click(function() {
        var playerID = $("#selectPlayer").val();
        $("#playerDataTable tr:not(:first)").remove();
        showPlayerRows(playerID);
    });
    
    //LW: display selected pitcher data
    $("#choosePitcherToDisplay").click(function() {
        var teamID = $("#selectTeam").val();
        $("#pitcherDataTable tr:not(:first)").remove();
        showPitcherRows(teamID);
    });
});