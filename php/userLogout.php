<?php
session_start();  // Start the session to access session variables

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
    // Unset session variables
    session_unset();

    // Destroy the session
    session_destroy();

    // Optionally, you can set a message for the user
    $_SESSION['message'] = 'You have successfully logged out.';

    // Redirect the user to the homepage or login page
    header('Location: ../index.phtml');
    exit();
} else {
    // If the user is not logged in, you can redirect them to the login page
    header('Location: ../index.phtml');
    exit();
}
?>
