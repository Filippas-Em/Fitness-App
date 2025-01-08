const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector(".off-screen-menu");
console.log("formScripts.js is connected");



//set date for today on the date picker instead of default empty value
//put it in a new js file for the reservation page only

// const today = new Date();
// const formattedDate = today.toISOString().split("T")[0]; 
// const datePicker = document.getElementById("datePicker");
// datePicker.value = formattedDate;


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


const closeButton = document.getElementById('closeForms');
const openButton = document.querySelector('.signin');
const form = document.querySelector('.loginFroms');
const logIn = document.querySelector('.login');
const signUp = document.querySelector('.signup');
const loginBody = document.querySelector('.logInForm');
const signUpBody = document.querySelector('.signupForm');



