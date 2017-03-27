/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.0
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
    
    $("#selectPlayer").on('change', function(){
        var playerID = $("#selectPlayer").val(); 
        
        //IT: we are assuming that we only receive one record
        var sql = "select position from player where playerID = " + playerID + ";";
        
        $.get("php/getData.php?sql=" + sql,     
            function(data, status){
                $.each(data, function(index, record){
                    if(index === 0){
                        if(record['position']==="pitcher"){
                            $(".pitcherSection").show();
                            $(".playerSection").hide();
                        }else {
                            $(".pitcherSection").hide();
                            $(".playerSection").show();   
                        }
                    $("#statusContent").hide();
                    }
                });
            }
        );
    });
    
    $("#updatePitcherRecord").click(function(e){   
        e.preventDefault();
        var playerID = $("#selectPlayer").val();
        
        var inningsPitched = parseInt($("#inningsPitched").val());
        var hitsAllowed = parseInt($("#hitsAllowed").val());
        var runsAllowed = parseInt($("#runsAllowed").val());
        var walks = parseInt($("#pitcherWalks").val());
        var strikeOuts = parseInt($("#strikeOuts").val());
        
        if (inningsPitched === "" || hitsAllowed === "" || runsAllowed === "" || walks === "" || strikeOuts === ""){
            window.alert ("Please ensure that none of the fields are empty!");
        }else if (isNaN(inningsPitched) || isNaN(hitsAllowed) || isNaN(runsAllowed) || isNaN(walks) || isNaN(strikeOuts)
                || inningsPitched.length > 11 || hitsAllowed.length > 11 || runsAllowed.length > 11 || walks.length > 11 || strikeOuts.length > 11
                ){
            window.alert ("Please enter valid inputs.");
        }else{
           $("#status").empty();
           var phpString = "playerID=" + playerID + "&inningsPitched=" + inningsPitched + "&hitsAllowed=" + hitsAllowed + "&runsAllowed=" + runsAllowed + "&pitcherWalks=" + walks + "&strikeOuts=" + strikeOuts;
           console.log(phpString);
            $.get("php/addPitcherRecord.php?" + phpString,
                function(data,status){
                    $.each(data, function(index, record){
                        $("#status").append("\
                            <tr><th>Player ID</th><th>Total Innings Pitched</th><th>Total Hits Allowed</th><th>Total Runs Allowed</th><th>Walks</th><th>Strike Outs</th></tr>"
                        + "<tr><td>" + record['playerID'] 
                        + "</td><td>" + record['SUM(inningsPitched)'] 
                        + "</td><td>" + record['SUM(hitsAllowed)']
                        + "</td><td>" + record['SUM(runsAllowed)'] 
                        + "</td><td>" + record['SUM(walks)'] 
                        + "</td><td>" + record['SUM(strikeouts)'] 
                        + "</td></tr>"
                        );
                    });
            });
        $("#statusContent").show();
        }
    });
    
    $("#updatePlayerRecord").click(function(e){   
        e.preventDefault();
        var playerID = $("#selectPlayer").val();
        
        var atBats = parseInt($("#atBats").val());
        var hits = parseInt($("#hits").val());
        var homeRuns = parseInt($("#homeRuns").val());
        var runsBattedIn = parseInt($("#runsBattedIn").val());
        var walks = parseInt($("#playerWalks").val());
        var stolenBases = parseInt($("#stolenBases").val());

        if (atBats === "" || hits === "" || homeRuns === "" || runsBattedIn === "" || walks === "" || stolenBases === ""){
            window.alert ("Please ensure that none of the fields are empty!");
        }else if (isNaN(atBats) || isNaN(hits) || isNaN(homeRuns) || isNaN(runsBattedIn) || isNaN(walks) || isNaN(stolenBases)
                || atBats.length > 11 || hits.length > 11 || homeRuns.length > 11 || runsBattedIn.length > 11
                || walks.length > 11 || stolenBases.length > 11
                ){
            window.alert ("Please enter valid inputs.");
        }else{
            $("#status").empty();
            var phpString = "playerID=" + playerID + "&hits=" + hits + "&homeRuns=" + homeRuns + "&atBats=" + atBats + "&runsBattedIn=" + runsBattedIn + "&playerWalks=" + walks + "&stolenBases=" + stolenBases;
            $.get("php/addPlayerRecord.php?" + phpString,
                function(data,status){
                    $.each(data, function(index, record){
                            $("#status").append("\
                            <tr><th>Player ID</th><th>Total At Bats</th><th>Total Hits</th><th>Total Homeruns</th><th>Runs Batted In</th><th>Walks</th><th>Stolen Bases</th></tr>"
                            + "<tr><td>" + record['playerID'] 
                            + "</td><td>" + record['SUM(atBats)'] 
                            + "</td><td>" + record['SUM(hits)']
                            + "</td><td>" + record['SUM(homeRuns)'] 
                            + "</td><td>" + record['SUM(runsBattedIn)'] 
                            + "</td><td>" + record['SUM(walks)'] 
                            + "</td><td>" + record['SUM(stolenBases)'] 
                            + "</td></tr>");
                    });
            });
        $("#statusContent").show();
        }
    });
   
});