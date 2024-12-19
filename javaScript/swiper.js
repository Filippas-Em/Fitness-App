// Initialize Swiper after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        loop: false,
        autoplay: {
            delay: 5000, 
            disableOnInteraction: false, 
          },
        speed: 1200,
        slidesPerView: 1,  
        navigation: {
            nextEl: '.swiper-button-next',  
            prevEl: '.swiper-button-prev'   
        },
        pagination: {
            el: '.swiper-pagination',       
            clickable: true
        }
        
    });
});