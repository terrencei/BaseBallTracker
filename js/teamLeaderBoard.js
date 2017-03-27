/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 19, 2017
 * Version: 2.1
 */

$(document).ready(function(){
    var sql = "SELECT * FROM team;";
    
    //IT: gets team data to display
    $.get("php/getData.php?sql=" + sql,
        function(data, status){
            $.each(data, function(index, record){
                $("#tblTeamLeaderBoard tbody").append(
                        "<tr><td>" + record['teamName'] 
                        + "</td><td>" + record['teamCity']
                        + "</td><td>" + record['teamState'] 
                        + "</td><td>" + record['yearFounded'] 
                        + "</td><td>" + record['wins'] 
                        + "</td><td>" + record['losses']  
                        + "</td></tr>"
                );
        });
         $("#tblTeamLeaderBoard").tablesorter();
        }
    );

});