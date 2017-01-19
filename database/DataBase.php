<?php

class DataBase {
   
   /**
    *
    * Database file
    *
    * @var string
    *
    */
    private static $database = 'database.db';

   /**
    *
    * Data
    *
    * @var array
    *
    */
    private $data = [];

    public function __construct($file = null)
    {
        if (is_null($file)) {
            self::$database = getcwd() . DIRECTORY_SEPARATOR . self::$database;
        }
        
        if (!file_exists(self::$database)) {
            throw new Exception('Database not initialized');
        }
        $this->load();
    }

    public function __destruct()
    {
        $this->save();
    }

   /**
    *
    * Initialization empty database
    *
    * @param $file string
    *
    * @return bool
    *
    */
    public static function init($file = null)
    {
        $result = false;

        if (is_null($file)) {
            $file = static::$database;
        }

        $resurce = (file_exists(self::$database) === false) ? fopen($file, 'w') : false; 
        if ($resurce) {
            $result = true;
        }
        return $result;
    }

   /**
    *
    * Load data from database
    *
    */
    private function load()
    {
        $secret = file_get_contents(self::$database);
        $this->data = unserialize(base64_decode($secret, true));
    }

    /**
    *
    * Save data to database
    *
    */
    private function save()
    {
        $secret = base64_encode(serialize($this->data));
        file_put_contents(self::$database, $secret);   
    }

   /**
    *
    * Add new data to database
    *
    * @param $key string
    * @param $data mixed
    *
    */
    public function set($key, $data)
    {
        $this->data[$key] = $data;
    }

   /**
    *
    * Get data from database by key
    *
    * @param $key mixed
    *
    * @return mixed
    *
    */
    public function get($key = null)
    {
        $result = null;
        if (is_null($key)) {
            $result = $this->data;
        } else {
            $result = (array_key_exists($key, (array)$this->data) === true) ? $this->data[$key] : null;
        }
        return $result;
    }

    /**
    *
    * Remove data by key or if key is null then forgote add data in database
    *
    * @param $key string|null
    *
    */
    public function delete($key = null)
    {
        if (is_null($key)) {
            $this->data = [];
        } else {
            unset($this->data[$key]);
        }
    }
}