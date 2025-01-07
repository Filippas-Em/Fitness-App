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

function showTrainer(){
    event.preventDefault();
    trainerForm.classList.toggle('hidden');
    console.log('showTrainer');
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

