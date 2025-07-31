document.addEventListener('DOMContentLoaded', function() {
    // Get references to key elements
    const form = document.getElementById('profile-form');
    const studentPhotoInput = document.getElementById('student_photo');
    const photoPreview = document.getElementById('profile-photo-preview');
    const sameAsPresentCheckbox = document.getElementById('same_as_present');
    const presentAddressField = document.getElementById('present_address');
    const permanentAddressFieldsContainer = document.getElementById('permanent-address-fields');
    const permanentAddressField = document.getElementById('permanent_address');
    const addEmergencyPhoneBtn = document.getElementById('add-emergency-phone');
    const emergencyPhoneContainer = document.getElementById('emergency-phone-numbers');

    // Handle profile photo preview
    studentPhotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle "same as present address" checkbox
    sameAsPresentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Hide permanent address fields
            permanentAddressFieldsContainer.style.display = 'none';
            // Copy value from present to permanent address
            permanentAddressField.value = presentAddressField.value;
            // Remove required attribute since it's a copy
            permanentAddressField.removeAttribute('required');
        } else {
            // Show permanent address fields and make them required again
            permanentAddressFieldsContainer.style.display = 'block';
            permanentAddressField.setAttribute('required', 'required');
        }
    });
    
    // Add event listener to copy present address when it changes
    presentAddressField.addEventListener('input', function() {
        if (sameAsPresentCheckbox.checked) {
            permanentAddressField.value = this.value;
        }
    });

    // Handle dynamic emergency phone numbers
    let phoneCount = 1;
    addEmergencyPhoneBtn.addEventListener('click', function() {
        if (phoneCount < 3) {
            phoneCount++;
            const phoneInputHtml = `
                <div class="input-group mb-2">
                    <input type="tel" class="form-control" name="emergency_phone_${phoneCount}" placeholder="Phone number ${phoneCount} (Optional)">
                    <button class="btn btn-outline-danger remove-phone-btn" type="button"><i class="fas fa-times"></i></button>
                </div>
            `;
            emergencyPhoneContainer.insertAdjacentHTML('beforeend', phoneInputHtml);
        }
        
        // Hide the button when max phones are added
        if (phoneCount === 3) {
            addEmergencyPhoneBtn.style.display = 'none';
        }
    });

    // Event listener for removing dynamic phone numbers
    emergencyPhoneContainer.addEventListener('click', function(event) {
        if (event.target.closest('.remove-phone-btn')) {
            event.target.closest('.input-group').remove();
            phoneCount--;
            // Show the button again if it was hidden
            addEmergencyPhoneBtn.style.display = 'block';
        }
    });

    // Example form submission (prevents default behavior and logs data)
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Collect all form data
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Handle special conditions checkbox data
        const specialConditions = Array.from(form.querySelectorAll('input[type="checkbox"][id]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data['special_conditions'] = specialConditions;

        console.log("Profile Data Submitted:", data);
        // Here you would typically send the data to a backend using fetch()
        
        // Show a success message (replace with a proper modal in a real app)
        alert('Profile changes saved successfully!');
    });
});