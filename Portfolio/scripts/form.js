// Form handling functionality
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (!contactForm || !formMessage) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form data
    if (!firstName || !lastName || !contact || !message) {
      showFormMessage('error', 'Please fill in all fields');
      return;
    }
    
    // Validate email or Discord format
    if (contact.includes('@') && !isValidEmail(contact)) {
      showFormMessage('error', 'Please enter a valid email address');
      return;
    }
    
    // Prepare form data for submission
    const formData = {
      firstName,
      lastName,
      contact,
      comments: message
    };
    
    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span>';
    submitButton.disabled = true;
    
    try {
      // Submit form data
      const response = await fetch('https://zykros-cabin-bot-zykros-cabin.up.railway.app/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success
        showFormMessage('success', data.message || 'Message sent successfully! I will get back to you soon.');
        contactForm.reset();
      } else {
        // API error
        showFormMessage('error', data.message || 'There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      // Network error
      console.error('Error submitting form:', error);
      showFormMessage('error', 'Network error. Please try again or contact me via Discord: hypedzykro');
    } finally {
      // Restore button state
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  });
  
  // Validate input as the user types
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateInput(this);
    });
    
    input.addEventListener('input', function() {
      // Remove error styling when user starts typing again
      if (this.classList.contains('error')) {
        this.classList.remove('error');
      }
    });
  });
}

// Helper functions
function showFormMessage(type, message) {
  const formMessage = document.getElementById('formMessage');
  
  if (!formMessage) return;
  
  formMessage.textContent = message;
  formMessage.className = 'form-message';
  formMessage.classList.add(type);
  formMessage.style.display = 'block';
  
  // Scroll to message
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide message after 5 seconds if it's a success message
  if (type === 'success') {
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
}

function validateInput(input) {
  if (input.required && input.value.trim() === '') {
    input.classList.add('error');
    return false;
  }
  
  if (input.id === 'contact' && input.value.includes('@') && !isValidEmail(input.value)) {
    input.classList.add('error');
    return false;
  }
  
  input.classList.remove('error');
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}