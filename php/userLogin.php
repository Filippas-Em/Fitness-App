<?php
session_start();  // Start the session to track the user

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gymdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Sanitize input to prevent SQL injection
    $user = $conn->real_escape_string($user);
    $pass = $conn->real_escape_string($pass);

    // Query the database to check if the username exists
    $sql = "SELECT id, username, password FROM users WHERE username = '$user'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User exists, now check the password
        $row = $result->fetch_assoc();
        if (password_verify($pass, $row['password'])) {
            // Password is correct
            $_SESSION['user_id'] = $row['id']; // Store user ID in session
            $_SESSION['username'] = $row['username']; // Store username in session
            header("Location: ../index.phtml"); // Redirect to a protected page (e.g., dashboard)
            exit();
        } else {
            // Invalid password
            echo "Invalid password.";
        }
    } else {
        // User does not exist
        echo "User not found.";
    }

    $conn->close();
}
?>
