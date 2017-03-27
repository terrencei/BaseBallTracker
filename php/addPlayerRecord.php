<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 11, 2017
 * Last Modified: March 19, 2017
 * Version: 2.1
 */

error_reporting(E_ALL);
ini_set('display_errors', 'On');

//LW: include database.php to connect to the database
include 'database.php';

$playerID = $_GET['playerID'];
$hits = $_GET['hits'];
$homeRuns = $_GET['homeRuns'];
$atBats = $_GET['atBats'];
$runsBattedIn = $_GET['runsBattedIn'];
$walks = $_GET['playerWalks'];
$stolenBases = $_GET['stolenBases'];

//IT: inserts input into the database
$sql = "insert into playerRecords(playerID, atBats, hits, homeRuns, runsBattedIn, walks, stolenBases) values (?, ?, ?, ?, ?, ?, ?);";
$statement = $db->prepare($sql);
$statement->execute([$playerID,$hits, $homeRuns, $atBats, $runsBattedIn, $walks, $stolenBases]);

//LW: updates derived aggregates
$updateAggregates = "update player as p
                    set average = (
                            select avg(hits/atBats) as average
                            from playerRecords as pr
                            where p.playerID = pr.playerID
                            and pr.playerID = ?
                        )
                    where p.playerID = ?
                    ;";
$update = $db->prepare($updateAggregates);
$update->execute([$playerID, $playerID]);

$sumOfRecords = "SELECT playerID, SUM(atBats), SUM(hits), SUM(homeRuns), SUM(runsBattedIn), SUM(walks), SUM(stolenBases) FROM playerRecords WHERE playerID = $playerID";
$results = $db->query($sumOfRecords);

header("Content-Type: application/json");

echo json_encode($results->fetchAll(PDO::FETCH_ASSOC));

?>