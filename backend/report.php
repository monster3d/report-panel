<?php

require_once "../vendor/autoload.php";
require_once "../database/database.php";
require_once "../database/functions.php";

$baseStruct = [
	'current'   => null,
	'real_id'   => null,
	'error_msg' => null
];

$parser = function($post) use(&$baseStruct) {
	$baseStruct['current'] = $post['current'];
	unset($post);
};

call_user_func($parser, $_POST);

$config = parse_ini_file(__DIR__ . "/config.ini", true);

$baseStruct['real_id'] = getRealIDByExternal($db, $baseStruct['current']);

$sql = "SELECT * FROM `profiles` WHERE `id` = ? LIMIT 1";
$params = [$baseStruct['real_id']];
$stmt = $db->prepare($sql);
try {
	$stmt->execute($params);
} catch(PDOException $e) {
	$baseStruct['error_msg'] = $e->getMessage();
}

$profileCursore = $stmt->fetch(PDO::FETCH_ASSOC);
$profileData = json_decode($profileCursore['body'], true);

$dateFormat = function(&$profileData) {
	$prepareDate = [
		'from' => sprintf("%s-01 00:00:00", $profileData['from']),
		'to'   => sprintf("%s-01 00:00:00", $profileData['to'])
	];
	return $prepareDate;
};

$date = $dateFormat($profileData);

$urlRequest = sprintf("%s/reportcorporateorders/%s/%s/%s/%s", 
	$config['urls']['billing'], $date['from'], $date['to'], $config['main']['limit'], 0);

$serviceResult = Unirest\Request::get($urlRequest);

if ($serviceResult instanceof \stdClass || $serviceResult->code !== 200) {
	print_r($serviceResult);
}

$billingResult = json_decode($serviceResult->raw_body, true);

if (!$billingResult['success']) {

}

$filter = array_values(array_filter(array_map(
	function($array) {
		if ($array['checked']) {
			unset($array['checked']);
			settype($array['id'], 'int');
			return $array;
		}
	}, $profileData['company'])));
echo "<pre>";
print_r($billingResult);
exit();
$resultData = array_map(function($array) use($filter) {
	foreach($filter as $value) {
		if ((int)$array['company_id'] === $value['id']) {
			return $array;
		}
	}
}, $billingResult['report']);

$sql = "SELECT COUNT(`profile_id`) AS `count`
		FROM `reports`
		WHERE `profile_id` = ?";

$params = [$baseStruct['real_id']];
$stmt = $db->prepare($sql);
try {
	$stmt->execute($params);
} catch(PDOException $e) {
	$baseStruct['error_msg'] = $e->getMessage();
}
$count = $stmt->fetch();
if ($count['count'] > 0) {
	$sql = "DELETE FROM `reports`
			WHERE `profile_id` = ?";

    $params = [$baseStruct['real_id']];
	$stmt = $db->prepare($sql);
	try {
		$stmt->execute($params);
	} catch(PDOException $e) {
		$baseStruct['error_msg'] = $e->getMessage();
	}
}

$sql = "INSERT INTO `reports` 
		(`date`, `order_id`, `client_name`, `driver_name`, `taxi_park_name`, `taxi_park_id`, 
		`company_name`, `company_id`, `tariff`, `total_cost`, `amount_mytaxi`, `profile_id`)
		VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$db->beginTransaction();
$stmt = $db->prepare($sql);
foreach($billingResult['report'] as $result) {
	$params = [
		$result['date'],
		$result['order_id'],
		$result['client_name'],
		$result['driver_name'],
		$result['ts_name'],
		$result['ts_id'],
		$result['company_name'],
		$result['company_id'],
		$result['tariff'],
		$result['total_cost'],
		$result['amount_mytaxi'],
		$baseStruct['real_id']

	];
	try {
		$stmt->execute($params);
	} catch(PDOException $e) {
		$baseStruct['error_msg'] = $e->getMessage();
	}
	
	if ($baseStruct['error_msg'] !== null) {
		print_r($baseStruct);
		$db->rollBack();
		break;
	}
}
$db->commit();

$pathScript = escapeshellcmd(sprintf('/usr/bin/python3 %s/backend/report.py', $_SERVER['DOCUMENT_ROOT']));

exec('/usr/bin/python3 /home/monster3d/server/www/dev.loc/backend/report.py 18 > /dev/null 2>/dev/null &');

header('Location: ../status.html');
exit();


