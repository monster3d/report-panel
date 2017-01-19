<?php

require_once "DataBase.php";

$db = new DataBase();

$parser = function() {
    $result = [
        'action' => $_GET['action'],
        'data'   => empty($_GET['data']) ? [] : $_GET['data'],
        'key'    => ($_GET['key'] === 'null') ? null : $_GET['key']
    ];
    unset($_GET);
    return $result;
};

$result = $parser();

$response = null;
$success = false;

switch($result['action']) {
    case 'get':
        $response = $db->get($result['key']);
        $success = true;
        break;
    case 'set':
        $db->set($result['key'], $result['data']);
        $response = $db->get($result['key']);
        $success = true;
        break;
    case 'delete':
        //this void
        break;
    default:
        //this void
}
/**
$response = [
    1456 => [
        'id'   => 1,
        'name' => 'Yanvar 2017',
        'data' => [
            45 => [
                'name' => 'Taksopark X',
                'sum'  => 5700,
                'prec' => 25
            ],
            685 => [
                'name' => 'Test taxi park X',
                'sum'  => 5000,
                'prec' => 15
            ]
        ]
    ],
    85 => [
        'id'   => 2,
        'name' => 'May 2017',
        'data' => [
            57 => [
                'name' => 'Test test X',
                'sum'  => 2500,
                'prec' => 10
            ],
            758 => [
                'name' => 'Test park X',
                'sum'  => 7000,
                'prec' => 15
            ],
            99 => [
                'name' => 'Test mega park X',
                'sum'  => 90000,
                'prec' => 10
            ]
        ]
    ]
];
*/
echo $response;
//echo json_encode($response, JSON_FORCE_OBJECT);



