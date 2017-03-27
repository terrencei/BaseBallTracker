<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 11, 2017
 * Last Modified: March 12, 2017
 * Version: 1.0
 */

error_reporting(E_ALL);	
ini_set('display_errors',	'On');

//LW: include database.php to connect to the database
include 'database.php';

$teamID = $_GET['teamID'];
$fname = $_GET['fname'];
$lname = $_GET['lname'];
$position = $_GET['position'];

$sql = "insert into player (fname, lname, teamID, position) values (?, ?, ?, ?);";
$statement = $db->prepare($sql);
$data = $statement->execute([$fname, $lname, $teamID, $position]);

header("Content-Type: text/plain");
echo $data;