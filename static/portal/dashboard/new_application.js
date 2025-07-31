document.addEventListener('DOMContentLoaded', function() {
    // Get references to key elements
    const applicationTypeSelect = document.getElementById('applicationType');
    const fieldsContainer = document.getElementById('application-fields-container');
    const submitButtonContainer = document.getElementById('submit-button-container');

    // Mock Data for demonstration purposes
    const withdrawnCourses = [
        { id: '1', code: 'HIS101', title: 'World History', section: 'A' },
        { id: '2', code: 'CSC202', title: 'Database Systems', section: 'B' },
        { id: '3', code: 'MGT301', title: 'Organizational Behavior', section: 'C' },
    ];

    const availableMajors = [
        'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Business Administration'
    ];

    const availableMinors = [
        'Data Science', 'Psychology', 'Economics', 'Art History'
    ];
    
    // Function to render the correct fields based on the selected application type
    function renderApplicationFields(applicationType) {
        let html = '';
        
        switch (applicationType) {
            case 'leave_of_absence':
                html = `
                    <div class="mb-3">
                        <label for="reason_leave" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_leave" rows="4" required></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="semesters_leave" class="form-label">For number of semesters</label>
                            <select class="form-select" id="semesters_leave" required>
                                <option value="" selected disabled>Select a number</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="documents_leave" class="form-label">Supporting Documents (Optional)</label>
                        <div class="file-upload-container">
                            <label class="file-upload-label" for="documents_leave">
                                <i class="fas fa-cloud-upload-alt"></i> Upload File
                            </label>
                            <input type="file" id="documents_leave" multiple style="display: none;">
                            <ul class="file-upload-list" id="documents_leave_list"></ul>
                        </div>
                        <div class="form-text">e.g., medical certificate, family emergency proof.</div>
                    </div>
                `;
                break;
            
            case 'course_unwithdraw':
                html = `
                    <div class="mb-3">
                        <label for="reason_unwithdraw" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_unwithdraw" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Select courses to un-withdraw</label>
                        <div class="alert alert-info" role="alert">
                            Note: Un-withdrawing a course is subject to review and approval.
                        </div>
                        <div id="withdrawn-courses-list">
                            ${withdrawnCourses.map(course => `
                                <div class="withdrawn-course-card">
                                    <input type="checkbox" id="unwithdraw_${course.id}" name="unwithdraw_course" value="${course.id}">
                                    <div class="withdrawn-course-card-content">
                                        <h5>${course.code} - ${course.title}</h5>
                                        <p>Section: ${course.section}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
                
            case 'insurance_claim':
                html = `
                    <div class="mb-3">
                        <label for="reason_insurance" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_insurance" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="documents_insurance" class="form-label">Supporting Documents <span class="text-danger">*</span></label>
                        <div class="file-upload-container">
                            <label class="file-upload-label" for="documents_insurance">
                                <i class="fas fa-cloud-upload-alt"></i> Upload File
                            </label>
                            <input type="file" id="documents_insurance" multiple required style="display: none;">
                            <ul class="file-upload-list" id="documents_insurance_list"></ul>
                        </div>
                        <div class="form-text">e.g., medical bills, accident reports.</div>
                    </div>
                `;
                break;
                
            case 'financial_aid':
                html = `
                    <div class="mb-3">
                        <label for="reason_financial" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_financial" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="documents_financial" class="form-label">Supporting Documents <span class="text-danger">*</span></label>
                        <div class="file-upload-container">
                            <label class="file-upload-label" for="documents_financial">
                                <i class="fas fa-cloud-upload-alt"></i> Upload File
                            </label>
                            <input type="file" id="documents_financial" multiple required style="display: none;">
                            <ul class="file-upload-list" id="documents_financial_list"></ul>
                        </div>
                        <div class="form-text">e.g., proof of income, financial statements.</div>
                    </div>
                `;
                break;
            
            case 'major_change':
                html = `
                    <div class="mb-3">
                        <label for="reason_major" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_major" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="new_major" class="form-label">New Major</label>
                        <select class="form-select" id="new_major" required>
                            <option value="" selected disabled>Select new major</option>
                            ${availableMajors.map(major => `<option value="${major}">${major}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="documents_major" class="form-label">Supporting Documents (Optional)</label>
                        <div class="file-upload-container">
                            <label class="file-upload-label" for="documents_major">
                                <i class="fas fa-cloud-upload-alt"></i> Upload File
                            </label>
                            <input type="file" id="documents_major" multiple style="display: none;">
                            <ul class="file-upload-list" id="documents_major_list"></ul>
                        </div>
                        <div class="form-text">e.g., statement of purpose, academic plan.</div>
                    </div>
                `;
                break;
                
            case 'minor_change':
                html = `
                    <div class="mb-3">
                        <label for="reason_minor" class="form-label">Reason for Application</label>
                        <textarea class="form-control" id="reason_minor" rows="4" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="new_minor" class="form-label">New Minor</label>
                        <select class="form-select" id="new_minor" required>
                            <option value="" selected disabled>Select new minor</option>
                            ${availableMinors.map(minor => `<option value="${minor}">${minor}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="documents_minor" class="form-label">Supporting Documents (Optional)</label>
                        <div class="file-upload-container">
                            <label class="file-upload-label" for="documents_minor">
                                <i class="fas fa-cloud-upload-alt"></i> Upload File
                            </label>
                            <input type="file" id="documents_minor" multiple style="display: none;">
                            <ul class="file-upload-list" id="documents_minor_list"></ul>
                        </div>
                        <div class="form-text">e.g., statement of purpose.</div>
                    </div>
                `;
                break;
            
            default:
                html = '';
                break;
        }
        
        fieldsContainer.innerHTML = html;
        
        // Show or hide the submit button container
        if (applicationType) {
            submitButtonContainer.style.display = 'block';
            // Re-attach event listeners for file inputs after rendering new HTML
            attachFileEventListeners();
        } else {
            submitButtonContainer.style.display = 'none';
        }
    }

    // Function to handle file uploads and display file list
    function attachFileEventListeners() {
        const fileInputs = fieldsContainer.querySelectorAll('input[type="file"]');
        fileInputs.forEach(fileInput => {
            const fileListElement = document.getElementById(fileInput.id + '_list');

            fileInput.addEventListener('change', function() {
                fileListElement.innerHTML = ''; // Clear previous list
                if (this.files.length > 0) {
                    for (const file of this.files) {
                        const listItem = document.createElement('li');
                        listItem.classList.add('file-upload-list-item');
                        listItem.innerHTML = `
                            <i class="fas fa-file"></i>
                            <span>${file.name}</span>
                            <button type="button" class="remove-file-btn" data-filename="${file.name}">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        `;
                        fileListElement.appendChild(listItem);
                    }
                }
            });

            // Add event listener to remove files
            fileListElement.addEventListener('click', function(event) {
                if (event.target.closest('.remove-file-btn')) {
                    const button = event.target.closest('.remove-file-btn');
                    const fileNameToRemove = button.dataset.filename;
                    
                    // Remove the file from the input's file list (cannot directly modify, so recreate)
                    const dt = new DataTransfer();
                    for (const file of fileInput.files) {
                        if (file.name !== fileNameToRemove) {
                            dt.items.add(file);
                        }
                    }
                    fileInput.files = dt.files;
                    
                    // Remove the list item from the UI
                    button.closest('.file-upload-list-item').remove();
                }
            });
        });
    }

    // Event listener for the application type dropdown
    applicationTypeSelect.addEventListener('change', function() {
        renderApplicationFields(this.value);
    });
    
    // Example form submission (prevents default behavior and logs data)
    const form = document.getElementById('application-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log("Form Submitted with Data:", data);
        // You can send this data to your backend here using fetch()
    });

});