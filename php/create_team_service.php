<?php
// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Retrieve data from the request
$teamServiceName = $_POST['teamServiceName'] ?? '';
$daysOfWeek = $_POST['daysOfWeek'] ?? '';
$teamTime = $_POST['teamTime'] ?? '';
$maxOccupancy = $_POST['maxOccupancy'] ?? '';
$trainerId = $_POST['trainer'] ?? '';

// Validate required fields
if (empty($teamServiceName) || empty($daysOfWeek) || empty($teamTime) || empty($maxOccupancy) || empty($trainerId)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Insert a new team service
$sql = "INSERT INTO team_services (service_name, days_of_week, times, max_occupancy, trainer_id) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param('sssii', $teamServiceName, $daysOfWeek, $teamTime, $maxOccupancy, $trainerId);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Team service created successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create team service: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare statement: ' . $conn->error]);
}

$conn->close();
?>
