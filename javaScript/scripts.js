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
    console.log('clicked');
    filterTab.classList.toggle('hidden');
    mainContent.classList.toggle('move');
    filterIcon.classList.toggle('none');
  });
});