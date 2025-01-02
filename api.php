<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'gymdatabase';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $endpoint = $_GET['endpoint'] ?? '';

    
    error_log("Requested endpoint: " . $endpoint);

    $query = '';

    if ($endpoint === 'requests') {
        $query = "SELECT * FROM queue";
    } elseif ($endpoint === 'users') {
        $query = "SELECT * FROM users";
    } elseif ($endpoint === 'trainers') {
        $query = "SELECT * FROM trainers";
    } elseif ($endpoint === 'deleteRequest') {  
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $requestId = $input['id'] ?? null;

            
            error_log("Delete request data: " . json_encode($input));

            if ($requestId) {
                $stmt = $pdo->prepare("DELETE FROM queue WHERE id = :id");
                $stmt->bindParam(':id', $requestId, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Request deleted successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete request']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid request ID']);
            }
            exit;
        } else {
            http_response_code(405); 
            echo json_encode(['error' => 'Invalid request method']);
            exit;
        }
    } elseif ($endpoint === 'deleteUser') {  
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $userId = $input['id'] ?? null;

            
            error_log("Delete user data: " . json_encode($input));

            if ($userId) {
                $stmt = $pdo->prepare("DELETE FROM users WHERE id = :id");
                $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete user']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
            }
            exit;
        } else {
            http_response_code(405); 
            echo json_encode(['error' => 'Invalid request method']);
            exit;
        }
    } elseif ($endpoint === 'deleteItem') {  
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $table = $input['table'] ?? null;
            $itemId = $input['id'] ?? null;

           
            error_log("Delete item data: " . json_encode($input));

            if ($table && $itemId) {
               
                error_log("Deleting item from table: " . $table . " with ID: " . $itemId);

                $stmt = $pdo->prepare("DELETE FROM $table WHERE id = :id");
                $stmt->bindParam(':id', $itemId, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    echo json_encode(['success' => true, 'message' => 'Item deleted successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to delete item']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid table or item ID']);
            }
            exit;
        } else {
            http_response_code(405); 
            echo json_encode(['error' => 'Invalid request method']);
            exit;
        }
    } elseif ($endpoint === "services") {
        $soloServices = $pdo->query("SELECT * FROM solo_services")->fetchAll(PDO::FETCH_ASSOC);
        $teamServices = $pdo->query("SELECT ts.*, t.name as trainer_name, t.surname as trainer_surname 
                                    FROM team_services ts 
                                    JOIN trainers t ON ts.trainer_id = t.id")->fetchAll(PDO::FETCH_ASSOC);
        
        
        error_log("Solo services: " . json_encode($soloServices));
        error_log("Team services: " . json_encode($teamServices));

        echo json_encode([
            "solo_services" => $soloServices,
            "team_services" => $teamServices,
        ]);
        exit;
    } elseif ($endpoint === 'news') {
        $query = "SELECT * FROM announcements";
    } elseif ($endpoint === 'discounts') {
        $query = "SELECT * FROM discounts";
    } elseif ($endpoint === 'addUser') {  
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $input = json_decode(file_get_contents('php://input'), true);
            $requestId = $input['id'] ?? null;

            
            error_log("Add user data: " . json_encode($input));

            if ($requestId) {
                $stmt = $pdo->prepare("SELECT * FROM queue WHERE id = :id");
                $stmt->bindParam(':id', $requestId, PDO::PARAM_INT);
                $stmt->execute();
                $request = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($request) {
                    $role = $input['role'] ?? 'user'; 

                    $stmt = $pdo->prepare("INSERT INTO users (name, surname, country, address, city, email, username, password, role) 
                                           VALUES (:name, :surname, :country, :address, :city, :email, :username, :password, :role)");
                    $stmt->bindParam(':name', $request['name']);
                    $stmt->bindParam(':surname', $request['surname']);
                    $stmt->bindParam(':country', $request['country']);
                    $stmt->bindParam(':address', $request['address']);
                    $stmt->bindParam(':city', $request['city']);
                    $stmt->bindParam(':email', $request['email']);
                    $stmt->bindParam(':username', $request['username']);
                    $stmt->bindParam(':password', $request['password']);
                    $stmt->bindParam(':role', $role);

                    if ($stmt->execute()) {
                        $stmt = $pdo->prepare("DELETE FROM queue WHERE id = :id");
                        $stmt->bindParam(':id', $requestId, PDO::PARAM_INT);
                        $stmt->execute();

                        echo json_encode(['success' => true, 'message' => 'User added successfully']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to add user']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Request not found']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid request ID']);
            }
            exit;
        } else {
            http_response_code(405); 
            echo json_encode(['error' => 'Invalid request method']);
            exit;
        }
    }

    if ($query) {
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        
        error_log("Data returned from query: " . json_encode($data));

        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'Invalid endpoint']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
