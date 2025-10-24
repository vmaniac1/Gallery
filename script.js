document.addEventListener('DOMContentLoaded', function() {
    VANTA.BIRDS({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xffffff,
        color1: 0x333333,
        color2: 0x666666,
        colorMode: "lerpGradient",
        birdSize: 1.50,
        wingSpan: 20.00,
        separation: 50.00,
        alignment: 30.00,
        cohesion: 50.00,
        quantity: 3.00
    })
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for gallery items
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    
    // Add click event to all gallery images
    document.querySelectorAll('.art-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            // ensure modal image respects responsive CSS
            modalImg.style.width = '';
            modalImg.style.height = '';
            setTimeout(() => modal.classList.add('show'), 10);
        });
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    // Close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars fa-lg"></i>';
document.querySelector('.navbar').insertBefore(menuToggle, navLinks);

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
    }
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animate art sections on scroll
document.querySelectorAll('.art-section').forEach((section, index) => {
    gsap.fromTo(section, 
        {
            opacity: 0,
            rotateX: 20,
            translateZ: -300,
            translateY: 100
        },
        {
            opacity: 1,
            rotateX: 0,
            translateZ: 0,
            translateY: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                toggleActions: "play none none reverse"
            }
        }
    );

    // Parallax effect for images
    gsap.fromTo(section.querySelector('.art-image'), 
        {
            rotateY: -15,
            translateZ: -100
        },
        {
            rotateY: 0,
            translateZ: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
});
