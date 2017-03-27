<?php

/**
 * Author: Lisa Wen, Brian D'Alesandro, Isma Terrence
 * Created: March 21, 2017
 * Last Modified: March 21, 2017
 * Version: 1.0
 */

session_start();

//LW: clears all variables set in this session
session_destroy();

header("Location: ../index.html");