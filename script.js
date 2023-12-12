// Event listener for 'Home' button
document.getElementById('homeButton').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => {
        window.location.href = '/'; // Redirects to the homepage
    }, 300); // Delay for animation

    // Potential additional interactive feature:
    // For example, a toast message saying "Welcome back to the homepage!"
});

// Animation for the profile image on load
window.onload = function() {
    document.querySelector('.profile-image').classList.add('fadeIn');
};
// Additional JS code for more interactivity can be added here
