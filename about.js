// Enhanced Navbar and Scroll Progress
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    
    // Update scroll progress bar
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
    
    // Add smooth transition
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

// Enhanced Scroll Reveal Animation
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

// Animate Skill Progress Bars with enhanced timing
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach((bar, index) => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100 && bar.style.width === '0px' || bar.style.width === '') {
            const targetWidth = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 200 + (index * 100));
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Enhanced Testimonials Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const indicators = document.querySelectorAll('.indicator');
const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showTestimonial(index) {
    // Remove active class from all
    testimonials.forEach(card => card.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to current
    testimonials[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Move track with smooth animation
    testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Indicator click handlers
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-advance testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 6000);

// Pause auto-advance on hover
const testimonialCarousel = document.querySelector('.testimonials-carousel');
if (testimonialCarousel) {
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialCarousel.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 6000);
    });
}

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (testimonialsTrack) {
    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - prev
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
}

// Enhanced Counter Animation for Stats with easing
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500;
    const start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (target - start) * easedProgress);
        
        element.textContent = current + (element.getAttribute('data-target') === '98' ? '%' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.getAttribute('data-target') === '98' ? '%' : '+');
        }
    }

    requestAnimationFrame(updateCounter);
}

// Trigger counter animation when stats section is visible
let statsAnimated = false;

function checkStatsVisibility() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && !statsAnimated) {
        statsAnimated = true;
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                animateCounter(stat);
            }, index * 200);
        });
    }
}

window.addEventListener('scroll', checkStatsVisibility);
window.addEventListener('load', checkStatsVisibility);

// Enhanced Back to Top Button
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
document.querySelectorAll('.intro-image, .intro-text, .skill-category, .timeline-item, .stat-card').forEach(el => {
    observer.observe(el);
});

// Add stagger effect to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// Enhanced hover effects for timeline items
timelineItems.forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    
    item.addEventListener('mouseenter', () => {
        if (dot) {
            dot.style.transform = 'translateX(-50%) scale(1.3)';
            dot.style.boxShadow = '0 0 0 10px rgba(20, 184, 166, 0.3)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        if (dot) {
            dot.style.transform = 'translateX(-50%) scale(1)';
            dot.style.boxShadow = '0 0 0 6px rgba(20, 184, 166, 0.2)';
        }
    });
});

// Keyboard navigation support
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
    
    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    }
    if (e.key === 'ArrowRight') {
        nextBtn.click();
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

// Smooth scroll for anchor links
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

// Add parallax effect to about hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.about-hero');
    const scrolled = window.scrollY;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skill category hover effects
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach(category => {
    category.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    category.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

document.querySelectorAll('.btn, .carousel-btn').forEach(el => {
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

// Star twinkle animation setup
const stars = document.querySelectorAll('.stars i');
stars.forEach((star, index) => {
    star.style.setProperty('--i', index);
});

// Performance optimization - reduce animations on slower devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.floating-card, .stat-card i').forEach(el => {
        el.style.animation = 'none';
    });
}

// Lazy loading optimization
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.skill-category, .timeline-item');
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

// Console Easter Egg
console.log('%c' + `
    ╔═══════════════════════════════════════╗
    ║   ✨ About NovaEssay            ║
    ║   Discover Our Expertise              ║
    ╚═══════════════════════════════════════╝
`, 'font-family: monospace; color: #14b8a6; font-size: 12px; font-weight: bold;');

console.log('%c🎯 Page Features:', 'font-size: 13px; color: #14b8a6; font-weight: bold;');
console.log('%c   • Animated skill progress bars', 'font-size: 12px; color: #64748b;');
console.log('%c   • Interactive timeline', 'font-size: 12px; color: #64748b;');
console.log('%c   • Auto-rotating testimonials', 'font-size: 12px; color: #64748b;');
console.log('%c   • Counting statistics', 'font-size: 12px; color: #64748b;');
console.log('%c💡 Keyboard Shortcuts:', 'font-size: 13px; color: #14b8a6; font-weight: bold;');
console.log('%c   • ← / →: Navigate testimonials', 'font-size: 12px; color: #64748b;');
console.log('%c   • Ctrl/Cmd + K: Toggle theme', 'font-size: 12px; color: #64748b;');
console.log('%c   • Ctrl/Cmd + ↑: Scroll to top', 'font-size: 12px; color: #64748b;');