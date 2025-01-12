// Function to get user ID from the hidden input
function getUserIdFromSession() {
    const userId = document.getElementById('userIdInput').value;
    return userId;
}

// Function to render reservations based on the service and date
function renderReservations(service, date = new Date().toISOString().split('T')[0]) {
    console.log('Service:', service);
    console.log('Date:', date);
    const serviceName = document.getElementById('serviceName');
    serviceName.value = service;

    // Send a GET request to the server with the service and date as query parameters
    $.ajax({
        url: `php/getServiceDetails.php?service_name=${service}&date=${date}`,
        method: 'GET',
        success: function(data) {
            console.log("Response:", data);

            if (data) {
                renderTimeSlots(data);  // Pass the data as it is
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// Function to render available time slots
function renderTimeSlots(data) {
    console.log("data", data);

    // Update the .title h3 text content with the service name
    $('.title').text(data.service_name || 'Default Service Name');

    // Get the two groups inside the time picker
    let firstGroup = $('.timePicker .group').first();
    let secondGroup = $('.timePicker .group').last();

    // Clear previous content inside both groups
    firstGroup.empty();
    secondGroup.empty();

    // Ensure date is defined, fallback to today's date
    const date = data.date || new Date().toLocaleDateString('en-GB'); // Default to DD/MM/YYYY format

    if (data.days_of_week && data.days_of_week.toLowerCase() !== "everyday") {
        // Team service with specific days
        const availableDays = data.days_of_week.split(',').map(day => day.trim().toLowerCase());
        const currentDay = new Date(date).toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

        if (availableDays.includes(currentDay)) {
            // Render the time slot if the current day is in the available days
            const reservationData = JSON.stringify({
                service_name: data.service_name || 'Default Service Name',
                date: date,
                time_slot: data.times,
                max_occupancy: data.max_occupancy,
            });
        
            firstGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${data.times}</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <p>Θέσεις: 0/${data.max_occupancy}</p>
                        <button class="bookButton" data-reservation='${reservationData}'>Κράτηση</button>
                    </div>
                </div>
            `);
        } else {
            // Show a message if no slots are available for the current day
            firstGroup.append(`
                <p>The program is only available at ${data.days_of_week}</p>
            `);
        }
    } else {
        // Solo service or "everyday" service
        let times = generateTimeSlots();

        // Split the time slots into two groups
        let firstHalf = times.slice(0, 8);  // First 8 time slots for the first group
        let secondHalf = times.slice(8);   // Remaining 8 time slots for the second group

        // Append the first half of time slots to the first group
        firstHalf.forEach(function (timeSlot) {
            const reservationData = JSON.stringify({
                service_name: data.service_name || 'Default Service Name',
                date: date,
                time_slot: timeSlot,
            });
        
            firstGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${timeSlot}</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <button class="bookButton" data-reservation='${reservationData}'>
                            Κράτηση
                        </button>
                    </div>
                </div>
            `);
        });
        

        // Append the second half of time slots to the second group
        secondHalf.forEach(function (timeSlot) {
            const reservationData = JSON.stringify({
                service_name: data.service_name || 'Default Service Name',
                date: date,
                time_slot: timeSlot,
            });
        
            secondGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${timeSlot}</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <button class="bookButton" data-reservation='${reservationData}'>
                            Κράτηση
                        </button>
                    </div>
                </div>
            `);
        });
        
    }
}

// Function to generate time slots
function generateTimeSlots() {
    let times = [];
    let startTime = 7;
    for (let i = 0; i < 16; i++) {
        let endTime = startTime + 1;
        let timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;
        times.push(timeSlot);
        startTime = endTime;
    }
    return times;
}

// Function to format time into a readable string
function formatTime(hour) {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}

// Event listener for the check button
document.getElementById('checkButton').addEventListener('click', function () {
    // Get the service name from the hidden input
    const serviceName = document.getElementById('serviceName').value;

    // Get the selected date from the date picker
    const selectedDate = document.getElementById('datePicker').value;

    // Validate the date input
    if (!selectedDate) {
        alert("Παρακαλώ επιλέξτε ημερομηνία.");
        return;
    }

    // Call the renderReservations function with the service name and selected date
    renderReservations(serviceName, selectedDate);
});

// Function to book a reservation
function bookReservation(serviceName, date, timeSlot, userId) {
    // Prepare the data to send
    const reservationData = {
        service_name: serviceName,
        date: date,
        time_slot: timeSlot,
        user_id: userId,  // Include the dynamic user ID
    };
    console.log("bookReservation Data: ", reservationData);

    // Send the data via AJAX POST
    $.ajax({
        url: 'php/bookReservation.php',
        method: 'POST',
        contentType: 'application/json', // Specify JSON content
        data: JSON.stringify(reservationData), // Convert to JSON string
        success: function (response) {
            console.log('Reservation response:', response);
            try {
                const jsonResponse = JSON.parse(response); // Parse the response
                if (jsonResponse.success) {
                    alert('Η κράτηση ολοκληρώθηκε με επιτυχία!');
                } else {
                    alert('Υπήρξε πρόβλημα με την κράτηση. Παρακαλώ δοκιμάστε ξανά.');
                }
            } catch (e) {
                console.error('Error parsing response:', e);
                alert('Υπήρξε σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            alert('Υπήρξε σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
        },
    });
}

// Attach event listeners to buttons dynamically
$(document).on('click', '.bookButton', function () {
    // Parse the reservation data from the button's data-reservation attribute
    const reservationData = JSON.parse($(this).attr('data-reservation'));

    // Get user ID from session
    const userId = getUserIdFromSession();
    if (!userId) {
        alert('Please log in to make a reservation.');
        return;  // Exit if no user ID is found
    }

    // Add user ID to reservation data
    reservationData.user_id = userId;

    // Call the bookReservation function
    bookReservation(
        reservationData.service_name,
        reservationData.date,
        reservationData.time_slot,
        reservationData.user_id
    );
});


// Function to render reservation history based on a selected date
function renderReservationHistory(date = new Date().toISOString().split('T')[0]) {
    const userId = getUserIdFromSession();  // Get the user ID
    if (!userId) {
        alert('Please log in to view your reservation history.');
        return;
    }

    // Send a GET request to fetch reservations made by the user
    $.ajax({
        url: `php/get_reservations.php?user_id=${userId}&date=${date}`,
        method: 'GET',
        success: function(response) {
            console.log("Reservation History:", response);

            // Parse response data if it's a string
            let data = response;
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data); // Try parsing if it's a string
                } catch (error) {
                    console.error('Error parsing reservation data:', error);
                    alert('There was an error processing your reservation data.');
                    return;
                }
            }

            // Check if data is an array and render the history slots
            if (Array.isArray(data)) {
                renderHistorySlots(data);
            } else {
                alert('No reservations found for this date.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('There was an error fetching your reservation history.');
        }
    });
}


// Function to render reservation history with dynamic slots
function renderHistorySlots(data) {
    console.log("Rendering reservation history:", data);

    // Get the two groups inside the time picker
    let firstGroup = $('.timePicker .group').first();
    let secondGroup = $('.timePicker .group').last();

    // Clear previous content inside both groups
    firstGroup.empty();
    secondGroup.empty();

    // Get the current date
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Populate the first group first
    let firstGroupCount = 0;
    data.forEach(reservation => {
        // Only render reservations with a date that has not passed and are not canceled
        if (reservation.reservation_date >= currentDate && reservation.canceled === 0) {
            const serviceName = reservation.solo_service_name || reservation.team_service_name || 'Default Service Name';
            const statusText = reservation.canceled === 1 ? 'Cancelled' : 'Active';

            const slotHTML = `
                <div class="timeSlot">
                    <div class="slotTime">
                        <p><strong>Service:</strong> ${serviceName}</p>
                        <p><strong>Time Slot:</strong> ${reservation.time_slot}</p>
                        <p><strong>Date:</strong> ${reservation.reservation_date}</p>
                        <p><strong>Status:</strong> ${statusText}</p>
                    </div>
                    <div class="slotBook">
                        ${
                            reservation.canceled === 0
                                ? `<button class="cancelButton" data-reservation-id="${reservation.reservation_id}">
                                    Ακύρωση
                                  </button>`
                                : '<p>Reservation cannot be canceled</p>'
                        }
                    </div>
                </div>
            `;

            // Fill the first group first, then the second group
            if (firstGroupCount < 8) {
                firstGroup.append(slotHTML);
                firstGroupCount++;
            } else {
                secondGroup.append(slotHTML);
            }
        }
    });

    // Add a message if no valid reservations exist
    if (firstGroup.children().length === 0 && secondGroup.children().length === 0) {
        firstGroup.append(`<p>No upcoming reservations found.</p>`);
    }
}







// Event listener for the "History" button
document.getElementById('historyButton').addEventListener('click', function() {
    // Get the selected date from the date picker (if needed)
    // const selectedDate = document.getElementById('historyDatePicker').value;

    // Call the renderReservationHistory function with the selected date
    renderReservationHistory();
});

// Function to cancel a reservation
function cancelReservation(reservationId) {
    const userId = getUserIdFromSession(); // Get user ID

    if (!userId) {
        alert('Please log in to cancel a reservation.');
        return;
    }

    // Send a POST request to cancel the reservation
    $.ajax({
        url: 'php/cancelReservation.php',
        method: 'POST',
        contentType: 'application/json',  // Specify JSON content
        data: JSON.stringify({
            reservation_id: reservationId,  // Pass the reservation ID to cancel
            user_id: userId,
        }),
        success: function(response) {
            console.log('Cancel reservation response:', response);
            if (response.success) {
                alert('Η κράτηση ακυρώθηκε με επιτυχία!');
                // Reload the history after cancellation
                renderReservationHistory();
            } else {
                alert('Υπήρξε πρόβλημα με την ακύρωση. Παρακαλώ δοκιμάστε ξανά.');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            alert('Υπήρξε σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
        },
    });
}


// Attach event listeners to cancel buttons dynamically
$(document).on('click', '.cancelButton', function() {
    // Get reservation ID from the button's data-reservation-id attribute
    const reservationId = $(this).data('reservation-id');

    // Call the cancelReservation function
    cancelReservation(reservationId);
});
