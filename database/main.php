<?php


require_once "../vendor/autoload.php";
require_once "database.php";
require_once "functions.php";


$response = [];
switch($_SERVER['REQUEST_METHOD']) {
    case "GET":
        $response = getProfileData($db);
    break;
    case "POST":
        setProfilesData($db, $_POST['data']);
        $response = getProfileData($db);
}

/**
* Добовляет информацию о профилях
* 
* @param SimpleCrud $db
* @param array $data
*
* @return array
*
*/
function setProfilesData($db, $data)
{
    $data = json_decode($data, true);
    foreach($data as $profile) {
        $profileID = $profile['id'];
        if (existsData($db, $profileID)) {
            updateData($db, json_encode($profile), $profileID);
        } else {
            setData($db, json_encode($profile), $profileID);
        }
    }
}

/**
* Получает данные о профилях
*
* @param SimpleCrud $db
*
* @return array
*
*/
function getProfileData($db)
{
    $data = getData($db);
    $profileData = array_map(function($array) {
        return json_decode($array['body'], true);
    }, $data);
    return $profileData;
}

header('application/json', true, 200);
echo json_encode($response);