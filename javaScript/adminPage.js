// adding functionality to move the label when a input from a form is selected
console.log('adminPage.js is connected');
const formInputs = document.querySelectorAll('.formInput');
formInputs.forEach((input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', () => {
        label.classList.add('moveLabel');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('moveLabel');
        }
    });
})); 


const filterToggles = document.querySelectorAll('.filterToggle');
const filterTab = document.querySelector('.adminMenu');
const mainContent = document.querySelector('.adminContent');
const filterIcon = document.querySelector('#filterIcon');

filterToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    filterTab.classList.toggle('hidden');
    mainContent.classList.toggle('move');
    filterIcon.classList.toggle('none');
  });
});

const dataCards = document.querySelectorAll('.dataCard');

dataCards.forEach((card) => {
    const expandBtn = card.querySelector('.expand');
    expandBtn.addEventListener('click', () => {
        const secondaryData = card.querySelectorAll('.secondaryData');

        secondaryData.forEach((data) => {
            data.classList.toggle('expanded');
        });
        expandBtn.classList.toggle('rotate');
    });
});

const trainerForm = document.querySelector('.trainerForm');
function showUser(userId = null) {
    const userForm = document.querySelector(".userFormModal");
    const userInputs = document.querySelectorAll("#userName, #userSurname, #userEmail, #userCountry, #userCity, #userAddress, #userUsername, #userRole, #user_id");

    if (userId) {
        fetch(`php/get_user.php?id=${userId}`)
            .then(response => response.json())
            .then(userData => {
                if (userData) {
                    // Pre-fill inputs
                    userInputs.forEach(input => {
                        const key = input.id === "user_id" 
                            ? "id" // Map user_id input to the id field from userData
                            : input.id.replace(/^user/, "").toLowerCase(); // Convert other IDs to match the userData key
                        
                        input.value = userData[key] || ""; // Populate the input with the corresponding value
                    });

                    // Move labels for filled inputs
                    moveLabels(userInputs);

                    // Show the form
                    userForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch user data.");
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                alert("An error occurred while fetching user data.");
            });
    } else {
        // Clear inputs and toggle visibility
        userInputs.forEach(input => {
            input.value = "";
        });

        moveLabels(userInputs);
        userForm.classList.toggle("hidden");
    }
}



function showTrainer(trainerId = null) {
    console.log('showTrainer function called');
    const trainerForm = document.querySelector(".trainerFormModal");
    const trainerInputs = document.querySelectorAll("#trainerName, #trainerSurname, #trainerSpecialty, #trainer_id");

    if (trainerId) {
        fetch(`php/get_trainer.php?id=${trainerId}`)
            .then((response) => response.json())
            .then((trainerData) => {
                if (trainerData) {
                    // Pre-fill inputs
                    trainerInputs.forEach(input => {
                        const key = input.id === "trainer_id" 
                            ? "id" // Map trainer_id input to the id field from trainerData
                            : input.id.replace(/^trainer/, "").toLowerCase(); // Convert other IDs to match the trainerData key
                        
                        input.value = trainerData[key] || ""; // Populate the input with the corresponding value
                    });

                    // Move labels for filled inputs
                    moveLabels(trainerInputs); // Make sure to call moveLabels here to adjust the labels' position

                    // Show the form
                    trainerForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch trainer data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching trainer data:", error);
                alert("An error occurred while fetching trainer data.");
            });
    } else {
        // Clear inputs and toggle visibility
        trainerInputs.forEach(input => {
            input.value = "";
        });

        moveLabels(trainerInputs); // Move the labels even when clearing the form

        trainerForm.classList.toggle("hidden");
    }
}



function showTeamServices(serviceId = null, redirect = "services") {
    console.log('showTeamServices function called');
    const tsForm = document.querySelector(".teamServicesModal"); // Ensure the form has this class
    const tsName = document.querySelector("#teamServiceName");
    const tsDays = document.querySelector("#daysOfWeek");
    const tsTime = document.querySelector("#teamTime");
    const tsMaxOccupancy = document.querySelector("#maxOccupancy");
    const tsTrainer = document.querySelector("#trainer");
    const teamService_id = document.querySelector("#teamService_id");
    const tsRedirect = document.querySelector("#redirect");

    if (serviceId) {
        // Fetch service details from the server
        fetch(`php/get_team_service.php?id=${serviceId}`)
            .then((response) => response.json())
            .then((serviceData) => {
                if (serviceData) {
                    // Pre-fill form fields
                    tsName.value = serviceData.service_name || "";
                    tsDays.value = serviceData.days_of_week || "";
                    tsTime.value = serviceData.times || "";
                    tsMaxOccupancy.value = serviceData.max_occupancy || "";
                    tsTrainer.value = serviceData.trainer_id || "";
                    teamService_id.value = serviceData.id || "";
                    tsRedirect.value = redirect || ""; // Ensure the redirect value is set as expected

                    // Move labels for filled inputs
                    moveLabels([tsName, tsDays, tsTime, tsMaxOccupancy, tsTrainer, teamService_id, tsRedirect]);

                    // Show the form
                    tsForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch service data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching service data:", error);
                alert("An error occurred while fetching service data.");
            });
    } else {
        // Clear inputs and toggle visibility
        tsName.value = "";
        tsDays.value = "";
        tsTime.value = "";
        tsMaxOccupancy.value = "";
        tsTrainer.value = "";
        teamService_id.value = "";
        tsRedirect.value = redirect || "";

        // Move labels for cleared inputs
        moveLabels([tsName, tsDays, tsTime, tsMaxOccupancy, tsTrainer, teamService_id, tsRedirect]);

        tsForm.classList.toggle("hidden");
    }
}


function showNews(announcementId = null) {
    console.log('announcementId function called');
    const newsForm = document.querySelector(".newsModal"); // Ensure the form has this class
    const newsMessage = document.querySelector("#announcement");
    const newsId = document.querySelector("#news_id");

    if (announcementId) {
        // Fetch user details from the server
        fetch(`php/get_news.php?id=${announcementId}`)
            .then((response) => response.json())
            .then((newsData) => {
                if (newsData) {
                    // Pre-fill form fields
                    newsMessage.value = newsData.info || "";
                    newsId.value = newsData.id || "";
                    // Show the form
                    newsForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch user data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                alert("An error occurred while fetching user data.");
            });
    } else {
        // No user ID provided, clear the form and toggle visibility
        trainerName.value = "";
        trainerSurname.value = "";
        trainerSpecialty.value = "";
        trainer_id.value = "";

        // Toggle form visibility
        newsForm.classList.toggle("hidden");
    }
}
function showDiscounts(discountId = null) {
    console.log('announcementId function called');
    const discountsForm = document.querySelector(".discountsModal"); // Ensure the form has this class
    const discountMessage = document.querySelector("#discount");
    const discount_id = document.querySelector("#discount_id");

    if (discountId) {
        // Fetch user details from the server
        fetch(`php/get_discounts.php?id=${discountId}`)
            .then((response) => response.json())
            .then((discountsData) => {
                if (discountsData) {
                    // Pre-fill form fields
                    discountMessage.value = discountsData.info || "";
                    discount_id.value = discountsData.id || "";
                    // Show the form
                    discountsForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch user data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                alert("An error occurred while fetching user data.");
            });
    } else {
        // No user ID provided, clear the form and toggle visibility
        trainerName.value = "";
        trainerSurname.value = "";
        trainerSpecialty.value = "";
        trainer_id.value = "";

        // Toggle form visibility
        discountsForm.classList.toggle("hidden");
    }
}

function showSoloService(announcementId = null) {
    console.log('showSoloService function called');
    const soloServiceForm = document.querySelector(".soloServicesModal"); // Ensure the form has this class
    const serviceName = document.querySelector("#soloServiceName");
    const serviceId = document.querySelector("#service_id");

    if (announcementId) {
        // Fetch service details from the server
        fetch(`php/get_solo_service.php?id=${announcementId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((serviceData) => {
                console.log(serviceData);  // Debugging: Log the response data

                if (serviceData && serviceData.service_name && serviceData.id) {
                    // Pre-fill form fields
                    serviceName.value = serviceData.service_name || "";
                    serviceId.value = serviceData.id || "";

                    // Move the labels after populating the fields
                    moveLabels([serviceName, serviceId]);

                    // Show the form
                    soloServiceForm.classList.remove("hidden");
                } else {
                    alert("Failed to fetch valid service data.");
                }
            })
            .catch((error) => {
                console.error("Error fetching service data:", error);
                alert("An error occurred while fetching service data.");
            });
    } else {
        // No announcementId provided, clear the form and toggle visibility
        serviceName.value = "";
        serviceId.value = "";

        // Move labels to ensure they adjust properly for cleared fields
        moveLabels([serviceName, serviceId]);

        // Toggle form visibility
        soloServiceForm.classList.toggle("hidden");
    }
}




function moveLabels(inputs) {
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (input.value.trim()) {
            label?.classList.add('moveLabel');
        } else {
            label?.classList.remove('moveLabel');
        }
    });
}


    // document.addEventListener('DOMContentLoaded', () => {
    //     const trainerForm = document.querySelector('.add-Trainer');
        
    //     trainerForm.addEventListener('submit', (event) => {
    //         event.preventDefault(); 
            
    //         const formData = new FormData(trainerForm);

    //         const dataObject = {};
    //         formData.forEach((value, key) => {
    //             dataObject[key] = value;
    //         });
            
    //         fetch('php/add_trainer.php', {
    //             method: 'POST', 
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataObject), 
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 alert('Trainer added successfully!');
    //                 trainerForm.reset();
    //             } else {
    //                 alert('There was an error adding the trainer.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             alert('An error occurred. Please try again.');
    //         });
    //     });
    // });

