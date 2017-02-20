<?php

include_once "../vendor/autoload.php";

$baseStruct = [
    'auth' => null,
    'stop' => [
        'info'  => function($message) {
            print($message);
        },
        'error' => function($message) {
            die($message);
        }
    ]
];

$responseData = [];

$config = parse_ini_file(__DIR__ . "/config.ini", true);

$parser = function($baseStruct) use($_GET) {
    $baseStruct['auth'] = $_GET['auth'];
    unset($_GET);
    return $baseStruct;
};

$baseStruct = $parser($baseStruct);

if ($baseStruct['auth'] !== $config['repository']['auth']) {
    die("Auth Error");
}

$urlRequest = sprintf("%s/v1/corporate-companies/?limit=%s", $config['urls']['core'], $config['repository']['limit']);
$headers = ['Authorization' => $config['core_api']['auth']];

$result = Unirest\Request::get($urlRequest, $headers);

$validatior = function($result) use($baseStruct) {
    if (!is_object($result)) {
        $baseStruct['stop']['error']("Ошибка получения данных");
    }
    if ($result->code !== 200) {
        $baseStruct['stop']['error'](sprintf("Сервис вернул результат, Код ответа: %s", $result->code));
    }

    $result = json_decode($result->raw_body, true);

    if ($result['status'] !== 'success') {
        $baseStruct['stop']['error']("Ответ от сервиса содержить ошибку");
    }
    return $result;
};

$result = $validatior($result);

echo json_encode($result['data']['objects']);