<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 3, 2017
 * Last Modified: March 3, 2017
 * Version: 1.1
 */

//LW: connect to the database
$dsn = "mysql:host=us-cdbr-iron-east-03.cleardb.net;dbname=heroku_5d00858bf0bb0aa";
$username = "b070b3dbbb2e5c";
$password = "c02e8520";
$db = new PDO($dsn, $username, $password);

?>