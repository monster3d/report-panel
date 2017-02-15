<?php

include_once "../vendor/autoload.php";

$baseStruct = [
    'type' => null
];

$config = parse_ini_file(__DIR__ . "/config.ini", true);

$parser = function($baseStruct) use($_GET) {
    $baseStruct['type'] = $_GET['type'];
    unset($_GET);
    return $baseStruct;
};

$baseStruct = $parser($baseStruct);

switch($baseStruct['type']) {
    case "company":
        $urlRequest = sprintf("%s/v1/corporate-companies/", $config['urls']['core']);
        $headers = ['Authorization' => $config['core_api']['auth']];
}

$result = Unirest\Request::get($urlRequest, $headers);

if ($result instanceof \stdClass || $result->code !== 200) {
	print_r($result);
}

$data = json_decode($result->raw_body, true);

if ($data['status'] !== 'success') {

}

$pages = $data['data']['pagination'];

if ($pages['total_pages'] > 1) {
    $i = $pages['page'];
    $tempResult = [];
    while ($i < $pages['total_pages']) {
        $i++;
        $urlRequest = sprintf("%s?page=%s", $urlRequest, $i);
        $pageResult = Unirest\Request::get($urlRequest, $headers);
        $tempResult = array_merge($data['data']['objects'], json_decode($pageResult->raw_body, true)['data']['objects']);
    }
}

$totalResult = array_values(array_filter(array_map(function(&$array) {
    if (!$array['is_blocked']) {
        return $array;
    }
}, $tempResult)));

echo json_encode($totalResult);