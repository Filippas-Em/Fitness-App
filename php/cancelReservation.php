<?php
// Set the header to handle JSON response
header('Content-Type: application/json');

// Database connection settings
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

// Create a connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the input JSON data
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Validate the input
    if (!isset($inputData['reservation_id']) || !isset($inputData['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input data.']);
        exit;
    }

    $reservationId = intval($inputData['reservation_id']);
    $userId = intval($inputData['user_id']);

    // SQL query to update the reservation status
    $query = "UPDATE reservations 
              SET canceled = 1 
              WHERE reservation_id = ? AND user_id = ? AND canceled = 0";

    // Prepare the statement for the reservation update
    if ($stmt = $conn->prepare($query)) {
        // Bind parameters
        $stmt->bind_param('ii', $reservationId, $userId);

        // Execute the query
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                // Successfully canceled reservation
                // Update the cancellation count in the users table
                $updateCountQuery = "UPDATE users SET cancellation_count = cancellation_count + 1 WHERE id = ?";
                
                if ($updateStmt = $conn->prepare($updateCountQuery)) {
                    $updateStmt->bind_param('i', $userId);
                    if ($updateStmt->execute()) {
                        // Success response for both reservation cancellation and update of cancellation count
                        echo json_encode(['success' => true, 'message' => 'Reservation canceled and cancellation count updated.']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to update cancellation count.']);
                    }
                    $updateStmt->close();
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to prepare update query for cancellation count.']);
                }
            } else {
                // No rows updated in the reservations table
                echo json_encode(['success' => false, 'message' => 'Unable to cancel reservation. It might already be canceled or invalid.']);
            }
        } else {
            // Query execution failed for reservation update
            echo json_encode(['success' => false, 'message' => 'Failed to execute query for reservation update.']);
        }

        // Close the reservation statement
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare query for reservation update.']);
    }

    // Close the database connection
    $conn->close();
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
