/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 19, 2017
 * Version: 2.1
 */

$(document).ready(function() {
    //BD: get player data to display leaderboard
    var sql = "SELECT p.fname as FirstName, p.lname as LastName, " +
                    "SUM(pr.atBats) as atBats,  " +
                    "SUM(pr.hits) as hits, " +
                    "SUM(pr.homeRuns) as homeRuns, " +
                    "SUM(pr.runsBattedIn) as runsBattedIn,  " +
                    "SUM(pr.walks) as walks,  " +
                    "SUM(pr.stolenBases) as stolenBases, " +
                    "p.average as average " +
                "FROM playerRecords pr  " +
                "JOIN player p " +
                "ON pr.playerID = p.playerID " +
                "GROUP BY pr.playerID;";
    
    $.get("php/getData.php?sql=" + sql,  
        function(data, status){
            $.each(data, function(index, record){
                $("#playerLeaderboardTable tbody").append(
                        "<tr><td>" + record['FirstName'] 
                        + "</td><td>" + record['LastName']
                        + "</td><td>" + record['atBats']
                        + "</td><td>" + record['hits'] 
                        + "</td><td>" + record['homeRuns'] 
                        + "</td><td>" + record['runsBattedIn'] 
                        + "</td><td>" + record['walks']
                        + "</td><td>" + record['stolenBases'] 
                        + "</td><td>" + record['average']  
                        + "</td></tr>"
                );
        });
         $("#playerLeaderboardTable").tablesorter();
        }
    );
       
});