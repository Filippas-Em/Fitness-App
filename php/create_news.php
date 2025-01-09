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
    $announcement = $_POST['announcement'];

    // Prepare the SQL query to insert the new news (using 'info' column as specified)
    $sql = "INSERT INTO announcements (info) VALUES (?)";
    $stmt = $pdo->prepare($sql);

    // Execute the prepared statement with the provided data
    if ($stmt->execute([$announcement])) {
        // If insertion is successful, return a success message
        echo json_encode(['success' => true, 'message' => 'News created successfully.']);
    } else {
        // If insertion fails, return a failure message
        echo json_encode(['success' => false, 'message' => 'Failed to create news.']);
    }
} else {
    // If the request method is not POST, return an error message
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
