// adding functionality to move the label when a input from a form is selected

const formInputs = document.querySelectorAll('.formInput');
formInputs.forEach((input => {
    const label = input.previousElementSibling;

    input.addEventListener('focus', () => {
        label.classList.add('moveLabel');
    });

    input.addEventListener('blur', () => {
        // Remove the class only if the input is empty
        if (!input.value) {
            label.classList.remove('move');
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
