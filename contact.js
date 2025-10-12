// Navbar and Scroll Progress
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    // Update scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Theme Toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation Functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject !== '';
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show Error Function
function showError(input, errorId, message) {
    const formGroup = input.parentElement;
    const errorElement = document.getElementById(errorId);
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    
    // Add shake animation
    input.style.animation = 'shake 0.3s';
    setTimeout(() => {
        input.style.animation = '';
    }, 300);
}

// Clear Error Function
function clearError(input, errorId) {
    const formGroup = input.parentElement;
    const errorElement = document.getElementById(errorId);
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time Validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'nameError', 'Please enter a valid name (at least 2 characters)');
    } else {
        clearError(nameInput, 'nameError');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Please enter a valid email address');
    } else {
        clearError(emailInput, 'emailError');
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'subjectError', 'Please select a subject');
    } else {
        clearError(subjectInput, 'subjectError');
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'messageError', 'Please enter a message (at least 10 characters)');
    } else {
        clearError(messageInput, 'messageError');
    }
});

// Clear errors on input
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorId = input.id + 'Error';
        clearError(input, errorId);
    });
});

// Form Submit Handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear all previous errors
    clearError(nameInput, 'nameError');
    clearError(emailInput, 'emailError');
    clearError(subjectInput, 'subjectError');
    clearError(messageInput, 'messageError');
    
    let isValid = true;
    
    // Validate all fields
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'nameError', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'subjectError', 'Please select a subject');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'messageError', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.classList.add('show');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form after 3 seconds and show it again
            setTimeout(() => {
                contactForm.reset();
                successMessage.classList.remove('show');
                contactForm.style.display = 'flex';
            }, 5000);
        }, 1500);
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Advanced Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.contact-form-wrapper, .contact-info-wrapper, .faq-item').forEach(el => {
    observer.observe(el);
});

// Add stagger effect to FAQ items
faqItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add stagger effect to info cards
const infoCards = document.querySelectorAll('.info-card');
infoCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 500 + (index * 100));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Ctrl/Cmd + K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add floating animation to form inputs
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Clickable Info Cards - Email and WhatsApp
const clickableCards = document.querySelectorAll('.clickable-card');

clickableCards.forEach(card => {
    card.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        
        if (action === 'email') {
            // Open Gmail compose with recipient
            const email = 'ritujain7991@gmail.com';
            const subject = 'Inquiry from Website';
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}`;
            window.open(gmailUrl, '_blank');
        } else if (action === 'whatsapp') {
            // Open WhatsApp chat - Replace with your actual WhatsApp number
            // Format: country code + number (no spaces, dashes, or plus sign)
            const phoneNumber = '+447593968598'; // Replace with your actual number
            const message = 'Hello! I would like to inquire about your services.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    });
    
    // Add visual feedback on click
    card.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-5px) scale(0.98)';
    });
    
    card.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-8px) scale(1)';
    });
});

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Character counter for message textarea
const maxChars = 500;
messageInput.setAttribute('maxlength', maxChars);

const charCounter = document.createElement('div');
charCounter.style.cssText = 'text-align: right; font-size: 12px; color: var(--text-secondary); margin-top: 5px;';
messageInput.parentElement.appendChild(charCounter);

function updateCharCounter() {
    const remaining = maxChars - messageInput.value.length;
    charCounter.textContent = `${messageInput.value.length}/${maxChars} characters`;
    
    if (remaining < 50) {
        charCounter.style.color = 'var(--error-color)';
    } else {
        charCounter.style.color = 'var(--text-secondary)';
    }
}

messageInput.addEventListener('input', updateCharCounter);
updateCharCounter(); // Initial call

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

const buttons = document.querySelectorAll('.btn, .social-btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        background-color: rgba(255, 255, 255, 0.5);
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .social-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Console message
console.log('%c📧 Contact Page Loaded', 'font-size: 16px; color: #14b8a6; font-weight: bold;');
console.log('%cWe\'re excited to hear from you!', 'font-size: 14px; color: #64748b;');