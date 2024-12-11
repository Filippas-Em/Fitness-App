const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector(".off-screen-menu");
const menuLinks = offScreenMenu.querySelectorAll('a');


hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");

    // Disable or enable scrolling
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