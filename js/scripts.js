// Enhanced smooth scrolling
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

// Mobile navigation toggle
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navbar = document.getElementById('navbar');

mobileNavToggle?.addEventListener('click', function() {
    navbar.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile nav when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
        const toggleIcon = mobileNavToggle.querySelector('i');
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        navbar.classList.remove('active');
        const toggleIcon = mobileNavToggle.querySelector('i');
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
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

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('.section-content').forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Skill tag hover effects with random colors
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        const colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c', '#ca8a04'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.background = randomColor;
        this.style.color = 'white';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.background = '';
        this.style.color = '';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 100);
    }
});

// Enhanced loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Stagger animation delays for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Stagger animation delays for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Add smooth transitions for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add transition classes after DOM is loaded
    setTimeout(() => {
        document.body.classList.add('transitions-enabled');
    }, 100);
});
