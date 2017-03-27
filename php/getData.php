<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 11, 2017
 * Last Modified: March 11, 2017
 * Version: 1.0
 */

error_reporting(E_ALL);	
ini_set('display_errors',	'On');

//LW: include database.php to connect to the database
include 'database.php';

$sql = $_GET['sql'];

//LW: run sql statement to select required rows
$data = $db->query($sql);

//LW: send rows in json format
header("Content-Type:application/json");
echo json_encode($data->fetchAll(PDO::FETCH_ASSOC));
