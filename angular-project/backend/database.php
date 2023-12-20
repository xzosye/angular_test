<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'assignment_system';

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($mysqli->connect_error) {
    die('Error : (' . $mysqli->connect_errno . ')' . $mysqli->connect_error);
}


    // $sql = "SELECT prefix_id, prefix_name FROM prefix_tbl";
    // $result = $mysqli->query($sql);

    // if ($result->num_rows > 0) {
    //     // output data of each row
    //     while ($row = $result->fetch_assoc()) {
    //         echo "<br> id: " . $row["prefix_id"] . " - Name: " . $row["prefix_name"] . "<br>";
    //     }
    // } else {
    //     echo "0 results";
    // }

    // $mysqli->close();
