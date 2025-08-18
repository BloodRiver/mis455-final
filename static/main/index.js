document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap Carousel
    var myCarousel = document.querySelector('#achievementsCarousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 5000, // Change slide every 5 seconds
        wrap: true // Loop continuously
    });

    // Mock Data for News
    const newsData = [
        {
            id: 1,
            title: "New Research Grant Awarded to Engineering Faculty",
            date: "July 15, 2025",
            image: "https://placehold.co/400x200/007bff/ffffff?text=Blank",
            description: "Dr. Emily Chen received a prestigious grant for her work on sustainable energy solutions."
        },
        {
            id: 2,
            title: "Annual Alumni Reunion Breaks Attendance Records",
            date: "July 10, 2025",
            image: "https://placehold.co/400x200/28a745/ffffff?text=Alumni",
            description: "Thousands of alumni gathered for a weekend of networking and celebration."
        },
        {
            id: 3,
            title: "University Hosts International Climate Change Summit",
            date: "July 05, 2025",
            image: "https://placehold.co/400x200/ffc107/ffffff?text=Summit",
            description: "Leaders and experts from around the globe discussed urgent climate actions."
        }
    ];

    // Function to populate News Section
    function populateNews() {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = ''; // Clear existing content
        newsData.forEach(news => {
            const newsCard = `
                <div class="col">
                    <div class="card h-100 news-card">
                        <img src="${news.image}" class="card-img-top" alt="${news.title}">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text"><small class="text-muted">${news.date}</small></p>
                            <p class="card-text">${news.description}</p>
                            <a href="#" class="btn btn-primary rounded-pill">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.insertAdjacentHTML('beforeend', newsCard);
        });
    }

    // Mock Data for Events (for the current month)
    const eventsData = [
        {
            id: 1,
            title: "Guest Lecture: Future of AI",
            date: "2025-07-22",
            time: "10:00 AM - 12:00 PM",
            location: "Auditorium A"
        },
        {
            id: 2,
            title: "Student Career Fair",
            date: "2025-07-25",
            time: "09:00 AM - 04:00 PM",
            location: "University Sports Hall"
        },
        {
            id: 3,
            title: "Department of Arts Exhibition",
            date: "2025-07-28",
            time: "02:00 PM - 06:00 PM",
            location: "Art Gallery"
        },
        {
            id: 4,
            title: "Faculty Research Symposium",
            date: "2025-07-30",
            time: "09:30 AM - 05:00 PM",
            location: "Conference Center"
        }
    ];

    // Function to populate Event Calendar
    function populateEvents() {
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = ''; // Clear existing content

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Set current month and year in the title
        document.getElementById('current-month-year').textContent = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });

        const filteredEvents = eventsData.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

        if (filteredEvents.length === 0) {
            eventsList.innerHTML = '<p class="text-center text-muted">No events scheduled for this month.</p>';
            return;
        }

        filteredEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('en-US', { month: 'short' });

            const eventItem = `
                <div class="event-item">
                    <div class="event-date">
                        <div class="day">${day}</div>
                        <div class="month">${month}</div>
                    </div>
                    <div class="event-details">
                        <h5>${event.title}</h5>
                        <p>${event.time} | ${event.location}</p>
                    </div>
                </div>
            `;
            eventsList.insertAdjacentHTML('beforeend', eventItem);
        });
    }

    // Mock Data for Facts and Figures
    const factsData = [
        {
            id: 1,
            figure: "25,000+",
            description: "Students Enrolled"
        },
        {
            id: 2,
            figure: "150+",
            description: "Academic Programs"
        },
        {
            id: 3,
            figure: "$50M+",
            description: "Annual Research Funding"
        },
        {
            id: 4,
            figure: "120+",
            description: "Nationalities Represented"
        }
    ];

    // Function to populate Facts and Figures
    function populateFacts() {
        const factsContainer = document.getElementById('facts-container');
        factsContainer.innerHTML = ''; // Clear existing content
        factsData.forEach(fact => {
            const factCard = `
                <div class="col">
                    <div class="card h-100 facts-card">
                        <div class="card-body">
                            <h3 class="display-4">${fact.figure}</h3>
                            <p class="lead">${fact.description}</p>
                        </div>
                    </div>
                </div>
            `;
            factsContainer.insertAdjacentHTML('beforeend', factCard);
        });
    }

    // Call functions to populate sections on page load
    populateNews();
    populateEvents();
    populateFacts();

    // Card hover effect enhancement
    const cards = document.querySelectorAll('li');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
});