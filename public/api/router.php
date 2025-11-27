<?php

$path = pathinfo($_SERVER["SCRIPT_FILENAME"]);
if ($path["extension"] == "yaml") {
    header("Access-Control-Allow-Origin: *");
    readfile($_SERVER["SCRIPT_FILENAME"]);
    return true;
}

return false;

?>