/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 17, 2017
 * Last Modified: March 19, 2017
 * Version: 1.3
 */

//LW: gets all the team names to display in a drop-down
function getTeams(selectTeam){
    var sql = "select teamID, teamName from team;";
    $.get("php/getData.php?sql=" + sql,
        function(data, status){
            $.each(data, function(index, record){
                $(selectTeam).append('<option value="' + record['teamID'] + '">' + record['teamName'] + '</option>');
            });
        }
    );
}

//LW: gets all the player positions to display in a drop-down
function getPosition(){
    var sql = "select distinct(position) as pos from player order by pos;";
    $.get("php/getData.php?sql=" + sql,
        function(data, status){
            $.each(data, function(index, record){
                $("#selectPosition").append('<option value="' + record['pos'] + '">' + record['pos'] + '</option>');
            });
        }
    );
}

//LW: shows  players for selected team in a dropdown
function getPlayers(teamID){
    var sql = "select playerID, fname, lname from player where teamID = " + teamID + " and position <> 'pitcher' ;";
    $.get("php/getData.php?sql=" + sql,
            function(data, status){
                $("#selectPlayer").empty();
                if (!$.trim(data)){
                    //LW: if no data is returned, display no player for this team
                    $("#selectPlayer").append('<option value="null">There are no players for this team.</option>');
                }else{
                    //LW: otherwise, clear current options and append select team's
                    $.each(data, function(index, record){
                        $("#selectPlayer").append('<option value="' + record['playerID'] + '">' + record['fname'] + " " + record['lname'] + '</option>');
                    });
                }
            }
        );
}

//LW: shows all players (pitchers included) for selected team in a dropdown
function getAllPlayers(teamID){
    var sql = "select playerID, fname, lname from player where teamID = " + teamID + ";";
    $.get("php/getData.php?sql=" + sql,
            function(data, status){
                $("#selectPlayer").empty();
                if (!$.trim(data)){
                    //LW: if no data is returned, display no player for this team
                    $("#selectPlayer").append('<option value="null">There are no players for this team.</option>');
                }else{
                    //LW: otherwise, clear current options and append select team's
                    $("#selectPlayer").append('<option value="null">Select a Player</option>');
                    $.each(data, function(index, record){
                        $("#selectPlayer").append('<option value="' + record['playerID'] + '">' + record['fname'] + " " + record['lname'] + '</option>');
                    });
                }
            }
        );
}

//BD: hides the updatePlayer Div until the Edit Player/Pitcher button is clicked
function hideDivs () {
    $('#updatePlayer').hide(); 
}