function adjustInputPosition() {
    // Get the interactive area's height
    let interactiveAreaHeight = document.getElementById('interactive-area').clientHeight;
    let windowWidth = window.innerWidth;

    // Define different translateY percentages based on screen width
    let translateYPercentage = windowWidth > 768 ? 0.035 : 0.015; // Example: 80% for larger screens, 50% for smaller screens

    // Calculate translateY based on the appropriate percentage of the interactive area's height
    let translateY = (interactiveAreaHeight * translateYPercentage) + 'px';

    // Set the CSS variable
    document.documentElement.style.setProperty('--translate-y', translateY);
}
// Call the function on window resize
window.addEventListener('resize', adjustInputPosition);
// Call the function initially to set the position
adjustInputPosition();

// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Getting references to the input field and the submit button
    const input = document.getElementById('dynamic-input');
    const submitButton = document.getElementById('submit-button');

    // Adding a click event listener to the submit button
    submitButton.addEventListener('click', function() {
        handleInput(input.value.trim());
    });

    // Adding a keypress event listener to the input field for the Enter key
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleInput(input.value.trim());
        }
    });
    // Function to handle the input and execute actions based on it
    function handleInput(value) 
    {
        // Converting the input to lowercase for case-insensitivity
        const lowerCaseValue = value.toLowerCase();
        
        // Switch statement to handle different cases
        switch (lowerCaseValue) {
            case 'github':
                // Open GitHub link in a new tab
                window.open('https://github.com/jimmyMsh', '_blank');
                break;
            case 'email':
                // Open email client with your email address
                window.open('mailto:jimmymishan2004@gmail.com', '_blank');
                break;
            case 'resume':
                // Open the resume PDF in a new tab
                window.open('/docs/ResumeFinal.pdf', '_blank');
                break;
            case 'meeting':
                // Open the meeting link in a new tab
                window.open('https://calendly.com/jimmymishan/30min', '_blank');
                break;
            default:
                // Display an alert for invalid input
                alert('Enter valid input - GitHub, Email, Resume, or Meeting');
        }
        input.value = ''; // Clear the input field
        const event = new Event('input'); // Create a new 'input' event
        input.dispatchEvent(event); // Dispatch the event to trigger the typewriter effect
    }
});

// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Array of phrases to cycle through in the typewriter effect
    const phrases = ['Resume', 'GitHub', 'LinkedIn', 'Email', "Meeting"];
    let currentPhrase = 0; // Index of the current phrase
    let currentLetter = 0; // Position of the current letter in the phrase
    let isDeleting = false; // Flag to track whether the script is in deleting mode
    let typingSpeed = 200; // Typing speed in milliseconds
    let typewriterActive = true; // Flag to control whether the typewriter effect is active

    // Get the input element where the effect will be displayed
    const dynamicInput = document.getElementById('dynamic-input');

    // Function to handle the typing effect
    function typeWriter() {
        // Exit the function if the typewriter effect is not active
        if (!typewriterActive) return;

        // Get the current phrase based on the currentPhrase index
        const current = phrases[currentPhrase];

        // Determine the text to display based on whether we are typing or deleting
        let displayText = isDeleting ? current.substring(0, currentLetter--) : current.substring(0, currentLetter++);

        // Set the display text as the placeholder of the input element
        dynamicInput.setAttribute('placeholder', displayText);

        // Handle the end of typing a word, setting a pause before starting to delete
        if (!isDeleting && currentLetter === current.length) {
            setTimeout(() => 
            { isDeleting = true; typingSpeed = 100; }
            , 1000);
        } 
        // Handle the end of deleting a word, moving to the next word
        else if (isDeleting && currentLetter === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 200;
        }

        // Call the typeWriter function again after a delay
        setTimeout(typeWriter, isDeleting ? typingSpeed / 2 : typingSpeed);
    }

    // Start the typewriter effect
    setTimeout(typeWriter, typingSpeed);

    // Event listener for user input in the text field
    dynamicInput.addEventListener('input', function () {
        // Check if the input field is empty
        if (this.value.length === 0) {
            // Resume the typewriter effect if it was stopped and the field is empty
            if (!typewriterActive) {
                typewriterActive = true;
                setTimeout(typeWriter, typingSpeed);
            }
        } 
        else 
        {
            // Stop the typewriter effect when the user starts typing
            typewriterActive = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var calendlyWidget = document.querySelector('.calendly-inline-widget');
    calendlyWidget.style.display = 'none'; // Initialize the widget as hidden

    document.addEventListener('click', function(event) {
        var isClickInsideCalendlyBubble = document.getElementById('calendly-bubble').contains(event.target);
        
        if (!isClickInsideCalendlyBubble) {
            calendlyWidget.style.display = 'none'; // Hide the widget when clicking outside
        }
    });

    document.getElementById('calendly-bubble').addEventListener('click', function(event) {
        // Toggle visibility of the widget when the bubble is clicked
        calendlyWidget.style.display = calendlyWidget.style.display === 'none' ? 'block' : 'none';
        event.stopPropagation(); // Prevent the document click event from firing
    });
});