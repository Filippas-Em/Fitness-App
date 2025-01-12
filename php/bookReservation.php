<?php
// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]));
}

// Decode the JSON input
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Validate the input
$serviceName = $data['service_name'] ?? null;
$date = $data['date'] ?? null;
$timeSlot = $data['time_slot'] ?? null;
$userId = $data['user_id'] ?? null;

if (!$serviceName || !$date || !$timeSlot || !$userId) {
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields.',
        'data' => $data // Return the original data
    ]);
    exit;
}

// Check if the service is solo or team
try {
    // Check if the service is solo
    $query = "SELECT service_name FROM solo_services WHERE service_name = :serviceName";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':serviceName', $serviceName);
    $stmt->execute();
    $isSoloService = $stmt->rowCount() > 0;

    // Determine which service name column to use
    $soloServiceName = $isSoloService ? $serviceName : null;
    $teamServiceName = !$isSoloService ? $serviceName : null;

    // Insert the reservation into the database
    $sql = "INSERT INTO reservations (solo_service_name, team_service_name, user_id, max_occupancy, reservation_date, time_slot, canceled) 
            VALUES (:soloServiceName, :teamServiceName, :userId, :maxOccupancy, :reservationDate, :timeSlot, 0)";
    
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $maxOccupancy = 1; // Adjust this if you have specific logic for max occupancy
    $stmt->bindParam(':soloServiceName', $soloServiceName);
    $stmt->bindParam(':teamServiceName', $teamServiceName);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':maxOccupancy', $maxOccupancy);
    $stmt->bindParam(':reservationDate', $date);
    $stmt->bindParam(':timeSlot', $timeSlot);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([ 
            'success' => false, 
            'error' => 'Failed to create reservation.', 
            'data' => $data // Return the original data
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'data' => $data // Return the original data
    ]);
}

?>
