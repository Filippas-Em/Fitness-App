// Initialize Swiper after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper', {
        loop: false,
        speed: 1200,
        slidesPerView: 1,  // Show one slide at a time
        navigation: {
            nextEl: '.swiper-button-next',  // Correct selector for next button
            prevEl: '.swiper-button-prev'   // Correct selector for prev button
        },
        pagination: {
            el: '.swiper-pagination',       // Correct selector for pagination
            clickable: true
        }
        
    });
});