<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gymdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$surname = $_POST['surname'];
$country = $_POST['country'];
$address = $_POST['address'];
$city = $_POST['city'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = password_hash($_POST['sPassword'], PASSWORD_BCRYPT);

$sql = "INSERT INTO queue (name, surname, country, address, city, email, username, password)
        VALUES ('$name', '$surname', '$country', '$address', '$city', '$email', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Your signup is awaiting admin approval.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
