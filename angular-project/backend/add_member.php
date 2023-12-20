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
    $prefix_name = mysqli_real_escape_string($mysqli, trim($request->prefix));
    $depart_name = mysqli_real_escape_string($mysqli, trim($request->department));
    $level_name = mysqli_real_escape_string($mysqli, trim($request->level));
    $userdata_fname = mysqli_real_escape_string($mysqli, trim($request->firstName));
    $userdata_lname = mysqli_real_escape_string($mysqli, trim($request->lastName));
    $userdata_email = mysqli_real_escape_string($mysqli, trim($request->email));
    $userdata_tell = mysqli_real_escape_string($mysqli, trim($request->phoneNumber));

    $checkQuery = "SELECT * FROM user_tbl WHERE username = '$username' OR email = '$email'";
    $checkResult = $mysqli->query($checkQuery);

    if ($checkResult && $checkResult->num_rows > 0) {
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

            // Get prefix_id from prefix_tbl if it exists
            $getPrefixQuery = "SELECT prefix_id FROM prefix_tbl WHERE prefix_name = '$prefix_name'";
            $getPrefixResult = $mysqli->query($getPrefixQuery);

            if ($getPrefixResult && $getPrefixResult->num_rows > 0) {
                $prefixData = $getPrefixResult->fetch_assoc();
                $prefix_id = $prefixData['prefix_id'];
            } else {
                // If the prefix_name doesn't exist, insert it into the prefix_tbl
                $insertPrefixQuery = "INSERT INTO prefix_tbl (prefix_name) VALUES ('$prefix_name')";
                $insertPrefixResult = $mysqli->query($insertPrefixQuery);
                $prefix_id = $mysqli->insert_id;
            }

            // Get level_id from level_tbl if it exists
            $getLevelQuery = "SELECT level_id FROM level_tbl WHERE level_name = '$level_name'";
            $getLevelResult = $mysqli->query($getLevelQuery);

            if ($getLevelResult && $getLevelResult->num_rows > 0) {
                $levelData = $getLevelResult->fetch_assoc();
                $level_id = $levelData['level_id'];
            } else {
                // If the level_name doesn't exist, insert it into the level_tbl
                $insertLevelQuery = "INSERT INTO level_tbl (level_name) VALUES ('$level_name')";
                $insertLevelResult = $mysqli->query($insertLevelQuery);
                $level_id = $mysqli->insert_id;
            }

            // Get depart_id from depart_tbl if it exists
            $getDepartQuery = "SELECT depart_id FROM depart_tbl WHERE depart_name = '$depart_name'";
            $getDepartResult = $mysqli->query($getDepartQuery);

            if ($getDepartResult && $getDepartResult->num_rows > 0) {
                $departData = $getDepartResult->fetch_assoc();
                $depart_id = $departData['depart_id'];
            } else {
                // If the depart_name doesn't exist, insert it into the depart_tbl
                $insertDepartQuery = "INSERT INTO depart_tbl (depart_name) VALUES ('$depart_name')";
                $insertDepartResult = $mysqli->query($insertDepartQuery);
                $depart_id = $mysqli->insert_id;
            }

            // Insert userdata into userdata_tbl with foreign key relationships
            $insertUserDataQuery = "INSERT INTO userdata_tbl (user_id, prefix_id, level_id, depart_id, userdata_fname, userdata_lname, userdata_email, userdata_tell) VALUES ('$user_id', '$prefix_id', '$level_id', '$depart_id', '$userdata_fname', '$userdata_lname', '$userdata_email', '$userdata_tell')";
            $insertUserDataResult = $mysqli->query($insertUserDataQuery);

            if ($insertUserDataResult) {
                // Insert user position into user_level with foreign key relationship
                $insertPositionQuery = "INSERT INTO user_level (user_id, position) VALUES ('$user_id', '$position')";
                $insertPositionResult = $mysqli->query($insertPositionQuery);

                if ($insertPositionResult) {
                    $response = [
                        'success' => true,
                        'message' => 'การลงทะเบียนสำเร็จ ตอนนี้คุณสามารถเข้าสู่ระบบด้วยข้อมูลประจำตัวของคุณ.',
                    ];
                } else {
                    // If user position insertion fails, rollback the previous insertions
                    $deleteUserDataQuery = "DELETE FROM userdata_tbl WHERE user_id = '$user_id'";
                    $deleteUserDataResult = $mysqli->query($deleteUserDataQuery);

                    $deleteUserQuery = "DELETE FROM user_tbl WHERE user_id = '$user_id'";
                    $deleteUserResult = $mysqli->query($deleteUserQuery);

                    $response = [
                        'success' => false,
                        'message' => 'การลงทะเบียนตำแหน่งผู้ใช้ไม่สำเร็จ.',
                    ];
                }
            } else {
                // If userdata insertion fails, rollback the user insertion
                $deleteUserQuery = "DELETE FROM user_tbl WHERE user_id = '$user_id'";
                $deleteUserResult = $mysqli->query($deleteUserQuery);

                $response = [
                    'success' => false,
                    'message' => 'การลงทะเบียนไม่สำเร็จ. กรุณาลองใหม่อีกครั้งในภายหลัง.',
                ];
            }
        } else {
            $response = [
                'success' => false,
                'message' => 'การลงทะเบียนไม่สำเร็จ. กรุณาลองใหม่อีกครั้งในภายหลัง.',
            ];
        }

        echo json_encode($response);
    }
}
