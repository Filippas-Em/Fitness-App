const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector(".off-screen-menu");
const menuLinks = offScreenMenu.querySelectorAll('a');


hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    
    if (hamMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});


menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamMenu.classList.remove('active');
    offScreenMenu.classList.remove('active');
  });
});

// reservation filter tab functionality

$(document).ready(function () {
  $(".dropdown-toggle").on("click", function () {
      const $menu = $(this).next(".dropdown-menu"); 
      const $arrow = $(this).find(".chevIcon");
      $menu.slideToggle(); 
      $arrow.toggleClass("rotate");
  });
});



const filterToggles = document.querySelectorAll('.filterToggle');
const filterTab = document.querySelector('.options');
const mainContent = document.querySelector('.sqlData');
const filterIcon = document.querySelector('#filterIcon');

filterToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    filterTab.classList.toggle('hidden');
    mainContent.classList.toggle('move');
    filterIcon.classList.toggle('none');
  });
});

//set date for today on the date picker instead of default empty value
//put it in a new js file for the reservation page only

// const today = new Date();
// const formattedDate = today.toISOString().split("T")[0]; 
// const datePicker = document.getElementById("datePicker");
// datePicker.value = formattedDate;


const mainFormInputs = document.querySelectorAll('.userInput');
mainFormInputs.forEach((input => {
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
closeButton.addEventListener('click', () => {
    form.classList.add('hide');
});

openButton.addEventListener('click', () => {
    form.classList.remove('hide');
});

logIn.addEventListener('click', () => {
    signUpBody.classList.add('hide');
    loginBody.classList.remove('hide');
    signUp.style.backgroundColor = 'unset';
    logIn.style.backgroundColor = 'white';
});

signUp.addEventListener('click', () => {
  loginBody.classList.add('hide');
  signUpBody.classList.remove('hide');
  logIn.style.backgroundColor = 'unset';
  signUp.style.backgroundColor = 'white';
});