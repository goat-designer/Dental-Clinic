// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const servicesDropdownBtn = document.getElementById('services-dropdown-btn');
    const servicesDropdown = document.getElementById('services-dropdown');
    
    // Toggle mobile menu
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Toggle services dropdown in mobile menu
    if (servicesDropdownBtn && servicesDropdown) {
        servicesDropdownBtn.addEventListener('click', function() {
            servicesDropdown.classList.toggle('hidden');
            
            // Find the SVG icon within the button and rotate it
            const icon = servicesDropdownBtn.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Handle responsive navigation for different screen sizes
    const checkScreenSize = function() {
        if (window.innerWidth >= 768) { // md breakpoint
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    };
    
    // Check on load
    checkScreenSize();
    
    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Account for fixed header
                const headerOffset = 80; // Approximate header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.classList.add('error-message', 'text-red-600', 'text-xs', 'mt-1');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('border-red-500');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = emailField.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('p');
                        errorMsg.classList.add('error-message', 'text-red-600', 'text-xs', 'mt-1');
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            if (isValid) {
                // Display success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-4');
                successMessage.innerHTML = `
                    <strong class="font-bold">Success!</strong>
                    <span class="block sm:inline">Your message has been sent. We'll contact you shortly.</span>
                `;
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Remove validation styling on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('border-red-500');
                
                // Remove error message if it exists
                const errorMsg = this.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                // Toggle current item
                answer.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon');
                        
                        if (otherAnswer && !otherAnswer.classList.contains('hidden')) {
                            otherAnswer.classList.add('hidden');
                            otherIcon.classList.remove('rotate-180');
                        }
                    }
                });
            });
        }
    });

    // Handle image loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        // Add a placeholder background color until image loads
        img.style.backgroundColor = '#f3f4f6';
        
        // Add a load event listener to remove the background when loaded
        img.addEventListener('load', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // Error handling - if image fails to load
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#f3f4f6';
            this.alt = 'Image failed to load';
        });
    });
    
    // Add responsive handling for viewport changes
    const handleViewportChange = () => {
        // Handle any specific responsive behaviors here
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
        
        // Adjust any elements that need special handling on different devices
        if (isMobile) {
            // Mobile specific adjustments
            document.querySelectorAll('.mobile-stack').forEach(el => {
                el.classList.add('flex-col');
            });
        } else {
            // Tablet and desktop adjustments
            document.querySelectorAll('.mobile-stack').forEach(el => {
                el.classList.remove('flex-col');
            });
        }
    };
    
    // Run on load
    handleViewportChange();
    
    // And on resize
    window.addEventListener('resize', handleViewportChange);
}); 