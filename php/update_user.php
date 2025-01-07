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
        empty($_POST['user_id']) ||
        empty($_POST['userName']) ||
        empty($_POST['userSurname']) ||
        empty($_POST['email']) ||
        empty($_POST['userUsername']) ||
        empty($_POST['userCountry']) ||
        empty($_POST['userCity']) ||
        empty($_POST['userAddress']) ||
        empty($_POST['userRole'])
    ) {
        $response = [
            "success" => false,
            "message" => "All fields are required.",
            "received_data" => $_POST // Include the received POST data in the response
        ];
        echo json_encode($response);
        exit;
    }

    // Assign variables based on the current HTML form field names
    $user_id = $_POST['user_id'];
    $name = $_POST['userName'];         // Matches the HTML 'userName'
    $surname = $_POST['userSurname'];  // Matches the HTML 'userSurname'
    $email = $_POST['email'];          // Matches the HTML 'email'
    $username = $_POST['userUsername']; // Matches the HTML 'userUsername'
    $country = $_POST['userCountry'];  // Matches the HTML 'userCountry'
    $city = $_POST['userCity'];        // Matches the HTML 'userCity'
    $address = $_POST['userAddress'];  // Matches the HTML 'userAddress'
    $role = $_POST['userRole'];        // Matches the HTML 'userRole'

    // Log the received variables for debugging
    error_log("Received variables: user_id = $user_id, name = $name, surname = $surname, email = $email, username = $username, country = $country, city = $city, address = $address, role = $role");

    try {
        // Update query with new variables
        $stmt = $pdo->prepare("UPDATE users 
            SET 
                name = :name,
                surname = :surname,
                email = :email,
                username = :username,
                country = :country,
                city = :city,
                address = :address,
                role = :role
            WHERE id = :id");

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':country', $country);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':role', $role);
        $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "received_data" => $_POST]); // Include received data on success
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update user.", "received_data" => $_POST]); // Include received data on failure
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "An error occurred: " . $e->getMessage(), "received_data" => $_POST]); // Include received data on exception
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request.", "received_data" => $_POST]); // Include received data if the request method is not POST
}
