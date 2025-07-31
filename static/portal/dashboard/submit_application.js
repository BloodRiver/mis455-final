document.addEventListener('DOMContentLoaded', function() {
    // Get elements for Submit Application Page
    const submitNewApplicationBtn = document.getElementById('submitNewApplicationBtn');
    const filterApplicationType = document.getElementById('filterApplicationType');
    const filterStartDate = document.getElementById('filterStartDate');
    const filterEndDate = document.getElementById('filterEndDate');
    const searchApplicationTitle = document.getElementById('searchApplicationTitle');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const applicationsTableBody = document.getElementById('applicationsTableBody');

    // Mock Data for Applications
    const applicationsData = [
        {
            id: 'app001',
            type: 'Scholarship',
            title: 'Merit Scholarship Application 2024',
            date: '2024-05-10',
            status: 'Pending'
        },
        {
            id: 'app002',
            type: 'Leave of Absence',
            title: 'Leave Request for Fall 2024',
            date: '2024-04-20',
            status: 'Approved'
        },
        {
            id: 'app003',
            type: 'Course Exemption',
            title: 'Exemption for CS101',
            date: '2024-03-15',
            status: 'Rejected'
        },
        {
            id: 'app004',
            type: 'Transcript Request',
            title: 'Official Transcript Request',
            date: '2024-06-01',
            status: 'Pending'
        },
        {
            id: 'app005',
            type: 'Scholarship',
            title: 'Athletic Scholarship Application',
            date: '2023-11-25',
            status: 'Approved'
        },
        {
            id: 'app006',
            type: 'Leave of Absence',
            title: 'Medical Leave Request',
            date: '2024-01-05',
            status: 'Pending'
        }
    ];

    // Function to populate Applications Table based on filters
    function populateApplicationsTable(filteredData = applicationsData) {
        applicationsTableBody.innerHTML = ''; // Clear existing content

        if (filteredData.length === 0) {
            applicationsTableBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No applications found.</td></tr>';
            return;
        }

        filteredData.forEach(app => {
            let statusClass = '';
            if (app.status === 'Pending') {
                statusClass = 'status-pending';
            } else if (app.status === 'Approved') {
                statusClass = 'status-approved';
            } else if (app.status === 'Rejected') {
                statusClass = 'status-rejected';
            }

            const rowHtml = `
                <tr>
                    <td data-label="Application Type">${app.type}</td>
                    <td data-label="Application Title">${app.title}</td>
                    <td data-label="Date of Application">${app.date}</td>
                    <td data-label="Application Status" class="${statusClass}">${app.status}</td>
                </tr>
            `;
            applicationsTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });
    }

    // Function to apply filters
    function applyFilters() {
        const typeFilter = filterApplicationType.value;
        const startDateFilter = filterStartDate.value ? new Date(filterStartDate.value) : null;
        const endDateFilter = filterEndDate.value ? new Date(filterEndDate.value) : null;
        const titleSearch = searchApplicationTitle.value.toLowerCase();

        const filtered = applicationsData.filter(app => {
            const appDate = new Date(app.date);

            // Filter by type
            if (typeFilter && app.type !== typeFilter) {
                return false;
            }

            // Filter by date range
            if (startDateFilter && appDate < startDateFilter) {
                return false;
            }
            if (endDateFilter && appDate > endDateFilter) {
                return false;
            }

            // Filter by title search
            if (titleSearch && !app.title.toLowerCase().includes(titleSearch)) {
                return false;
            }

            return true;
        });

        populateApplicationsTable(filtered);
    }

    // Event Listeners for Filters
    applyFiltersBtn.addEventListener('click', applyFilters);
    // Also apply filters when input values change for a more interactive experience
    filterApplicationType.addEventListener('change', applyFilters);
    filterStartDate.addEventListener('change', applyFilters);
    filterEndDate.addEventListener('change', applyFilters);
    searchApplicationTitle.addEventListener('input', applyFilters); // Use 'input' for real-time search

    // Event listener for Submit New Application button
    submitNewApplicationBtn.addEventListener('click', function() {
        alert("Navigating to new application form... (This is a placeholder)");
        // In a real application, this would redirect to a new application form page
    });

    // Initial call to populate the table on page load
    populateApplicationsTable();
});