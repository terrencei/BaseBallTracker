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

//BD: gets the user input
$teamName = $_GET["teamName"];
$teamCity = $_GET["teamCity"];
$teamState = $_GET["teamState"];
$yearFounded = $_GET["yearFounded"];
$wins = $_GET["wins"];
$losses = $_GET["losses"];

//LW: inserts new team
$sql = "insert into team (teamName,teamCity,teamState,yearFounded,wins,losses) values (?, ?, ?, ?, ?, ?);";
$statement = $db->prepare($sql);
$data = $statement->execute([$teamName,$teamCity,$teamState,$yearFounded,$wins,$losses]);

//LW: returns the records inserted
header("Content-Type: text/plain");
echo $data;

?>