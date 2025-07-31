document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 0;
    const formSteps = document.querySelectorAll('.form-step');
    const totalSteps = formSteps.length;

    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const admissionForm = document.getElementById('admission-form');

    // Function to update the progress bar
    function updateProgressBar() {
        const progress = (currentStep / (totalSteps - 1)) * 100;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', progress);
    }

    // Function to show the current step and manage button visibility
    function showStep(stepIndex) {
        // Hide all steps
        formSteps.forEach(step => step.classList.remove('active'));
        // Show the current step
        formSteps[stepIndex].classList.add('active');

        // Update button visibility
        if (stepIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        if (stepIndex === totalSteps - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
        
        updateProgressBar();
    }

    // Simple validation for the current step
    function validateStep(stepIndex) {
        const currentStepElement = formSteps[stepIndex];
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        requiredInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        return isValid;
    }

    // Event listener for Next button
    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Event listener for Previous button
    prevBtn.addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
    });

    // Event listener for form submission (on the last step)
    admissionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // In a real application, you would handle form submission here,
        // such as sending data to a server.
        if (validateStep(currentStep)) {
            console.log("Form submitted!");
            alert('Application Submitted Successfully!');
        }
    });

    // Handle the same as present address checkbox
    const sameAsPresentCheckbox = document.getElementById('same_as_present');
    const permanentAddressFields = document.getElementById('permanent-address-fields');
    const permanentAddressTextarea = document.getElementById('permanent_address');

    sameAsPresentCheckbox.addEventListener('change', function () {
        if (this.checked) {
            permanentAddressFields.style.display = 'none';
            permanentAddressTextarea.removeAttribute('required');
        } else {
            permanentAddressFields.style.display = 'block';
            permanentAddressTextarea.setAttribute('required', 'required');
        }
    });

    // Handle adding more emergency phone numbers
    const addEmergencyPhoneBtn = document.getElementById('add-emergency-phone');
    const emergencyPhoneContainer = document.getElementById('emergency-phone-numbers');

    addEmergencyPhoneBtn.addEventListener('click', function() {
        const newPhoneInputDiv = document.createElement('div');
        newPhoneInputDiv.className = 'input-group mb-2';
        newPhoneInputDiv.innerHTML = `
            <input type="tel" class="form-control" name="emergency_phone_${emergencyPhoneContainer.children.length + 1}">
            <button type="button" class="btn btn-outline-danger remove-phone-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        emergencyPhoneContainer.appendChild(newPhoneInputDiv);

        // Add event listener to the new remove button
        newPhoneInputDiv.querySelector('.remove-phone-btn').addEventListener('click', function() {
            newPhoneInputDiv.remove();
        });
    });

    // Initialize the form
    showStep(currentStep);
});