<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require './vendor/autoload.php'; // เพิ่มบรรทัดนี้

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the message data from the POST request
    $postData = file_get_contents('php://input');
    $messageData = json_decode($postData, true);

    // Check if the message key exists in the received data
    if (isset($messageData['message'])) {
        // Get the message content
        $lineMessage = $messageData['message'];

        // Call your function to send Line notification here
        sendLineNotification($lineMessage);

        // Return a success response
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Line notification sent successfully']);
    } else {
        // Return an error response
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Message is empty']);
    }
} else {
    // Return an error response for unsupported methods
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unsupported request method']);
}

// Function to send Line notification
function sendLineNotification($message)
{
    // Line API endpoint
    $lineEndpoint = 'https://api.line.me/v2/bot/message/multicast';

    // Line API access token
    $lineAccessToken = '4CRvsTaVnt2pgh4/T7NIY6qbwgcIoIcJV3yMULBvRlh1nnOvhzfYpPGt/lxchEx52mW02F+ip05MZ6bwmlne8OMHOEHcr5k/wRcmUem3F+dBfc1it5OW6W18LLsMLN+TkPZ5pF93WMrq83anoPN+qQdB04t89/1O/w1cDnyilFU=';

    // Prepare message data
    $messageData = [
        'to' => ['U4d7549edc5735dd522a56ef0e8ed2a80'], // Replace with actual Line user IDs
        'messages' => [
            [
                'type' => 'text',
                'text' => $message
            ]
        ]
    ];

    $client = new \GuzzleHttp\Client([
        'base_uri' => $lineEndpoint,
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => "Bearer $lineAccessToken"
        ]
    ]);

    try {
        $response = $client->post('', [
            'json' => $messageData
        ]);

        if ($response->getStatusCode() === 200) {
            // Notification sent successfully
        } else {
            // Error sending notification
        }
    } catch (\GuzzleHttp\Exception\ClientException $e) {
        // Error sending notification
    }
}
