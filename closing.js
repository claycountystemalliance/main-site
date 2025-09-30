// Clay County STEM Alliance - Mobile Navigation & Interaction Scripts
// Add this to the bottom of each HTML page before closing </body> tag

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    // Only run mobile menu code if elements exist
    if (mobileMenuToggle && navLinks && mobileMenuOverlay) {
        function toggleMobileMenu() {
            navLinks.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }
        
        function closeMobileMenu() {
            navLinks.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when overlay is clicked
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking the X or any link
        navLinks.addEventListener('click', function(e) {
            // Close if clicking directly on the nav-links (the X area)
            if (e.target === navLinks) {
                closeMobileMenu();
            }
            // Close after clicking any link
            if (e.target.tagName === 'A') {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Animation on scroll (optional - for program cards, etc.)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe program cards and other elements (only if they exist)
    const animatedElements = document.querySelectorAll('.program-card, .involvement-card, .donation-card');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});