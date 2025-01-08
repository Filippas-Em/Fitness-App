<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $e->getMessage()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Log the received POST data for debugging purposes
    error_log("Received POST data: " . print_r($_POST, true));

    // Validate required fields
    if (empty($_POST['soloService_id']) || empty($_POST['soloServiceName'])) {
        $response = [
            "success" => false,
            "message" => "All fields are required.",
            "received_data" => $_POST // Include the received POST data in the response
        ];
        echo json_encode($response);
        exit;
    }

    // Assign variables from POST data
    $service_id = $_POST['soloService_id'];  // Use the correct variable name
    $soloServiceName = $_POST['soloServiceName'];  // Use the correct variable name

    // Log the received variables for debugging
    error_log("Received variables: service_id = $service_id, service_name = $soloServiceName");

    try {
        // Update query for solo services
        $stmt = $pdo->prepare("UPDATE solo_services 
            SET service_name = :service_name
            WHERE id = :id");

        $stmt->bindParam(':id', $service_id, PDO::PARAM_INT);
        $stmt->bindParam(':service_name', $soloServiceName);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "received_data" => $_POST]); // Include received data on success
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update service.", "received_data" => $_POST]); // Include received data on failure
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage(), "received_data" => $_POST]); // Include received data on exception
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request.", "received_data" => $_POST]); // Include received data if the request method is not POST
}
?>
