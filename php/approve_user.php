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
        // Fetch the user data from the queue table
        $stmt = $pdo->prepare("SELECT * FROM queue WHERE id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Retrieve username and password from the queue table
            $username = $user['username'];
            $password = $user['password']; // Assuming passwords are already hashed in the queue table

            // Insert into the users table
            $insertStmt = $pdo->prepare("INSERT INTO users (name, surname, email, country, address, city, role, username, password) 
                                         VALUES (:name, :surname, :email, :country, :address, :city, :role, :username, :password)");

            $insertStmt->bindParam(':name', $user['name']);
            $insertStmt->bindParam(':surname', $user['surname']);
            $insertStmt->bindParam(':email', $user['email']);
            $insertStmt->bindParam(':country', $user['country']);
            $insertStmt->bindParam(':address', $user['address']);
            $insertStmt->bindParam(':city', $user['city']);
            $insertStmt->bindParam(':role', $role);
            $insertStmt->bindParam(':username', $username);
            $insertStmt->bindParam(':password', $password);

            $insertStmt->execute();

            // Remove the user from the queue
            $deleteStmt = $pdo->prepare("DELETE FROM queue WHERE id = :user_id");
            $deleteStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $deleteStmt->execute();

            header('Location: ../admin.php?message=success');
            exit();
        } else {
            header('Location: ../admin.php?message=user_not_found');
            exit();
        }
    } catch (PDOException $e) {
        error_log($e->getMessage());
        header('Location: ../admin.php?message=error');
        exit();
    }
} else {
    header('Location: ../admin.php');
    exit();
}

?>
