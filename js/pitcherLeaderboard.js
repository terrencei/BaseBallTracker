/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 19, 2017
 * Version: 2.1
 */

$(document).ready(function(){
    //IT: gets the pitcher data to display
    var sql = "SELECT p.fname as FirstName, p.lname as LastName, " +
                    "SUM(pr.inningsPitched) as InningsPitched,  " +
                    "SUM(pr.hitsAllowed) as HitsAllowed, " +
                    "SUM(pr.runsAllowed) as RunsAllowed,  " +
                    "SUM(pr.walks) as Walks,  " +
                    "SUM(pr.strikeouts) as StrikeOuts, " +
                    "p.era as era, " +
                    "p.whip as whip " +
                "FROM pitcherRecords pr  " +
                "JOIN player p " +
                "ON pr.playerID = p.playerID " +
                "GROUP BY pr.playerID";
        
    $.get("php/getData.php?sql=" + sql,
        function(data, status){
            $.each(data, function(index, record){
                $("#tblPitcherLeaderBoard tbody").append(
                        "<tr><td>" + record['FirstName'] 
                        + "</td><td>" + record['LastName']
                        + "</td><td>" + record['InningsPitched'] 
                        + "</td><td>" + record['HitsAllowed'] 
                        + "</td><td>" + record['RunsAllowed'] 
                        + "</td><td>" + record['Walks'] 
                        + "</td><td>" + record['StrikeOuts']
                        + "</td><td>" + record['era']
                        + "</td><td>" + record['whip']
                        + "</td></tr>"
                );
            });
        $("#tblPitcherLeaderBoard").tablesorter();
        }
    );
       
});
