<?php
$host = 'localhost';  
$user = 'root';       
$password = '';       
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'];
    $role = $_POST['role'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM queue WHERE id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $insertStmt = $pdo->prepare("INSERT INTO users (name, surname, email, country, address, city, role) 
                                         VALUES (:name, :surname, :email, :country, :address, :city, :role)");

            $insertStmt->bindParam(':name', $user['name']);
            $insertStmt->bindParam(':surname', $user['surname']);
            $insertStmt->bindParam(':email', $user['email']);
            $insertStmt->bindParam(':country', $user['country']);
            $insertStmt->bindParam(':address', $user['address']);
            $insertStmt->bindParam(':city', $user['city']);
            $insertStmt->bindParam(':role', $role);

            $insertStmt->execute();

            $deleteStmt = $pdo->prepare("DELETE FROM queue WHERE id = :user_id");
          
