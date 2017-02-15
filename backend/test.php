<?php
$res = [
    0 => [
        'date' => "2017-01-17 23:22:01",
        'order_id' => 1245,
        'client_name' => "0Toco - Bot",
        'driver_name' => "0Driver name bot",
        'ts_name' => 'NewMax',
        'ts_id' => 156,
        'company_name' => 'Test park',
        'company_id' => 454,
        'tariff' => 'Econom',
        'payment_type' => 'cash',
        'total_cost' => 6000,
        'amount_mytaxi' => 1500,
        'rest_amount' => 500
    ],
    1 => [
         'date' => "2017-01-17 23:22:01",
         'order_id' => 1245,
         'client_name' => "1Toco - Bot",
         'driver_name' => "1Driver name bot",
         'ts_name' => 'Test Park',
         'ts_id' => 45654,
         'company_name' => 'Test company',
         'company_id' => 7897,
         'tariff' => 'Econom',
         'payment_type' => 'cash',
         'total_cost' => 16500,
         'amount_mytaxi' => 5000,
         'rest_amount' => 4600
    ],
    2 => [
         'date' => "2017-01-17 23:22:01",
         'order_id' => 1245,
         'client_name' => "2Toco - Bot",
         'driver_name' => "2Driver name bot",
         'ts_name' => 'NewMax',
         'ts_id' => 1545,
         'company_name' => '4Test company',
         'company_id' => 5645,
         'tariff' => 'Econom',
         'payment_type' => 'cash',
         'total_cost' => 18000,
         'amount_mytaxi' => 7500,
         'rest_amount' => 4600
    ],
    3 => [
         'date' => "2017-01-17 23:22:01",
         'order_id' => 1245,
         'client_name' => "Toco - Bot3",
         'driver_name' => "Driver name bot",
         'ts_name' => 'NewMax',
         'ts_id' => 7897,
         'company_name' => '5Test company',
         'company_id' => 78945,
         'tariff' => 'Econom',
         'payment_type' => 'cash',
         'total_cost' => 25000,
         'amount_mytaxi' => 12000,
         'rest_amount' => 6000
    ]
];

header('application/json', true, 200);
#echo "<pre>";
print_r(json_encode($res));


