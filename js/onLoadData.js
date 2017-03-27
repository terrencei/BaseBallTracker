/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 17, 2017
 * Version: 1.2
 */

//LW: shows player rows
function showPlayerRows(playerID){
    var dataTable = "#playerDataTable";
    var sql = "SELECT concat(fname, ' ', lname) as name, atBats, hits, homeRuns, runsBattedIn, walks, stolenBases FROM playerRecords pr join player p on pr.playerId = p.playerID where pr.playerID = " + playerID + ";";
    $.ajax({
        type: "GET",
        url: "php/getData.php?sql=" + sql,
        success: function(data){
            if (!$.trim(data)){
                //LW: if no data is returned, display error
                $("#noData").empty();
                $("#noData").append("There is currently no data for this player.");
            }else{
                $("#noData").empty();
                //LW: otherwise, display player data
                $.each(data, function(index, record){
                    $(dataTable).append("<tr><td>" + record['name'] + "</td><td>" +
                            record['atBats'] + "</td><td>" + record['hits'] + "</td><td>" +
                            record['homeRuns'] + "</td><td>" + record['runsBattedIn'] +
                            "</td><td>" + record['walks'] + "</td><td>" + record['stolenBases'] + "</td></tr>");
                });
            }
        }
    });
}

//LW: shows pitcher information
function showPitcherRows(teamID){
    var dataTable = "#pitcherDataTable";
    var sql = "SELECT concat(fname, ' ', lname) as name, inningsPitched, hitsAllowed, runsAllowed, walks, strikeouts \n\
                FROM pitcherRecords pr join player p on pr.playerId = p.playerID \n\
                join team t on p.teamID = t.teamID \n\
                where t.teamID = " + teamID;
    $.ajax({
        type: "GET",
        url: "php/getData.php?sql=" + sql,
        success: function(data){
            if (!$.trim(data)){
                //LW: if no data is returned, display error
                $("#noData").empty();
                $("#noData").append("There is currently no pitcher data for this team.");
            }else{
                //LW: otherwise, display pitcher data
                $("#noData").empty();
                $.each(data, function(index, record){
                    $(dataTable).append("<tr><td>" + record['name'] + "</td><td>" +
                            record['inningsPitched'] + "</td><td>" + record['hitsAllowed'] + "</td><td>" +
                            record['runsAllowed'] + "</td><td>" + record['walks'] +
                            "</td><td>" + record['strikeouts'] + "</td></tr>");
                });
            }
        }
    });
}