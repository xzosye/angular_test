<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../backend/database.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    $usernameOrEmail = mysqli_real_escape_string($mysqli, trim($request->username));
    $password = mysqli_real_escape_string($mysqli, trim($request->password));

    $loginQuery = "SELECT user_tbl.*, user_level.position 
                   FROM user_tbl 
                   INNER JOIN user_level ON user_tbl.user_id = user_level.user_id 
                   WHERE user_tbl.username = '$usernameOrEmail' OR user_tbl.email = '$usernameOrEmail'";
    $loginResult = $mysqli->query($loginQuery);

    if ($loginResult->num_rows === 1) {
        $row = $loginResult->fetch_assoc();
        $hashedPassword = $row['password'];

        // Verify the password
        if (password_verify($password, $hashedPassword)) {
            $response = [
                'success' => true,
                'message' => 'ยินดีต้อนรับเข้าสู่ระบบ.',
                'user_id' => $row['user_id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'position' => $row['position'],
            ];
        } else {
            // Incorrect password
            $response = [
                'success' => false,
                'message' => 'รหัสผ่านผิดพลาด.',
            ];
        }
    } else {
        // User not found
        $response = [
            'success' => false,
            'message' => 'ไม่พบชื่อผู้ใช้งาน.',
        ];
    }

    echo json_encode($response);
}
