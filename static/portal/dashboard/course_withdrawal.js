document.addEventListener('DOMContentLoaded', function() {
    // Get elements for Course Withdrawal Page
    const withdrawalCoursesContainer = document.getElementById('withdrawal-courses-container');
    const saveChangesBtn = document.getElementById('saveChangesBtn'); // New button
    const confirmationModal = document.getElementById('confirmationModal'); // New modal
    const coursesToWithdrawSummary = document.getElementById('coursesToWithdrawSummary'); // New summary list
    const confirmWithdrawalBtn = document.getElementById('confirmWithdrawalBtn'); // New modal button
    const cancelWithdrawalBtn = document.getElementById('cancelWithdrawalBtn'); // New modal button

    // Mock Data for Enrolled Courses for Withdrawal
    const enrolledCoursesForWithdrawal = [
        {
            id: 'w_course1',
            code: "CSC301",
            title: "Database Management Systems",
            section: "A",
            isWithdrawn: false
        },
        {
            id: 'w_course2',
            code: "SWE303",
            title: "Software Engineering",
            section: "B",
            isWithdrawn: false
        },
        {
            id: 'w_course3',
            code: "CSE305",
            title: "Operating Systems",
            section: "C",
            isWithdrawn: true // Example: This course is initially marked for withdrawal
        },
        {
            id: 'w_course4',
            code: "EEE301",
            title: "Electronics I",
            section: "D",
            isWithdrawn: false
        },
        {
            id: 'w_course5',
            code: "BBA101",
            title: "Principles of Accounting",
            section: "A",
            isWithdrawn: false
        }
    ];

    // Function to update the disabled state of the Save Changes button
    function updateSaveChangesButtonState() {
        const coursesSelectedForWithdrawal = enrolledCoursesForWithdrawal.filter(course => course.isWithdrawn);
        saveChangesBtn.disabled = coursesSelectedForWithdrawal.length === 0;
    }

    // Function to populate Enrolled Courses for Withdrawal Section
    function populateWithdrawalCourses() {
        const container = document.getElementById('withdrawal-courses-container');
        container.innerHTML = ''; // Clear existing content

        enrolledCoursesForWithdrawal.forEach(course => {
            const cardClass = course.isWithdrawn ? 'withdrawn' : '';
            const buttonText = course.isWithdrawn ? 'Un-withdraw' : 'Withdraw';
            const buttonIconClass = course.isWithdrawn ? 'fa-undo' : 'fa-trash-alt';
            const buttonColorClass = course.isWithdrawn ? 'un-withdraw' : '';

            const cardHtml = `
                <div class="withdrawal-card ${cardClass}" data-course-id="${course.id}">
                    <div class="course-info">
                        <h5>${course.code} - ${course.title}</h5>
                        <p>Section: ${course.section}</p>
                    </div>
                    <div class="withdrawal-button-container">
                        <button class="withdraw-btn ${buttonColorClass}" data-course-id="${course.id}">
                            <i class="fas ${buttonIconClass}"></i>
                            <span>${buttonText}</span>
                        </button>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.withdraw-btn').forEach(button => {
            button.addEventListener('click', handleWithdrawUnWithdraw);
        });

        updateSaveChangesButtonState(); // Initial state update after populating cards
    }

    // Handle Withdraw/Un-withdraw button click
    function handleWithdrawUnWithdraw(event) {
        const button = event.currentTarget;
        const courseId = button.dataset.courseId;
        const courseCard = document.querySelector(`.withdrawal-card[data-course-id="${courseId}"]`);
        const courseIndex = enrolledCoursesForWithdrawal.findIndex(c => c.id === courseId);

        if (courseIndex > -1) {
            const course = enrolledCoursesForWithdrawal[courseIndex];
            course.isWithdrawn = !course.isWithdrawn; // Toggle the withdrawn status

            // Update card style
            if (course.isWithdrawn) {
                courseCard.classList.add('withdrawn');
                button.classList.add('un-withdraw');
                button.querySelector('span').textContent = 'Un-withdraw';
                button.querySelector('i').classList.replace('fa-trash-alt', 'fa-undo');
            } else {
                courseCard.classList.remove('withdrawn');
                button.classList.remove('un-withdraw');
                button.querySelector('span').textContent = 'Withdraw';
                button.querySelector('i').classList.replace('fa-undo', 'fa-trash-alt');
            }
            // In a real application, you would send this update to a backend server.
            console.log(`Course ${course.code} is now ${course.isWithdrawn ? 'marked for withdrawal' : 'not marked for withdrawal'}.`);

            updateSaveChangesButtonState(); // Update button state after each change
        }
    }

    // --- Modal Logic for Withdrawal Confirmation ---
    saveChangesBtn.addEventListener('click', showWithdrawalConfirmationModal);
    cancelWithdrawalBtn.addEventListener('click', hideWithdrawalConfirmationModal);
    // Close modal if clicking outside (on the backdrop)
    confirmationModal.addEventListener('click', function(event) {
        if (event.target === confirmationModal) {
            hideWithdrawalConfirmationModal();
        }
    });

    function showWithdrawalConfirmationModal() {
        // Filter courses marked for withdrawal
        const coursesMarkedForWithdrawal = enrolledCoursesForWithdrawal
            .filter(course => course.isWithdrawn);

        // Populate the summary list
        coursesToWithdrawSummary.innerHTML = ''; // Clear previous content
        if (coursesMarkedForWithdrawal.length === 0) {
            coursesToWithdrawSummary.innerHTML = '<li>No courses selected for withdrawal.</li>';
        } else {
            coursesMarkedForWithdrawal.forEach(course => {
                const listItem = `<li>${course.code} - ${course.title}</li>`;
                coursesToWithdrawSummary.insertAdjacentHTML('beforeend', listItem);
            });
        }

        confirmationModal.classList.add('active');
        mainContent.classList.add('dimmed'); // Dim main content
        overlay.classList.add('active'); // Activate overlay for clicks outside
    }

    function hideWithdrawalConfirmationModal() {
        confirmationModal.classList.remove('active');
        mainContent.classList.remove('dimmed'); // Remove dimming
        overlay.classList.remove('active'); // Deactivate overlay
    }

    confirmWithdrawalBtn.addEventListener('click', function() {
        // Here you would implement the actual logic to process withdrawals
        // e.g., send data to a backend server.
        const withdrawnCourses = enrolledCoursesForWithdrawal.filter(c => c.isWithdrawn);
        console.log("Confirming withdrawal for courses:", withdrawnCourses);
        alert("Withdrawal request submitted successfully!"); // Using alert for demo, replace with custom message box
        hideWithdrawalConfirmationModal();
        // In a real app, you might update the enrolledCoursesForWithdrawal data
        // and re-populate the cards after a successful withdrawal.
        // For this demo, we'll just log and hide.
    });


    // Initial call to populate withdrawal courses on page load
    populateWithdrawalCourses();
});