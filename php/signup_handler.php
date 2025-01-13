<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gymdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo "Connection failed: " . $conn->connect_error;
    exit;
}

$name = $conn->real_escape_string($_POST['name']);
$surname = $conn->real_escape_string($_POST['surname']);
$country = $conn->real_escape_string($_POST['country']);
$address = $conn->real_escape_string($_POST['address']);
$city = $conn->real_escape_string($_POST['city']);
$email = $conn->real_escape_string($_POST['email']);
$username = $conn->real_escape_string($_POST['username']);
$password = password_hash($_POST['sPassword'], PASSWORD_BCRYPT);

$sql = "INSERT INTO queue (name, surname, country, address, city, email, username, password) 
        VALUES ('$name', '$surname', '$country', '$address', '$city', '$email', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Your signup is awaiting admin approval.";
} else {
    http_response_code(500);
    echo "Error: " . $conn->error;
}

$conn->close();
?>