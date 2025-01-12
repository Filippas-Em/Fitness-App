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

// Get parameters from the URL or request
$userId = isset($_GET['user_id']) ? $_GET['user_id'] : null;
$date = isset($_GET['date']) ? $_GET['date'] : null;

if (!$userId) {
    // If user ID is not provided, return an error
    echo json_encode(['success' => false, 'error' => 'User ID is required']);
    exit;
}

// Convert date if provided (YYYY-MM-DD)
if ($date) {
    $date = date('Y-m-d', strtotime($date)); // Ensure it's in Y-m-d format
}

// Prepare the SQL query to fetch reservations for the user
$sql = "SELECT reservation_id, user_id, solo_service_name, team_service_name, max_occupancy, reservation_date, time_slot, canceled
        FROM reservations
        WHERE user_id = :user_id";

// If date is provided, filter by date to get only reservations for that day or in the future
if ($date) {
    $sql .= " AND reservation_date >= :date";
}

// Prepare the statement
$stmt = $pdo->prepare($sql);

// Bind parameters
if ($date) {
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
} else {
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
}

// Execute the statement
$stmt->execute();

// Get the result
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the reservations as JSON
echo json_encode($reservations);
?>
