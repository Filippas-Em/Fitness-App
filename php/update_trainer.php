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
    if (
        empty($_POST['trainer_id']) ||
        empty($_POST['trainerName']) ||
        empty($_POST['trainerSurname']) ||
        empty($_POST['trainerSpecialty'])
    ) {
        $response = [
            "success" => false,
            "message" => "All fields are required.",
            "received_data" => $_POST // Include the received POST data in the response
        ];
        echo json_encode($response);
        exit;
    }

    // Assign variables from POST data
    $trainer_id = $_POST['trainer_id'];
    $name = $_POST['trainerName'];
    $surname = $_POST['trainerSurname'];
    $specialty = $_POST['trainerSpecialty'];

    // Log the received variables for debugging
    error_log("Received variables: trainer_id = $trainer_id, name = $name, surname = $surname, specialty = $specialty");

    try {
        // Update query for trainers
        $stmt = $pdo->prepare("UPDATE trainers 
            SET 
                name = :name,
                surname = :surname,
                specialty = :specialty
            WHERE id = :id");

        $stmt->bindParam(':id', $trainer_id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':specialty', $specialty);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "received_data" => $_POST]); // Include received data on success
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update trainer.", "received_data" => $_POST]); // Include received data on failure
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage(), "received_data" => $_POST]); // Include received data on exception
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request.", "received_data" => $_POST]); // Include received data if the request method is not POST
}
?>
