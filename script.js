// Initialize Vanta Birds background
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize VANTA only on home page
            if (document.getElementById('vanta-background')) {
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
                });
            }

            // Mobile menu functionality for all pages
            const navLinks = document.querySelector('.nav-links');
            let menuToggle = document.querySelector('.menu-toggle');
            
            // Create menu toggle if it doesn't exist
            if (!menuToggle && navLinks) {
                menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '<i class="fas fa-bars fa-lg"></i>';
                menuToggle.setAttribute('aria-label', 'Toggle menu');
                document.querySelector('.navbar').insertBefore(menuToggle, navLinks);
            }

            // Toggle menu on button click
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navLinks.classList.toggle('active');
                    
                    // Change icon
                    const icon = menuToggle.querySelector('i');
                    if (navLinks.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });

                // Close menu when clicking on a link
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });

        // Modal functionality
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close-modal');

        if (modal && modalImg && closeBtn) {
            document.querySelectorAll('.art-image img').forEach(img => {
                img.style.cursor = 'pointer';
                
                // Click event for desktop
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                    setTimeout(() => modal.classList.add('show'), 10);
                });
                
                // Touch event for mobile
                img.addEventListener('touchend', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                    setTimeout(() => modal.classList.add('show'), 10);
                });
            });

            function closeModal() {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }

            closeBtn.addEventListener('click', closeModal);
            closeBtn.addEventListener('touchend', closeModal);

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    closeModal();
                }
            });
        }

        // GSAP animations
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            document.querySelectorAll('.art-section').forEach((section) => {
                gsap.fromTo(section, 
                    {
                        opacity: 0,
                        y: 100
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "top 30%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }