<?php
// Database connection
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

$conn = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to get service details
function getServiceDetails($service_name, $date) {
    global $conn;

    // First search in the solo_services table
    $sql = "SELECT * FROM solo_services WHERE service_name = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("s", $service_name);
    $stmt->execute();
    $result = $stmt->get_result();
    $serviceDetails = $result->fetch_assoc();

    // If not found in solo_services, search in team_services table
    if (!$serviceDetails) {
        $sql = "SELECT * FROM team_services WHERE service_name = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt === false) {
            die("Error preparing statement: " . $conn->error);
        }

        $stmt->bind_param("s", $service_name);
        $stmt->execute();
        $result = $stmt->get_result();
        $serviceDetails = $result->fetch_assoc();

        if ($serviceDetails) {
            $serviceDetails['days_of_week'] = isset($serviceDetails['days_of_week']) ? $serviceDetails['days_of_week'] : '';
        }
    } else {
        // For solo services, set days_of_week to "everyday"
        $serviceDetails['days_of_week'] = 'everyday';
    }

    // Add the date to the response
    $serviceDetails['date'] = $date;

    // Log the data to ensure it is valid before encoding
    error_log(print_r($serviceDetails, true));

    return json_encode($serviceDetails);
}


// Get parameters from the GET request
$service_name = $_GET['service_name'] ?? ''; // Use 'service_name' from the GET data
$date = $_GET['date'] ?? date('Y-m-d');      // Default to today's date if not provided

if (!$service_name) {
    echo json_encode(['error' => 'Service name is required']);
    exit;
}

// Set header for JSON response
header('Content-Type: application/json');
echo getServiceDetails($service_name, $date);
?>
