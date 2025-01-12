function renderReservations(service, date = new Date().toISOString().split('T')[0]) {
    console.log('Service:', service);
    console.log('Date:', date);
    const serviceName = document.getElementById('serviceName')
    serviceName.value = service;
    // Send a GET request to the server with the service and date as query parameters
    $.ajax({
        url: `php/getServiceDetails.php?service_name=${service}&date=${date}`, // Use GET with query parameters
        method: 'GET',
        success: function(data) {
            console.log("Response:", data);  // This is already an object now, no need to parse.
            
            if (data) {
                renderTimeSlots(data);  // Pass the data as it is
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}


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

function formatTime(hour) {
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
}


// Add an event listener for the button
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

// Example renderReservations function

function bookReservation(serviceName, date, timeSlot, userId) {
    // Prepare the data to send
    const reservationData = {
        service_name: serviceName,
        date: date,
        time_slot: timeSlot,
        user_id: userId,
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

    // Add user ID
    const userId = 2; // Replace with the actual user ID
    reservationData.user_id = userId;

    // Call the bookReservation function
    bookReservation(
        reservationData.service_name,
        reservationData.date,
        reservationData.time_slot,
        reservationData.user_id
    );
});

  