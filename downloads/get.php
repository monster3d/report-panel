<?php



if (array_key_exists('sing', $_GET)) {
    $signature = $_GET['sing'];
} else {
    die("Произошла ошибка!");
}

$data = json_decode(base64_decode($signature), true);
$file = $data['file'];

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));

    include_once($file);
    exit;
}