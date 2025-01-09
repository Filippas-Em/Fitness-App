<?php
// Database connection details
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

// Create a database connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

header('Content-Type: application/json');

try {
    // Check if required POST fields are provided
    if (empty($_POST['trainerName']) || empty($_POST['trainerSurname']) || empty($_POST['trainerSpecialty'])) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    // Sanitize input data
    $trainerName = htmlspecialchars(trim($_POST['trainerName']));
    $trainerSurname = htmlspecialchars(trim($_POST['trainerSurname']));
    $trainerSpecialty = htmlspecialchars(trim($_POST['trainerSpecialty']));

    // Prepare SQL query to insert a new trainer
    $query = "INSERT INTO trainers (name, surname, specialty) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);

    // Bind parameters
    $stmt->bind_param('sss', $trainerName, $trainerSurname, $trainerSpecialty);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Trainer created successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create trainer.']);
    }

    // Close the statement
    $stmt->close();

} catch (Exception $e) {
    // Handle exceptions
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
