// Enhanced Loading Screen with progress
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initParticles();
    }, 1800);
});

// Particle Background Effect
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || window.innerWidth < 768) return;
    
    const particlesHTML = '<div class="particles" id="particles"></div>';
    hero.insertAdjacentHTML('beforeend', particlesHTML);
    
    const particles = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? '#14b8a6' : '#d4af37'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particles.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .particles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
        @keyframes floatParticle {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(100px, -100px) rotate(90deg); }
            50% { transform: translate(0, -200px) rotate(180deg); }
            75% { transform: translate(-100px, -100px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Navbar Scroll Effect with color change
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar scroll effects
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    
    // Update scroll progress bar with gradient effect
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Change progress bar color based on scroll position
    if (scrolled > 75) {
        scrollProgress.style.background = 'linear-gradient(90deg, #d4af37, #14b8a6)';
    } else {
        scrollProgress.style.background = 'linear-gradient(90deg, #14b8a6, #d4af37)';
    }
});

// Mobile Menu Toggle with animation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Enhanced Theme Toggle with smooth transition
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    
    // Add transition class
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
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

// Enhanced Typing Animation for Hero Subtitle
const typingText = document.getElementById('typingText');
const text = 'Helping you write, build, and publish with confidence.';
let index = 0;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting && index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 60);
    } else if (isDeleting && index > 0) {
        typingText.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeWriter, 30);
    } else if (index === text.length) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 3000);
    } else if (index === 0) {
        isDeleting = false;
        setTimeout(typeWriter, 500);
    }
}

setTimeout(typeWriter, 2200);

// Enhanced Scroll Reveal Animation with stagger
function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 50);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Enhanced Back to Top Button with progress indicator
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
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

// Smooth Scroll for Anchor Links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Service Card Hover Effects with tilt
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-12px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-12px) scale(1.03) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const scrolled = window.scrollY;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
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

// Observe all service modules, cards, and main categories
document.querySelectorAll('.service-module, .service-card, .main-category').forEach(el => {
    observer.observe(el);
});

// Add stagger effect to service cards
const cards = document.querySelectorAll('.service-card');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${(index % 6) * 0.1}s`;
});

// Prevent default link behavior for placeholder Google Drive links
document.querySelectorAll('.sample-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.href.includes('drive.google.com/folder/')) {
            e.preventDefault();
            
            // Show custom notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 30px;
                background: linear-gradient(135deg, #14b8a6, #d4af37);
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
                max-width: 350px;
            `;
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <i class="fas fa-info-circle" style="font-size: 24px;"></i>
                    <div>
                        <strong style="display: block; margin-bottom: 5px;">Sample Link</strong>
                        <span style="font-size: 14px;">Please replace with actual Google Drive folder URL</span>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
    });
});

// Add slide animations to CSS
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(slideStyle);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
    
    // Ctrl/Cmd + K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Ctrl/Cmd + Up Arrow to scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
        e.preventDefault();
        backToTop.click();
    }
});

// Magnetic effect for buttons
const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary');

buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add ripple effect to clickable elements
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

document.querySelectorAll('.btn, .sample-btn, .module-header').forEach(el => {
    el.addEventListener('click', createRipple);
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
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
`;
document.head.appendChild(rippleStyle);

// Lazy loading optimization
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.service-card, .service-module');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Performance optimization - reduce animations on slower devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.floating-card').forEach(card => {
        card.style.animation = 'none';
    });
}

// Console Easter Egg with ASCII Art
console.log('%c' + `
    ╔═══════════════════════════════════════╗
    ║   👋 Welcome to NovaEssay!      ║
    ║   Professional Writing Services       ║
    ╚═══════════════════════════════════════╝
`, 'font-family: monospace; color: #14b8a6; font-size: 12px; font-weight: bold;');

console.log('%c🚀 Interested in the code? Check out our GitHub!', 'font-size: 14px; color: #64748b;');
console.log('%c💡 Keyboard Shortcuts:', 'font-size: 13px; color: #14b8a6; font-weight: bold;');
console.log('%c   • Ctrl/Cmd + K: Toggle theme', 'font-size: 12px; color: #64748b;');
console.log('%c   • Ctrl/Cmd + ↑: Scroll to top', 'font-size: 12px; color: #64748b;');
console.log('%c   • Esc: Close mobile menu', 'font-size: 12px; color: #64748b;');