<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $trainer_id = $_GET['id'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM trainers WHERE id = :id");
        $stmt->bindParam(':id', $trainer_id, PDO::PARAM_INT);
        $stmt->execute();
        $trainer = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($trainer) {
            echo json_encode($trainer);
        } else {
            echo json_encode(["error" => "trainer not found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
    }
} else {
    echo json_encode([
        "error" => "Invalid request.",
        "method" => $_SERVER['REQUEST_METHOD'], // Show the HTTP method
        "query_params" => $_GET,               // Show the query parameters received
        "expected" => "GET with 'id' parameter" // Indicate what the script expected
    ]);
    exit;}
?>
