// This file contains JavaScript code for interactivity on the website.
// It includes functionality for the interactive contact form, such as form validation and submission handling.

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (validateForm(name, email, message)) {
                try {
                    saveContactInfo(name, email, message);
                    displayThankYouMessage(name); // Display thank-you message
                    contactForm.reset();
                } catch (error) {
                    console.error('Error saving contact information:', error);
                    alert('Unable to save your contact information. Please try again later.');
                }
            }
        });
    }

    function sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    function validateForm(name, email, message) {
        name = sanitizeInput(name);
        email = sanitizeInput(email);
        message = sanitizeInput(message);

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return false;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function saveContactInfo(name, email, message) {
        const contactInfo = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };

        try {
            const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
            existingContacts.push(contactInfo);
            localStorage.setItem('contacts', JSON.stringify(existingContacts));
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            alert('Unable to save your contact information. Please try again later.');
        }
    }

    function displayThankYouMessage(name) {
        formResponse.textContent = `Thank you for your message, ${name}! We will get back to you soon.`;
        formResponse.style.display = 'block';
        formResponse.setAttribute('aria-live', 'polite'); // Ensure screen readers announce the message
        formResponse.classList.add('thank-you-message');
    }
});