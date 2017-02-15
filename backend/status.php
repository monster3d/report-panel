<?php

$response = [
    'status' => null
];
$path = sprintf("%s/backend/status.pid", $_SERVER['DOCUMENT_ROOT']);
$data = file_get_contents($path);

if (empty($data)) {
    $data = json_encode([]);
}

echo $data;