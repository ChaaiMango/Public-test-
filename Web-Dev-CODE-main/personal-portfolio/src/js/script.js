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

    function validateForm(name, email, message) {
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

        const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        existingContacts.push(contactInfo);
        localStorage.setItem('contacts', JSON.stringify(existingContacts));
    }

    function displayThankYouMessage(name) {
        formResponse.textContent = `Thank you for your message, ${name}! We will get back to you soon.`;
        formResponse.style.display = 'block';
        formResponse.classList.add('thank-you-message'); // Apply CSS class
    }
});