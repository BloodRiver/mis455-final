document.addEventListener('DOMContentLoaded', function() {
    // Get elements for Navbar and Sidebar
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('overlay');
    const mainContent = document.getElementById('mainContent');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        mainContent.classList.toggle('dimmed');
    }

    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        mainContent.classList.remove('dimmed');
    }

    // Toggle profile dropdown function
    function toggleProfileDropdown() {
        profileDropdown.classList.toggle('active');
    }

    // Event Listeners for Navbar and Sidebar
    hamburgerBtn.addEventListener('click', toggleSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar); // Close sidebar when clicking overlay

    profileBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from bubbling up and closing immediately
        toggleProfileDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!profileDropdown.contains(event.target) && !profileBtn.contains(event.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // Ensure sidebar closes on resize if it becomes desktop view and open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});