function renderReservations(service, date = new Date().toISOString().split('T')[0]) {
    console.log('Service:', service);
    console.log('Date:', date);
    
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
    console.log("data",data);
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

    // Check if the service is a team service (days_of_week present)
    if (data.days_of_week) {
        let availableDays = data.days_of_week.split(',');

        availableDays.forEach(function (day) {
            firstGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${day} - 07:00 - 08:00</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <p>Θέσεις: 12/64</p>
                        <button>Κράτηση</button>
                    </div>
                </div>
            `);
        });
    } else {
        // If days_of_week is missing, it is a solo service
        let times = generateTimeSlots();

        // Split the time slots into two groups
        let firstHalf = times.slice(0, 8);  // First 8 time slots for the first group
        let secondHalf = times.slice(8);   // Remaining 8 time slots for the second group

        // Append the first half of time slots to the first group
        firstHalf.forEach(function (timeSlot) {
            firstGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${timeSlot}</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <p>Θέσεις: 12/64</p>
                        <button>Κράτηση</button>
                    </div>
                </div>
            `);
        });

        // Append the second half of time slots to the second group
        secondHalf.forEach(function (timeSlot) {
            secondGroup.append(`
                <div class="timeSlot">
                    <div class="slotTime">
                        <p>${timeSlot}</p>
                        <p>${date}</p>
                    </div>
                    <div class="slotBook">
                        <p>Θέσεις: 12/64</p>
                        <button>Κράτηση</button>
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
