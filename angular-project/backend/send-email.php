<?php
// Allow from any origin
require './vendor/autoload.php'; // ตรวจสอบว่าไฟล์ autoload.php อยู่ในเส้นทางถูกต้อง
use PHPMailer\PHPMailer\PHPMailer;

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($_POST["taskData"])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid request. Missing taskData."));
        exit();
    }

    $taskData = json_decode($_POST["taskData"], true);

    if (!isset($taskData["recipients"]) || !isset($taskData["subject"]) || !isset($taskData["content"])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid request. Missing recipients, subject, or content."));
        exit();
    }

    $recipients = $taskData["recipients"];
    $subject = $taskData["subject"];
    $content = nl2br($taskData["content"]);

    // เรียกใช้ PHPMailer และตั้งค่า
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8'; // ตั้งค่า CharSet เป็น UTF-8
    $mail->Encoding = 'base64'; // ตั้งค่า Encoding เป็น base64 หรือเลือกตามที่เหมาะสม
    $mail->isSMTP(true); // เปิดใช้งานโหมด SMTP
    $mail->Host = 'smtp.gmail.com'; // เซิร์ฟเวอร์ SMTP ของ Gmail
    $mail->Port = 587; // พอร์ตของ Gmail SMTP
    $mail->SMTPSecure = 'tls'; // การเชื่อมต่อผ่าน TLS
    $mail->SMTPAuth = true;
    $mail->Username = 'loveboatlnwza@gmail.com'; // ใส่อีเมล Gmail ของคุณ
    $mail->Password = 'sckbranyuttrpspr'; // ใส่รหัสผ่านแอปพลิเคชันที่คุณสร้าง
    $mail->setFrom('arit.rmutsv@gmail.com', 'สํานักวิทยบริการ มทร.ศรีวิชัย'); // อีเมลและชื่อผู้ส่ง


    // เพิ่มอีเมลผู้รับ
    foreach ($recipients as $recipient) {
        $mail->addAddress($recipient);
    }

    $mail->Subject = $subject;
    $mail->msgHTML($content);

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $file_path = $_FILES['file']['tmp_name'];
        $file_name = $_FILES['file']['name'];
        $mail->addAttachment($file_path, $file_name);
    }

    // ตรวจสอบ count และทำการส่งอีเมล
    if (count($recipients) === 0) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid request. No recipients provided."));
        exit();
    }

    if ($mail->send()) {
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid request."));
}
