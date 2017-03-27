<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 3, 2017
 * Last Modified: March 3, 2017
 * Version: 1.1
 */

//LW: connect to the database
$dsn = "mysql:host=twilbury.cs.drexel.edu;dbname=lw493_info556_201602";
$username = "lw493";
$password = "quikxmjps";
$db = new PDO($dsn, $username, $password);

?>