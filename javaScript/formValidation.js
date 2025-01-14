// Get form elements
const validForm = document.querySelector('.signupForm');
const submitBtn = document.querySelector('.submitBtn');
const inputs = validForm.querySelectorAll('.userInput');

// Validation state object
const formValidation = {
    sUsername: false,
    email: false,
    sPassword: false,
    confirmPassword: false,
    name: false,
    surname: false,
    country: false,
    city: false,
    address: false
};

// Add error message elements
function addErrorMessages() {
    document.querySelectorAll('.formInput').forEach(inputDiv => {
        if (!inputDiv.querySelector('.error-message')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '4px';
            errorDiv.style.display = 'none';
            inputDiv.appendChild(errorDiv);
        }
    });
}

// Validation rules
const validationRules = {
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
    },
    sPassword: {
        validate: (value) => value.length >= 6 && value.length <= 12,
        message: 'Password must be 6-12 characters long'
    },
    confirmPassword: {
        validate: (value) => value === document.getElementById('sPassword').value,
        message: 'Passwords do not match'
    },
    default: {
        validate: (value) => value.trim().length > 0,
        message: 'This field is required'
    }
};

// Update submit button state
function updateSubmitButton() {
    const isFormValid = Object.values(formValidation).every(value => value === true);
    submitBtn.disabled = !isFormValid;
    submitBtn.style.opacity = isFormValid ? '1' : '0.5';
    submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
}

// Validate single input
function validateInput(input) {
    const inputId = input.id;
    const value = input.value;
    const errorDiv = input.parentElement.querySelector('.error-message');
    
    let rule = validationRules[inputId] || validationRules.default;
    let isValid = rule.validate(value);
    
    // Visual feedback
    input.style.borderColor = isValid ? '#ccc' : 'red';
    if (errorDiv) {
        errorDiv.style.display = isValid ? 'none' : 'block';
        errorDiv.textContent = isValid ? '' : rule.message;
    }
    
    // Update validation state
    formValidation[inputId] = isValid;
    updateSubmitButton();
    return isValid;
}

// Add validation event listeners
function setupValidation() {
    inputs.forEach(input => {
        // Add event listeners for validation
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
        
        // Add initial styles
        input.style.transition = 'border-color 0.3s ease';
    });

    // Style submit button
    submitBtn.style.transition = 'opacity 0.3s ease';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
}

// Add native form validation handler
validForm.onsubmit = function () {
    // Validate all inputs before form submission
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    // If invalid, native form submission is prevented automatically
    if (!isValid) {
        showNotification('Please fill all fields correctly.', 'error');
        return false; // Prevent form submission
    }

    // If valid, let the form submit normally
    return true;
};

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', () => {
    addErrorMessages();
    setupValidation();
});
