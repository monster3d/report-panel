<?php

include_once "../vendor/autoload.php";

$baseStruct = [
    'type' => null
];

$parser = function($baseStruct) use($_GET) {
    $baseStruct['type'] = $_GET['type'];
    unset($_GET);
    return $baseStruct;
};

$baseStruct = $parser($baseStruct);

switch($baseStruct['type']) {
    case "company":
        $urlRequest = "http://www.mocky.io/v2/58859b7e0f0000032bff658b";
}

$result = Unirest\Request::get($urlRequest);
echo $result->raw_body;


/**
$mock = [
    0 => [
        'id' => 10,
        'title' => "test name"
    ],
    1 => [
        'id' => 55,
        'title' => "mega company"
    ],
    2 => [
        'id' => 454,
        'title' => "sdfsdfsdfsdf"
    ]
];

echo json_encode($mock);
*/