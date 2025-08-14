document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('mainContent');
    // Get elements for Registration Bill Page
    const paymentCardsContainer = document.getElementById('paymentCardsContainer');
    const createInstallmentBtn = document.getElementById('createInstallmentBtn');
    const previousBillsTableBody = document.getElementById('previousBillsTableBody');

    // Mock Data for Current Payments
    const currentPaymentsData = [
        {
            id: 'BILL001',
            semester: 'Autumn-2025', // Added semester
            dueDate: '2025-08-15',
            amount: 1250.00,
            status: 'pending' // 'pending' or 'unpaid'
        },
        {
            id: 'BILL002',
            semester: 'Summer-2025', // Added semester
            dueDate: '2025-07-20', // Past due date
            amount: 800.00,
            status: 'unpaid'
        },
        {
            id: 'BILL003',
            semester: 'Spring-2025', // Added semester
            dueDate: '2025-09-01',
            amount: 500.00,
            status: 'pending'
        }
    ];

    // Function to populate Payment Cards
    function populatePaymentCards() {
        paymentCardsContainer.innerHTML = ''; // Clear existing content
        const today = new Date();

        currentPaymentsData.forEach(bill => {
            const dueDate = new Date(bill.dueDate);
            let cardClass = '';
            let statusText = '';
            let payButtonClass = '';

            if (bill.status === 'unpaid' || (bill.status === 'pending' && dueDate < today)) {
                cardClass = 'unpaid';
                statusText = 'Unpaid';
                payButtonClass = 'unpaid'; // For white button
            } else {
                cardClass = 'pending';
                statusText = 'Pending';
                payButtonClass = ''; // For blue button
            }

            const cardHtml = `
                <div class="payment-card ${cardClass}">
                    <div>
                        <h5>Registration Bill ID: ${bill.id}</h5>
                        <p>Semester: ${bill.semester}</p> <!-- Added Semester -->
                        <p>Due Date: ${bill.dueDate}</p>
                        <p class="amount">৳${bill.amount.toFixed(2)} <span class="badge">${statusText}</span></p>
                    </div>
                    <div class="card-buttons">
                        <button class="card-btn pay-online-btn ${payButtonClass}" data-bill-id="${bill.id}">Pay Online</button>
                        <button class="card-btn print-bill-btn" data-bill-id="${bill.id}">Print Registration Bill</button>
                    </div>
                </div>
            `;
            paymentCardsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.payment-card .pay-online-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                alert(`Paying online for Bill ID: ${event.target.dataset.billId}`);
                // In a real app, this would redirect to a payment gateway
            });
        });
        document.querySelectorAll('.payment-card .print-bill-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                alert(`Printing Registration Bill ID: ${event.target.dataset.billId}`);
                // In a real app, this would generate a PDF or print
            });
        });
    }

    // Mock Data for Previous Registration Bills
    const previousBillsData = [
        { id: 'BILL004', semester: 'Spring-2024', amount: 1500.00, dueDate: '2024-02-10', datePaid: '2024-02-08' },
        { id: 'BILL005', semester: 'Autumn-2023', amount: 1300.00, dueDate: '2023-09-05', datePaid: '2023-09-01' },
        { id: 'BILL006', semester: 'Summer-2023', amount: 1000.00, dueDate: '2023-06-20', datePaid: 'unpaid' }, // Unpaid
        { id: 'BILL007', semester: 'Spring-2023', amount: 1400.00, dueDate: '2023-02-15', datePaid: '2023-02-14' },
        { id: 'BILL008', semester: 'Autumn-2022', amount: 1200.00, dueDate: '2022-09-10', datePaid: 'unpaid' } // Unpaid
    ];

    // Function to populate Previous Bills Table
    function populatePreviousBillsTable() {
        previousBillsTableBody.innerHTML = ''; // Clear existing content

        previousBillsData.forEach(bill => {
            let datePaidDisplay = bill.datePaid;
            let datePaidClass = '';

            if (bill.datePaid === 'unpaid') {
                datePaidDisplay = 'Unpaid';
                datePaidClass = 'unpaid-text';
            }

            const rowHtml = `
                <tr>
                    <td data-label="ID">${bill.id}</td>
                    <td data-label="Semester">${bill.semester}</td>
                    <td data-label="Amount">৳${bill.amount.toFixed(2)}</td>
                    <td data-label="Due Date">${bill.dueDate}</td>
                    <td data-label="Date Paid" class="${datePaidClass}">${datePaidDisplay}</td>
                    <td><button class="table-btn pay-btn-table" data-bill-id="${bill.id}">Pay Online</button></td>
                    <td><button class="table-btn print-btn-table" data-bill-id="${bill.id}">Print Bill</button></td>
                </tr>
            `;
            previousBillsTableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        // Add event listeners to buttons in the table
        document.querySelectorAll('.previous-bills-table .pay-btn-table').forEach(button => {
            button.addEventListener('click', (event) => {
                alert(`Paying online for Bill ID: ${event.target.dataset.billId}`);
            });
        });
        document.querySelectorAll('.previous-bills-table .print-btn-table').forEach(button => {
            button.addEventListener('click', (event) => {
                alert(`Printing Bill ID: ${event.target.dataset.billId}`);
            });
        });
    }

    // Event listener for Create Installment button
    createInstallmentBtn.addEventListener('click', function() {
        alert("Create Installment feature coming soon!");
        // In a real application, this would open a form or navigate to another page
    });


    // Initial calls to populate sections
    populatePaymentCards();
    populatePreviousBillsTable();
});