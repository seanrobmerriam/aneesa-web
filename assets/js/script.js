// Therapist Website JavaScript
// Author: Generated for therapist private practice website
// Features: Contact form handling, smooth scrolling, navigation interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initSmoothScrolling();
    initContactForm();
    initNavigation();
    initLoadAnimations();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Contact form handling and validation
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        const validation = validateForm(formData);
        
        if (validation.isValid) {
            handleFormSubmission(formData);
        } else {
            showFormErrors(validation.errors);
        }
    });
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

/**
 * Validate individual form field
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${capitalize(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (fieldName === 'phone' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate entire form
 */
function validateForm(data) {
    const errors = [];
    
    // Required field validation
    if (!data.name) errors.push('Name is required.');
    if (!data.email) errors.push('Email is required.');
    if (!data.message) errors.push('Message is required.');
    
    // Email format validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address.');
    }
    
    // Phone format validation (optional)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Handle form submission
 */
function handleFormSubmission(data) {
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // For demo purposes, we'll just show a success message
        // In a real implementation, you would send data to your server
        showSuccessMessage();
        resetForm();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
    
    // Log form data for development (remove in production)
    console.log('Form submitted with data:', data);
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #c3e6cb;
        ">
            <strong>Thank you!</strong> Your message has been sent successfully. 
            I'll get back to you within 24-48 hours.
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

/**
 * Show form validation errors
 */
function showFormErrors(errors) {
    const form = document.getElementById('contact-form');
    
    // Remove existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message container
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="
            background: #f8d7da;
            color: #721c24;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #f5c6cb;
        ">
            <strong>Please correct the following errors:</strong>
            <ul style="margin: 0.5rem 0 0 1.5rem;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
}

/**
 * Show error for specific field
 */
function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.style.color = '#dc3545';
    errorSpan.style.fontSize = '0.875rem';
    errorSpan.style.marginTop = '0.25rem';
    errorSpan.style.display = 'block';
    errorSpan.textContent = message;
    
    field.parentNode.appendChild(errorSpan);
}

/**
 * Clear field error styling and messages
 */
function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Reset form to initial state
 */
function resetForm() {
    const form = document.getElementById('contact-form');
    form.reset();
    
    // Clear any error messages
    const errorMessages = form.querySelectorAll('.error-message, .field-error');
    errorMessages.forEach(error => error.remove());
    
    // Reset field styling
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

/**
 * Navigation enhancements
 */
function initNavigation() {
    // Add active navigation highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavLink, 10);
    });
}

/**
 * Initialize load animations
 */
function initLoadAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and other animated elements
    const animatedElements = document.querySelectorAll('.service-card, .method, .about-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Utility functions
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\(]?[\d]{3}[\)]?[\s\-]?[\d]{3}[\s\-]?[\d]{4}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--secondary-color) !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('JavaScript error:', e.message);
});

// Export functions for potential testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        validateForm
    };
}