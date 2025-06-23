// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initializeHeader();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeForms();
});

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled', 'bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            header.classList.remove('header-scrolled', 'bg-white/95', 'backdrop-blur-sm', 'shadow-lg');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('[data-lucide="menu"]');
    const closeIcon = mobileMenuBtn.querySelector('[data-lucide="x"]');
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('fade-in');
            // Change icon to X
            mobileMenuBtn.innerHTML = '<i data-lucide="x" class="h-6 w-6"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('fade-in');
            // Change icon back to menu
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
        }
        
        // Reinitialize icons after changing
        lucide.createIcons();
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('fade-in');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
            lucide.createIcons();
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.group, .card-hover, section > div > div');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form handling
function initializeForms() {
    const contactForm = document.querySelector('#contact form');
    const newsletterForms = document.querySelectorAll('form, .newsletter-form');
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
    
    // Newsletter subscription
    const newsletterInputs = document.querySelectorAll('input[type="email"][placeholder*="email"]');
    newsletterInputs.forEach(input => {
        const form = input.closest('div');
        const button = form.querySelector('button');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleNewsletterSubscription(input.value);
            });
        }
    });
}

// Handle contact form submission
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i data-lucide="loader-2" class="h-5 w-5 loading"></i><span>Sending...</span>';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Reinitialize icons
        lucide.createIcons();
    }, 2000);
}

// Handle newsletter subscription
function handleNewsletterSubscription(email) {
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
    }, 1000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification style based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="h-5 w-5"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Initialize icons
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Add scroll-based animations
window.addEventListener('scroll', throttle(function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 10));

// Handle button clicks
document.addEventListener('click', function(e) {
    // Handle CTA buttons
    if (e.target.matches('.btn-primary, .btn-secondary') || e.target.closest('.btn-primary, .btn-secondary')) {
        const button = e.target.matches('.btn-primary, .btn-secondary') ? e.target : e.target.closest('.btn-primary, .btn-secondary');
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    // Handle quick contact buttons
    if (e.target.matches('button') && e.target.textContent.includes('Call Now')) {
        window.location.href = 'tel:+919876543210';
    }
    
    if (e.target.matches('button') && e.target.textContent.includes('WhatsApp')) {
        window.open('https://wa.me/919876543210', '_blank');
    }
});

// Add loading states for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('fade-in');
        });
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIg';
            this.alt = 'Image not available';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="h-6 w-6"></i>';
            lucide.createIcons();
        }
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    initializeLazyLoading();
}

// Add print functionality
function printPage() {
    window.print();
}

// Add share functionality
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        });
    }
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const main = document.querySelector('main') || document.querySelector('#main-content');
    if (main) {
        main.id = 'main-content';
        main.setAttribute('role', 'main');
    }
    
    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
});

// Add error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error reporting service
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error reporting service
});