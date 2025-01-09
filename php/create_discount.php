<?php
// Database connection setup
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the POST data
    $discount = $_POST['discount'];

    // Prepare the SQL query to insert the new discount
    $sql = "INSERT INTO discounts (info) VALUES (?)";
    $stmt = $pdo->prepare($sql);

    // Execute the prepared statement with the provided data
    if ($stmt->execute([$discount])) {
        // If insertion is successful, return a success message
        echo json_encode(['success' => true, 'message' => 'Discount created successfully.']);
    } else {
        // If insertion fails, return a failure message
        echo json_encode(['success' => false, 'message' => 'Failed to create discount.']);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
