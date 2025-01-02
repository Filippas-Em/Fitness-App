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

