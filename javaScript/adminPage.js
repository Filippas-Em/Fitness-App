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
    const userForm = document.querySelector(".userFormModal"); // Ensure the form has this class
    const userName = document.querySelector("#userName");
    const userSurname = document.querySelector("#userSurname");
    const userEmail = document.querySelector("#userEmail");
    const userCountry = document.querySelector("#userCountry");
    const userCity = document.querySelector("#userCity");
    const userAddress = document.querySelector("#userAddress");
    const userUsername = document.querySelector("#userUsername");
    const userRole = document.querySelector("#userRole");
    const user_id = document.querySelector("#user_id");

    if (userId) {
        // Fetch user details from the server
        fetch(`php/get_user.php?id=${userId}`)
            .then((response) => response.json())
            .then((userData) => {
                if (userData) {
                    // Pre-fill form fields
                    userName.value = userData.name || "";
                    userSurname.value = userData.surname || "";
                    userEmail.value = userData.email || "";
                    userCountry.value = userData.country || "";
                    userCity.value = userData.city || "";
                    userAddress.value = userData.address || "";
                    userUsername.value = userData.username || "";
                    userRole.value = userData.role || "";
                    user_id.value = userData.id || "";
                    // Show the form
                    userForm.classList.remove("hidden");
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
        userName.value = "";
        userSurname.value = "";
        userEmail.value = "";
        userCountry.value = "";
        userCity.value = "";
        userAddress.value = "";

        // Toggle form visibility
        userForm.classList.toggle("hidden");
    }
}

function showTrainer(trainerId = null) {
    console.log('showTrainer function called');
    const trainerForm = document.querySelector(".trainerFormModal"); // Ensure the form has this class
    const trainerName = document.querySelector("#trainerName");
    const trainerSurname = document.querySelector("#trainerSurname");
    const trainerSpecialty = document.querySelector("#trainerSpecialty");
    const trainer_id = document.querySelector("#trainer_id");

    if (trainerId) {
        // Fetch user details from the server
        fetch(`php/get_trainer.php?id=${trainerId}`)
            .then((response) => response.json())
            .then((trainerData) => {
                if (trainerData) {
                    // Pre-fill form fields
                    trainerName.value = trainerData.name || "";
                    trainerSurname.value = trainerData.surname || "";
                    trainerSpecialty.value = trainerData.specialty || "";
                    trainer_id.value = trainerData.id || "";
                    // Show the form
                    trainerForm.classList.remove("hidden");
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
        trainerForm.classList.toggle("hidden");
    }
}
function showTeamServices(serviceId = null, redirect = "services") {
    console.log('sho team function called');
    const tsForm = document.querySelector(".teamServicesModal"); // Ensure the form has this class
    const tsName = document.querySelector("#teamServiceName");
    const tsDays = document.querySelector("#daysOfWeek");
    const tsTime = document.querySelector("#teamTime");
    const tsMaxOccupancy = document.querySelector("#maxOccupancy");
    const tsTrainerId = document.querySelector("#trainerId");
    const trainerDropdown = document.querySelector("#trainer");
    const teamService_id = document.querySelector("#teamService_id");
    const tsRedirect = document.querySelector("#redirect");

    if (serviceId) {
        // Fetch user details from the server
        fetch(`php/get_team_service.php?id=${serviceId}`)
            .then((response) => response.json())
            .then((serviceData) => {
                if (serviceData) {
                    // Pre-fill form fields
                    tsName.value = serviceData.service_name || "";
                    tsDays.value = serviceData.days_of_week || "";
                    tsTime.value = serviceData.times || "";
                    teamService_id.value = serviceData.id || "";
                    tsMaxOccupancy.value = serviceData.max_occupancy || "";
                    trainerDropdown.value = serviceData.trainer_id || "";
                    console.log("redirect to: ",redirect);
                    tsRedirect.value = redirect || "";
                    // tsTrainerId.value = serviceData.trainer_id || "";
                    // Show the form
                    tsForm.classList.remove("hidden");
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
        tsName.value = "";
        tsDays.value = "";
        tsTime.value = "";
        tsMaxOccupancy.value = "";
        trainerDropdown.value = "";
        teamService_id.value = "";

        // Toggle form visibility
        tsForm.classList.toggle("hidden");
    }
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

