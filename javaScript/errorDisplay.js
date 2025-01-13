console.log("errorDisplay.js is connected");

// First, modify your form to prevent default submission and use AJAX
document.querySelector('.signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('php/signup_handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server response:", data); // Log server response for debugging
        showNotification(data); // Call notification function with server response
    })
    .catch(error => {
        console.error("Fetch error:", error); // Log any fetch errors
        showNotification('An error occurred while processing your request.', 'error'); // Show error notification
    });
});

// Add the CSS styles dynamically
const errorStyle = document.createElement('style');
errorStyle.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    animation: slideIn 0.5s ease-out;
}

.notification.success {
    background-color: #4caf50;
}

.notification.error {
    background-color: #f44336;
}

.notification .close-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 15px;
    font-size: 20px;
    padding: 0;
    line-height: 1;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
document.head.appendChild(errorStyle);

// Function to show notification
function showNotification(message, type = 'success') {
    console.log("showNotification runs");

    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Create message text
    const messageText = document.createElement('span');
    messageText.textContent = message;

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    };

    // Append elements
    notification.appendChild(messageText);
    notification.appendChild(closeButton);
    document.body.appendChild(notification);

    // Auto close after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }
    }, 10000);
}
