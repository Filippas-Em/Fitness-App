<?php
header('Content-Type: application/json');


$data = json_decode(file_get_contents('php://input'), true);


if (!isset($data['name']) || !isset($data['surname']) || !isset($data['specialty'])) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

$name = $data['name'];
$surname = $data['surname'];
$specialty = $data['specialty'];

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "INSERT INTO trainers (name, surname, specialty) VALUES (:name, :surname, :specialty)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':surname', $surname);
    $stmt->bindParam(':specialty', $specialty);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Trainer added successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error inserting trainer data.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
