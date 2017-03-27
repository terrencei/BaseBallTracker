<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 21, 2017
 * Last Modified: March 21, 2017
 * Version: 1.0
 */

session_start();

$data = "false";

if (isset($_SESSION['loggedIn']) == true){
    $data = "true";
}else{
    $data = "false";
}

header("Content-Type: text/plain");
echo $data;