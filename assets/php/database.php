<?php
    $server = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'php-login-database';

    try{
        $conn = new PDO("mysql:host=$server;dbname=$database;",$username, $password);
    } catch(PDOException $e){
        die('Conection failed: '.$e->getMessage());
    }
?>