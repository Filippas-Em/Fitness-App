// Get DOM elements
const countryInput = document.getElementById('country');
const cityInput = document.getElementById('city');
const countryDropdown = countryInput.nextElementSibling;
const cityDropdown = cityInput.nextElementSibling;

// Store fetched data
let countries = [];
let cities = [];

// Fetch countries on page load
async function fetchCountries() {
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const data = await response.json();
        countries = data.data.map(country => ({
            name: country.country,
            cities: country.cities
        }));
        
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Initialize the dropdowns
function initializeDropdowns() {
    // Disable city input initially
    cityInput.disabled = true;
    
    // Add event listeners for country input
    countryInput.addEventListener('focus', showCountryDropdown);
    countryInput.addEventListener('input', filterCountries);
    
    // Add event listeners for city input
    cityInput.addEventListener('focus', showCityDropdown);
    cityInput.addEventListener('input', filterCities);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.autoComplete')) {
            countryDropdown.style.display = 'none';
            cityDropdown.style.display = 'none';
        }
    });
}

// Show country dropdown
function showCountryDropdown() {
    countryDropdown.style.display = 'block';
    updateCountryDropdown(countries);
}

// Filter countries based on input
function filterCountries() {
    const searchText = countryInput.value.toLowerCase();
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(searchText)
    );
    updateCountryDropdown(filteredCountries);
}

// Update country dropdown UI
function updateCountryDropdown(filteredCountries) {
    countryDropdown.innerHTML = '';
    filteredCountries.forEach(country => {
        const li = document.createElement('li');
        li.textContent = country.name;
        li.addEventListener('click', () => selectCountry(country));
        countryDropdown.appendChild(li);
    });
}

// Handle country selection
function selectCountry(country) {
    countryInput.value = country.name;
    countryDropdown.style.display = 'none';
    
    // Enable city input and store cities for selected country
    cityInput.disabled = false;
    cityInput.value = '';
    cities = country.cities;
}

// Show city dropdown
function showCityDropdown() {
    if (!countryInput.value) {
        alert('Please select a country first');
        return;
    }
    cityDropdown.style.display = 'block';
    updateCityDropdown(cities);
}

// Filter cities based on input
function filterCities() {
    const searchText = cityInput.value.toLowerCase();
    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(searchText)
    );
    updateCityDropdown(filteredCities);
}

// Update city dropdown UI
function updateCityDropdown(filteredCities) {
    cityDropdown.innerHTML = '';
    filteredCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () => selectCity(city));
        cityDropdown.appendChild(li);
    });
}

// Handle city selection
function selectCity(city) {
    cityInput.value = city;
    cityDropdown.style.display = 'none';
}

// Add some basic styles for the dropdown
const style = document.createElement('style');
style.textContent = `
    .autoComplete {
        position: relative;
    }
    
    #dropdown-list {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        max-height: 200px;
        overflow-y: auto;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 0;
        margin: 0;
        list-style: none;
        z-index: 1000;
    }
    
    #dropdown-list li {
        padding: 8px 12px;
        cursor: pointer;
    }
    
    #dropdown-list li:hover {
        background-color: #f0f0f0;
    }
`;
document.head.appendChild(style);

// Initialize the functionality
document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
    initializeDropdowns();
});