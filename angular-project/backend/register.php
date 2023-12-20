<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../backend/database.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
    $username = mysqli_real_escape_string($mysqli, trim($request->username));
    $password = mysqli_real_escape_string($mysqli, trim($request->password));
    $email = mysqli_real_escape_string($mysqli, trim($request->email));
    $position = mysqli_real_escape_string($mysqli, trim($request->position));

    $checkQuery = "SELECT * FROM user_tbl WHERE username = '$username' OR email = '$email'";
    $checkResult = $mysqli->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        $response = [
            'success' => false,
            'message' => 'ชื่อผู้ใช้หรืออีเมลมีอยู่แล้ว.',
        ];
    } else {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Insert user into user_tbl
        $insertUserQuery = "INSERT INTO user_tbl (username, password, email) VALUES ('$username', '$hashedPassword', '$email')";
        $insertUserResult = $mysqli->query($insertUserQuery);

        if ($insertUserResult) {
            $user_id = $mysqli->insert_id;

            // แทรกตำแหน่งผู้ใช้ใน user_level ด้วย FK
            $insertPositionQuery = "INSERT INTO user_level (user_id, position) VALUES ('$user_id', '$position')";
            $insertPositionResult = $mysqli->query($insertPositionQuery);

            if ($insertPositionResult) {
                $response = [
                    'success' => true,
                    'message' => 'การลงทะเบียนสำเร็จ ตอนนี้คุณสามารถเข้าสู่ระบบด้วยข้อมูลประจำตัวของคุณ.',
                ];
            } else {
                // หากไม่สามารถแทรกตำแหน่งผู้ใช้ ให้ลบบันทึกผู้ใช้
                $deleteUserQuery = "DELETE FROM user_tbl WHERE user_id = '$user_id'";
                $deleteUserResult = $mysqli->query($deleteUserQuery);

                $response = [
                    'success' => false,
                    'message' => 'ลงทะเบียนตำแหน่งผู้ใช้ไม่สำเร็จ.',
                ];
            }
        } else {
            $response = [
                'success' => false,
                'message' => 'การลงทะเบียนไม่สำเร็จ. กรุณาลองใหม่อีกครั้งในภายหลัง.',
            ];
        }
    }

    echo json_encode($response);
}
