<?php

$dataString = file_get_contents('php://input');
$data = json_decode($dataString);
echo $data->first_name;
// Deliberately don't close PHP tag, to avoid accidental output
