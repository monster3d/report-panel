<?php

/*
* Console tools for Database
*
*/

require_once "DataBase.php";

switch($argv[1]) {
    case 'init':
        DataBase::init();
        print_r("Database init success! \r\n");
        break;
    case 'get':
        $db = new DataBase();
        $result = $db->get();
        print_r($result);
        print_r("\r\n");
        break;
    case 'set':
        $db = new DataBase();
        $db->set($argv[2], $argv[3]);
        break;
    case 'delete':
        $db = new DataBase();
        $db->delete();
}