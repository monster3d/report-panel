<?php

$pathConfig = sprintf("%s/backend/config.ini", $_SERVER['DOCUMENT_ROOT']);
$config = parse_ini_file($pathConfig, true);

$dbPath = sprintf("sqlite:%s/database/%s", $_SERVER['DOCUMENT_ROOT'], $config['database']['name']);

$dbPath = "sqlite:" . $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . "database/database.sqlite3";
$db = new PDO($dbPath);
