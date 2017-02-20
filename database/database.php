<?php



$config = parse_ini_file("../backend/config.ini", true);

$dbPath = sprintf("sqlite:%s/%s", __DIR__ ,$config['database']['name']);

$db = new PDO($dbPath);
