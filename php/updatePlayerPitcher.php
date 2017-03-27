<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 12, 2017
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
$playerID = $_GET['playerID'];

$sql = "UPDATE player SET fname = '$fname', lname = '$lname', teamID = '$teamID', position = '$position'
        WHERE playerID = '$playerID'";
$n = $db->exec($sql);

header("Content-Type: text/plain");
echo $n;

