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
    if (empty($_POST['discount_id']) || empty($_POST['discount'])) {
        $response = [
            "success" => false,
            "message" => "All fields are required.",
            "received_data" => $_POST // Include the received POST data in the response
        ];
        echo json_encode($response);
        exit;
    }

    // Assign variables from POST data
    $discount_id = $_POST['discount_id'];  // Use the correct variable name
    $discount = $_POST['discount'];  // Use the correct variable name

    // Log the received variables for debugging
    error_log("Received variables: discount_id = $discount_id, discount = $discount");

    try {
        // Update query for the discounts table, specifically the info column
        $stmt = $pdo->prepare("UPDATE discounts 
            SET info = :discount
            WHERE id = :discount_id");

        $stmt->bindParam(':discount_id', $discount_id, PDO::PARAM_INT);
        $stmt->bindParam(':discount', $discount);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "received_data" => $_POST]); // Include received data on success
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update discount.", "received_data" => $_POST]); // Include received data on failure
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage(), "received_data" => $_POST]); // Include received data on exception
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request.", "received_data" => $_POST]); // Include received data if the request method is not POST
}
?>
