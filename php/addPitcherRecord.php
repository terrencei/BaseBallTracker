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

//IT: gets all input from user
$playerID = $_GET['playerID'];
$inningsPitched = $_GET['inningsPitched'];
$hitsAllowed = $_GET['hitsAllowed'];
$runsAllowed = $_GET['runsAllowed'];
$walks = $_GET['pitcherWalks'];
$strikeOuts = $_GET['strikeOuts'];

//IT: inserts input into the database
$sql = "insert into pitcherRecords(playerID, inningsPitched, hitsAllowed, runsAllowed, walks, strikeouts) values (?, ?, ?, ?, ?, ?);";
$statement = $db->prepare($sql);
$data = $statement->execute([$playerID, $inningsPitched, $hitsAllowed, $runsAllowed, $walks, $strikeOuts]);

//LW: updates derived aggregates
$updateAggregates = "update player as p
                    set era = (
                            select ((sum(runsAllowed)/sum(inningsPitched))*9) as era
                            from pitcherRecords as pr
                            where p.playerID = pr.playerID
                            and pr.playerID = ?
                        ),
                        whip = (
                            select avg((hitsAllowed+walks)/inningsPitched) as whip
                            from pitcherRecords as pr
                            where p.playerID = pr.playerID
                            and pr.playerID = ?
                        )
                    where p.playerID = ?
                    ;";
$update = $db->prepare($updateAggregates);
$update->execute([$playerID, $playerID, $playerID]);

//IT: gets sum of records to display
$sumOfRecords = "SELECT playerID, SUM(inningsPitched), SUM(hitsAllowed), SUM(runsAllowed), SUM(walks), SUM(strikeouts) FROM pitcherRecords WHERE playerID = $playerID";
$results = $db->query($sumOfRecords);

header("Content-Type: application/json");
echo json_encode($results->fetchAll(PDO::FETCH_ASSOC));

?>