<?php

/**
* Set data to database
*
* @param PDO $db
* @param string $data (json string data)
*/
function setData(&$db, $data, $id)
{
    $sql = "INSERT INTO `profiles`
    (`body`, `external_id`)
    VALUES(?, ?)";

    $params = [$data, $id];
    $stmt = $db->prepare($sql);
    try {
        $stmt->execute($params);
    } catch(PDOException $e) {

    }
}

/**
* Get all data from database
*
* @param PDO $db
*
* @return array
*/
function getData(&$db)
{
    $sql = "SELECT `id`, `body`, `external_id`
            FROM `profiles`";
    
    $stmt = $db->prepare($sql);
    try {
        $stmt->execute();
    } catch(PDOExcepton $e) {

    }
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result === false ? [] : $result;
}

/**
* Update data in database by external id
*
* @param PDO $db
* @param string $data (json data)
* @param int $id
*/
function updateData(&$db, $data, $id)
{
    $sql = "UPDATE `profiles`
            SET `body` = ?
            WHERE `external_id` = ?";

    $params = [$data, $id];
    $stmt = $db->prepare($sql);

    try {
        $stmt->execute($params);
    } catch(PDOException $e) {

    }
}

/**
*
* Exist data in database by external id
*
* @param PDO $db
* @param int $id
*
* @return bool
*
*/
function existsData(&$db, $id)
{
    $result = false;
    $sql = "SELECT COUNT(`external_id`) AS `count`
            FROM `profiles`
            WHERE `external_id` = ?";

    $params = [$id];
    $stmt = $db->prepare($sql);
    try {
        $stmt->execute($params);
    } catch(PDOException $e) {

    }
    $count = $stmt->fetch(PDO::FETCH_ASSOC);
    return $count['count'] > 0 || false;
}

/**
* Get current profile external id form json string data
*
* @param stirng  $profile
*
* @return int 
*
*/
function getID($profile)
{
    $data = json_decode($profile, true);
    return (int)$data['id'];
}

/**
* Get real id's profile by external id
*
* @param PDO $db
* @param int $externalID
*
* @return int|null
*
*/
function getRealIDByExternal(&$db, $externalID)
{
    $sql = "SELECT `id`
            FROM `profiles`
            WHERE `external_id` = ?
            LIMIT 1";

    $params = [$externalID];
    $stmt = $db->prepare($sql);

    try {
        $stmt->execute($params);
    } catch(PDOException $e) {

    }
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result === false ? null : $result['id'];
}




