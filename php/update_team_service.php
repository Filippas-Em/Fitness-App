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
    // Log the received POST data for debugging
    error_log("Received POST data: " . print_r($_POST, true));

    // Validate required fields
    if (
        empty($_POST['teamService_id']) ||
        empty($_POST['teamServiceName']) ||
        empty($_POST['daysOfWeek']) ||
        empty($_POST['teamTime']) ||
        empty($_POST['maxOccupancy']) ||
        empty($_POST['trainer'])
    ) {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required.",
            "received_data" => $_POST
        ]);
        exit;
    }

    // Assign variables from POST data
    $teamService_id = $_POST['teamService_id'];
    $teamServiceName = $_POST['teamServiceName'];
    $daysOfWeek = $_POST['daysOfWeek'];
    $teamTime = $_POST['teamTime'];
    $maxOccupancy = $_POST['maxOccupancy'];
    $trainer_id = $_POST['trainer'];

    // Log received variables for debugging
    error_log("Received variables: teamService_id = $teamService_id, teamServiceName = $teamServiceName, daysOfWeek = $daysOfWeek, teamTime = $teamTime, maxOccupancy = $maxOccupancy, trainer_id = $trainer_id");

    try {
        // Update query for team services
        $stmt = $pdo->prepare("UPDATE team_services 
            SET 
                service_name = :service_name,
                days_of_week = :days_of_week,
                times = :times,
                max_occupancy = :max_occupancy,
                trainer_id = :trainer_id
            WHERE id = :id");

        $stmt->bindParam(':id', $teamService_id, PDO::PARAM_INT);
        $stmt->bindParam(':service_name', $teamServiceName);
        $stmt->bindParam(':days_of_week', $daysOfWeek);
        $stmt->bindParam(':times', $teamTime);
        $stmt->bindParam(':max_occupancy', $maxOccupancy, PDO::PARAM_INT);
        $stmt->bindParam(':trainer_id', $trainer_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "received_data" => $_POST]); // Include received data on success
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update team service.", "received_data" => $_POST]); // Include received data on failure
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage(), "received_data" => $_POST]); // Include received data on exception
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request.", "received_data" => $_POST]); // Include received data if the request method is not POST
}
