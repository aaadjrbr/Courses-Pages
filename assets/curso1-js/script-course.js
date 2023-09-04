// Smooth scrolling for same-page navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

//For the side menu in small screens

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleModules');
    const modulesList = document.querySelector('.modules-list');

    toggleButton.addEventListener('click', function() {
        modulesList.classList.toggle('show'); // Toggle the show class
    });
});

// Function to check if the screen is too small
function isScreenTooSmall() {
    return window.innerWidth < 768; // Adjust the breakpoint as needed
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
  }