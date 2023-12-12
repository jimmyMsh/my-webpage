// Event listener for 'Home' button
document.getElementById('homeButton').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => {
        window.location.href = '/'; // Redirects to the homepage
    }, 300); // Delay for animation

    // Potential additional interactive feature:
    // For example, a toast message saying "Welcome back to the homepage!"
});

// Additional JS code for more interactivity can be added here
