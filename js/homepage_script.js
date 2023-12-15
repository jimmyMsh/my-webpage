// Additional JS code for more interactivity can be added here
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var welcomeScreen = document.getElementById('welcomeScreen');
        welcomeScreen.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(function() {
            welcomeScreen.style.display = 'none';
        }, 700); // This controls the fade-out duration
    }, 500); // This controls how long the welcome screen is displayed
});

// Event listener for 'Home' button
document.getElementById('homeButton').addEventListener('click', function() {
    // Create a full-screen black overlay div
    var blackOverlay = document.createElement('div');
    blackOverlay.style.position = 'fixed';
    blackOverlay.style.top = '0';
    blackOverlay.style.left = '0';
    blackOverlay.style.width = '100%';
    blackOverlay.style.height = '100vh';
    blackOverlay.style.backgroundColor = 'black';
    blackOverlay.style.zIndex = '9999';
    blackOverlay.style.opacity = '0';
    blackOverlay.style.transition = 'opacity 0.5s ease';

    // Append the black overlay to the body
    document.body.appendChild(blackOverlay);

    // Start the fade-in animation
    setTimeout(() => {
        blackOverlay.style.opacity = '1';
    }, 10);

    // After the animation, redirect to the next page
    setTimeout(() => {
        window.location.href = '/main.html'; // Change to the actual URL of your next page
    }, 1000); // This should be greater than the fade-in animation duration
});
