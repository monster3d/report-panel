<?php
echo "<pre>";
$postData = $_POST;
unset($_POST);

$dataStruct = [
    'taxi_parks' => [],
    'date_from'  => null,
    'date_to'    => null,
    'procent'    => 15,
    'total_sum'  => 0,
    'park_count' => 0
];

$countPark  = [];
$countSum   = [];
$tempValues = [];

$validator = function($data) {
    return htmlspecialchars(stripslashes(trim($data)));
};


foreach($postData as $key => $value) {
    $foundSum  = preg_match("/(sum)_(\d*)/", $key, $sumGroup);
    $foundPark = preg_match("/(park)_(\d*)/", $key, $parkGroup);
    
    if ($foundPark > 0) {
        $countPark[$parkGroup[2]] = $validator($value);
    }
    
    if ($foundSum > 0) {
        $countSum[$sumGroup[2]] = $validator($value);
    }

    if ($key === 'from') {
        $dataStruct['date_from'] = $validator($value);
    }

    if ($key === 'to') {
        $dataStruct['date_to'] = $validator($value); 
    }
}

$data = array_map(function($park, $sum) {
    return [$park => (int)$sum];
}, $countPark, $countSum);

array_walk($data, function($array) use(&$dataStruct, &$tempValues) {
    array_unshift($tempValues, array_shift(array_values($array)));
});

$dataStruct['taxi_parks'] = $data;
$dataStruct['total_sum']  = array_sum($tempValues);
$dataStruct['park_count'] = count($countPark);

unset($data, $tempValues);

print_r($dataStruct);
print_r("\n\r");

