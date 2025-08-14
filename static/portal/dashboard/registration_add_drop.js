document.addEventListener("DOMContentLoaded", function () {
    // Get elements for Course Registration
    const availableCoursesTableBody = document.getElementById('available-courses-table-body');
    const selectedCoursesTableBodyDesktop = document.getElementById('selected-courses-table-body-desktop');
    const selectedCoursesTableBodyMobile = document.getElementById('selected-courses-table-body-mobile');
    const showSelectedTrigger = document.getElementById('showSelectedTrigger');
    const showSelectedBtn = document.getElementById('showSelectedBtn');
    const selectedCoursesOverlay = document.getElementById('selectedCoursesOverlay');
    const hideSelectedBtn = document.getElementById('hideSelectedBtn');

    // Get elements for Save Changes and Modal
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const confirmationModal = document.getElementById('confirmationModal');
    const newlyRegisteredCoursesSummary = document.getElementById('newlyRegisteredCoursesSummary');
    const droppedCoursesSummary = document.getElementById('droppedCoursesSummary');
    const confirmRegistrationBtn = document.getElementById('confirmRegistrationBtn');
    const goBackBtn = document.getElementById('goBackBtn');

    // Mock Data for Enrolled Courses (existing)
    const enrolledCoursesData = [
        {
            id: 'enrolled1',
            code: "CSC301",
            title: "Database Management Systems",
            section: "A",
            isDropped: false
        },
        {
            id: 'enrolled2',
            code: "SWE303",
            title: "Software Engineering",
            section: "B",
            isDropped: false
        },
        {
            id: 'enrolled3',
            code: "CSE305",
            title: "Operating Systems",
            section: "C",
            isDropped: true
        },
        {
            id: 'enrolled4',
            code: "EEE301",
            title: "Electronics I",
            section: "D",
            isDropped: false
        },
        {
            id: 'enrolled5',
            code: "BBA101",
            title: "Principles of Accounting",
            section: "A",
            isDropped: false
        }
    ];

    // Function to populate Enrolled Courses Section (existing)
    function populateEnrolledCourses() {
        const container = document.getElementById('enrolled-courses-container');
        container.innerHTML = ''; // Clear existing content

        enrolledCoursesData.forEach(course => {
            const cardClass = course.isDropped ? 'dropped' : '';
            const buttonText = course.isDropped ? 'Un-drop' : 'Drop';
            const buttonIconClass = course.isDropped ? 'fa-undo' : 'fa-trash-alt';
            const buttonColorClass = course.isDropped ? 'un-drop' : '';

            const cardHtml = `
                <div class="course-card ${cardClass}" data-course-id="${course.id}">
                    <div class="course-info">
                        <h5>${course.code} - ${course.title}</h5>
                        <p>Section: ${course.section}</p>
                    </div>
                    <div class="drop-button-container">
                        <button class="drop-btn ${buttonColorClass}" data-course-id="${course.id}">
                            <i class="fas ${buttonIconClass}"></i>
                            <span>${buttonText}</span>
                        </button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });

        document.querySelectorAll('.drop-btn').forEach(button => {
            button.addEventListener('click', handleDropUnDrop);
        });
    }

    // Handle Drop/Un-drop button click (existing)
    function handleDropUnDrop(event) {
        const button = event.currentTarget;
        const courseId = button.dataset.courseId;
        const courseCard = document.querySelector(`.course-card[data-course-id="${courseId}"]`);
        const courseIndex = enrolledCoursesData.findIndex(c => c.id === courseId);

        if (courseIndex > -1) {
            const course = enrolledCoursesData[courseIndex];
            course.isDropped = !course.isDropped; // Toggle the dropped status

            // Update card style
            if (course.isDropped) {
                courseCard.classList.add('dropped');
                button.classList.add('un-drop');
                button.querySelector('span').textContent = 'Un-drop';
                button.querySelector('i').classList.replace('fa-trash-alt', 'fa-undo');
            } else {
                courseCard.classList.remove('dropped');
                button.classList.remove('un-drop');
                button.querySelector('span').textContent = 'Drop';
                button.querySelector('i').classList.replace('fa-undo', 'fa-trash-alt');
            }
            console.log(`Course ${course.code} is now ${course.isDropped ? 'dropped' : 'enrolled'}.`);
        }
    }

    // Mock Data for All Available Courses
    const allAvailableCoursesData = [
        { id: 'reg1', code: 'CS101', section: 'A', timing: 'Mon/Wed 10:00 AM', enrolled: 45, capacity: 50 },
        { id: 'reg2', code: 'MA201', section: 'B', timing: 'Tue/Thu 09:00 AM', enrolled: 30, capacity: 35 },
        { id: 'reg3', code: 'PH101', section: 'C', timing: 'Mon/Wed 01:00 PM', enrolled: 20, capacity: 25 },
        { id: 'reg4', code: 'EN305', section: 'D', timing: 'Tue/Thu 02:00 PM', enrolled: 15, capacity: 20 },
        { id: 'reg5', code: 'EC202', section: 'A', timing: 'Mon/Wed 11:30 AM', enrolled: 40, capacity: 40 }, // Full course
        { id: 'reg6', code: 'CS305', section: 'B', timing: 'Tue/Thu 10:30 AM', enrolled: 28, capacity: 30 },
        { id: 'reg7', code: 'ART100', section: 'E', timing: 'Fri 09:00 AM', enrolled: 10, capacity: 15 },
        { id: 'reg8', code: 'BIO101', section: 'F', timing: 'Mon/Wed 03:00 PM', enrolled: 22, capacity: 25 },
    ];

    // Array to store selected courses
    let selectedCourses = [];

    // Function to populate All Available Courses Table
    function populateAvailableCoursesTable() {
        availableCoursesTableBody.innerHTML = ''; // Clear existing content
        allAvailableCoursesData.forEach(course => {
            // Check if the course is already in selectedCourses to maintain checkbox state
            const isChecked = selectedCourses.some(selected => selected.id === course.id);
            const rowHtml = `
                <tr data-course-id="${course.id}">
                    <td><input type="checkbox" class="course-checkbox" data-course-id="${course.id}" ${isChecked ? 'checked' : ''}></td>
                    <td data-label="Course Code">${course.code}</td>
                    <td data-label="Section">${course.section}</td>
                    <td data-label="Timing">${course.timing}</td>
                    <td data-label="Enrolled">${course.enrolled}</td>
                    <td data-label="Capacity">${course.capacity}</td>
                </tr>
            `;
            availableCoursesTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        // Add event listeners to new checkboxes
        document.querySelectorAll('.course-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    // Function to populate Selected Courses Tables (Desktop and Mobile)
    function populateSelectedCoursesTables() {
        selectedCoursesTableBodyDesktop.innerHTML = '';
        selectedCoursesTableBodyMobile.innerHTML = '';

        if (selectedCourses.length === 0) {
            const noCoursesRow = `<tr><td colspan="6" class="text-center text-muted">No courses selected.</td></tr>`;
            selectedCoursesTableBodyDesktop.insertAdjacentHTML('beforeend', noCoursesRow);
            selectedCoursesTableBodyMobile.insertAdjacentHTML('beforeend', noCoursesRow);
        } else {
            selectedCourses.forEach(course => {
                const rowHtml = `
                    <tr data-course-id="${course.id}">
                        <td><input type="checkbox" class="course-checkbox" data-course-id="${course.id}" checked></td>
                        <td data-label="Course Code">${course.code}</td>
                        <td data-label="Section">${course.section}</td>
                        <td data-label="Timing">${course.timing}</td>
                        <td data-label="Enrolled">${course.enrolled}</td>
                        <td data-label="Capacity">${course.capacity}</td>
                    </tr>
                `;
                selectedCoursesTableBodyDesktop.insertAdjacentHTML('beforeend', rowHtml);
                selectedCoursesTableBodyMobile.insertAdjacentHTML('beforeend', rowHtml);
            });
        }

        // Update the count on the mobile trigger button
        showSelectedBtn.textContent = `Show Selected Courses (${selectedCourses.length})`;

        // Add event listeners to checkboxes in selected tables (for unchecking)
        document.querySelectorAll('#selected-courses-table-body-desktop .course-checkbox, #selected-courses-table-body-mobile .course-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    // Handle checkbox change event
    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const courseId = checkbox.dataset.courseId;
        const course = allAvailableCoursesData.find(c => c.id === courseId);

        if (checkbox.checked) {
            if (course && !selectedCourses.some(c => c.id === course.id)) {
                selectedCourses.push(course);
            }
        } else {
            selectedCourses = selectedCourses.filter(c => c.id !== courseId);
        }

        // Ensure consistency across all checkboxes for the same course
        document.querySelectorAll(`.course-checkbox[data-course-id="${courseId}"]`).forEach(cb => {
            cb.checked = checkbox.checked;
        });

        populateSelectedCoursesTables(); // Re-render selected courses
    }

    // Toggle mobile selected courses overlay
    function toggleSelectedCoursesOverlay() {
        selectedCoursesOverlay.classList.toggle('active');
        mainContent.classList.toggle('dimmed'); // Dim main content
        overlay.classList.toggle('active'); // Activate overlay for clicks outside

        // Adjust button text and position
        if (selectedCoursesOverlay.classList.contains('active')) {
            showSelectedTrigger.style.display = 'none'; // Hide bottom trigger button
        } else {
            // Only show if on mobile view
            if (window.innerWidth <= 768) {
                showSelectedTrigger.style.display = 'block';
            }
        }
    }

    // Event listeners for mobile overlay buttons
    showSelectedBtn.addEventListener('click', toggleSelectedCoursesOverlay);
    hideSelectedBtn.addEventListener('click', toggleSelectedCoursesOverlay);
    // Close overlay if clicking dimmed background (only on mobile when overlay is active)
    overlay.addEventListener('click', function() {
        if (selectedCoursesOverlay.classList.contains('active')) {
            toggleSelectedCoursesOverlay();
        }
    });

    // --- Modal Logic ---
    saveChangesBtn.addEventListener('click', showConfirmationModal);
    goBackBtn.addEventListener('click', hideConfirmationModal);
    // Close modal if clicking outside (on the backdrop)
    confirmationModal.addEventListener('click', function(event) {
        if (event.target === confirmationModal) {
            hideConfirmationModal();
        }
    });

    function showConfirmationModal() {
        // Populate summaries
        const newlyAdded = selectedCourses.map(course => `<li>${course.code}</li>`).join('');
        newlyRegisteredCoursesSummary.innerHTML = newlyAdded || '<li>None</li>';

        const droppedCourses = enrolledCoursesData
            .filter(course => course.isDropped)
            .map(course => `<li>${course.code}</li>`)
            .join('');
        droppedCoursesSummary.innerHTML = droppedCourses || '<li>None</li>';

        confirmationModal.classList.add('active');
        mainContent.classList.add('dimmed'); // Dim main content
        overlay.classList.add('active'); // Activate overlay for clicks outside
    }

    function hideConfirmationModal() {
        confirmationModal.classList.remove('active');
        mainContent.classList.remove('dimmed'); // Remove dimming
        overlay.classList.remove('active'); // Deactivate overlay
    }

    confirmRegistrationBtn.addEventListener('click', function() {
        // Here you would implement the actual logic to save changes
        // e.g., send data to a backend server.
        console.log("Confirming registration and add/drop changes!");
        console.log("Newly Registered/Added Courses:", selectedCourses);
        console.log("Dropped Courses:", enrolledCoursesData.filter(c => c.isDropped));
        alert("Changes saved successfully!"); // Using alert for demo, replace with custom message box
        hideConfirmationModal();
        // Optionally, refresh the enrolled courses and available courses tables
        // after successful registration/drop.
        // populateEnrolledCourses();
        // populateAvailableCoursesTable();
        // selectedCourses = []; // Clear selected courses after saving
        // populateSelectedCoursesTables();
    });


    // Initial calls
    populateEnrolledCourses();
    populateAvailableCoursesTable();
    populateSelectedCoursesTables(); // Populate on load
});

// Function to handle responsive display of the "Show Selected Courses" button
function handleResizeDisplay() {
    if (window.innerWidth > 768) {
        // Desktop view: hide mobile trigger button and ensure overlay is hidden
        showSelectedTrigger.style.display = 'none';
        if (selectedCoursesOverlay.classList.contains('active')) {
            toggleSelectedCoursesOverlay(); // Hide overlay if active
        }
    } else {
        // Mobile view: show mobile trigger button unless overlay is active
        if (!selectedCoursesOverlay.classList.contains('active')) {
            showSelectedTrigger.style.display = 'block';
        }
    }
}

// Event listener for window resize
window.addEventListener('resize', handleResizeDisplay); // ***** new *****
