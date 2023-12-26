// Function to check overlap between two elements (the bubble and the interactive area)
function isOverlapping(element1, element2) {
    // get the position of the two elements
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    // return false if the elements don't overlap - otherwise, return true
    return !(rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom || 
            rect1.right < rect2.left || 
            rect1.left > rect2.right);
}

// Function to adjust the position of the input field based on window size
function adjustInputPosition() {
    // Get the interactive area height and window width
    const interactiveAreaHeight = document.getElementById('interactive-area').clientHeight;
    const windowWidth = window.innerWidth;
    
    // Define different translateY percentages based on screen width
    const translateYPercentage = windowWidth > 768 ? 0.035 : 0.015;
    
    // Calculate translateY based on the interactive area's height
    const translateY = (interactiveAreaHeight * translateYPercentage) + 'px';
    
    // Set the CSS variable to adjust the position
    document.documentElement.style.setProperty('--translate-y', translateY);
}

// Wait until the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle the user input and perform actions accordingly
    handleUserInput();

    // Function to handle the typing animation effect
    handleTypeWriterEffect();

    // Function to handle the behavior of the Calendly widget
    handleCalendlyWidget();

    // Function to handle the focus and blur of the input field
    handleInputFocusAndBlur();
    
});
    
// function to handle the click and keypress events for user input
function handleUserInput() {
    // Get references to the input field and the submit button
    const input = document.getElementById('dynamic-input');
    const submitButton = document.getElementById('submit-button');

    // Add click event listener to the submit button
    submitButton.addEventListener('click', function() {
        processInput(input.value.trim());
    });

    // Add keypress event listener to the input field
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') 
        {
            processInput(input.value.trim());
        }
    });
}

// function to handle the input and execute actions based on it
function processInput(value) {
    // Convert the input to lowercase for case-insensitivity
    const lowerCaseValue = value.toLowerCase();

    // Handle different cases
    switch (lowerCaseValue) {
        case 'github':
            // Open GitHub link in a new tab
            window.open('https://github.com/jimmyMsh', '_blank');
            break;
        case 'email':
            // Open email client with email address
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
        case 'linkedin':
            //Open LinkedIn link in a new tab
            window.open('https://www.linkedin.com/in/jimmy-mishan-1442ba264/', '_blank');
            break;
        default:
            // Alert for invalid input
            alert('Enter valid input - GitHub, Email, Resume, or Meeting');
    }
    // Clear the input field after executing action
    const input = document.getElementById('dynamic-input');
    input.value = '';
    const event = new Event('input');
    input.dispatchEvent(event); // Trigger the typewriter effect again
}

// Function to handle the typing animation effect
function handleTypeWriterEffect() {
    // Array of phrases to cycle through in the typewriter effect
    const phrases = ['Resume', 'GitHub', 'LinkedIn', 'Email', "Meeting"];
    let currentPhrase = 0; // Index of the current phrase
    let currentLetter = 0; // Position of the current letter in the phrase
    let isDeleting = false; // Flag if in deleting mode
    let typingSpeed = 200; // Typing speed in milliseconds
    let typewriterActive = true; // Flag to control whether the typewriter effect is active

    // Reference to the input element where the effect will be displayed
    const dynamicInput = document.getElementById('dynamic-input');
     
    // Add event listener for user input in the text field
    dynamicInput.addEventListener('input', function () {
        // Check if the input field is empty
        if (this.value.length === 0) 
        {
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

    // Start the typewriter effect
    setTimeout(typeWriter, typingSpeed);
}

// function for typing effect
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
    if (!isDeleting && currentLetter === current.length) 
    {
        setTimeout(() => { isDeleting = true; typingSpeed = 100; }, 1000);
    } 
    // Handle the end of deleting a word, moving to the next word
    else if (isDeleting && currentLetter === 0) 
    {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 200;
    }

    // Call the typeWriter function again after a delay
    setTimeout(typeWriter, isDeleting ? typingSpeed / 2 : typingSpeed);
}

// function to handle the display of the Calendly widget
function handleCalendlyWidget() {
    var calendlyWidget = document.querySelector('.calendly-inline-widget');
    calendlyWidget.style.display = 'none'; // Initialize the widget as hidden

    document.addEventListener('click', function(event) {
        var isClickInsideCalendlyBubble = document.getElementById('calendly-bubble').contains(event.target);
        
        if (!isClickInsideCalendlyBubble) 
        {
            calendlyWidget.style.display = 'none'; // Hide the widget when clicking outside
        }
    });

    document.getElementById('calendly-bubble').addEventListener('click', function(event) {
        // Toggle visibility of the widget when the bubble is clicked
        calendlyWidget.style.display = calendlyWidget.style.display === 'none' ? 'block' : 'none';
        event.stopPropagation(); // Prevent the document click event from firing
    });
}

// function to handle the focus and blur of the input field
function handleInputFocusAndBlur() {
    // Access the input element and the Calendly bubble
    var inputArea = document.querySelector("#dynamic-input");
    var calendlyBubble = document.querySelector("#calendly-bubble");

    // Add focus event listener to the input area
    inputArea.addEventListener('focus', function handleFocus(){
        var interactiveArea = document.querySelector("#interactive-area");
        
        // Only change position if the calendlyBubble overlaps with the interactiveArea
        if (isOverlapping(calendlyBubble, interactiveArea)) 
        {
            // Store the original position
            calendlyBubble.dataset['originalPosition'] = calendlyBubble.style.bottom;
        
            // Increase bottom property to move the Calendly bubble
            calendlyBubble.style.bottom = (window.innerHeight - inputArea.getBoundingClientRect().bottom - 400) + "px";
        }
    });

    // Add blur event listener to the input area
    inputArea.addEventListener('blur', function handleBlur()
    {
        // Reset the bottom property of the Calendly bubble to its original position
        calendlyBubble.style.bottom = calendlyBubble.dataset['originalPosition'];   
    });
}

// Call the function to adjust the input position on window resize and initially
window.addEventListener('resize', adjustInputPosition);
adjustInputPosition();