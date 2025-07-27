// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(238, 239, 231, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(112, 52, 14, 0.1)';
        } else {
            navbar.style.background = 'rgba(238, 239, 231, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .stat, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mock app preview interactions
    const convertButtons = document.querySelectorAll('.convert-btn');
    convertButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const conversions = {
                '→ cups': '→ grams',
                '→ grams': '→ cups',
                '→ fl oz': '→ ml',
                '→ ml': '→ fl oz'
            };
            
            this.textContent = conversions[this.textContent] || this.textContent;
            
            // Add a little bounce animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const phoneScreen = document.querySelector('.phone-screen');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (phoneScreen && scrolled < window.innerHeight) {
            phoneScreen.style.transform = `translateY(${scrolled * -0.2}px)`;
        }
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const radius = Math.max(button.clientWidth, button.clientHeight);
        const diameter = radius * 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Kitchen scene animations
    const kitchenIngredients = document.querySelectorAll('.ingredient-item');
    kitchenIngredients.forEach((ingredient, index) => {
        ingredient.style.animationDelay = `${index * 0.2}s`;
        ingredient.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // Mock download button functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.querySelector('strong').textContent;
            
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--primary);
                color: var(--cream);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            notification.textContent = `${platform} app coming soon! 🚀`;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Animate out and remove
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });

    // Add loading state to primary buttons
    const primaryButtons = document.querySelectorAll('.primary-button');
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Download Pantry') {
                const originalText = this.textContent;
                this.textContent = 'Coming Soon...';
                this.style.background = 'var(--secondary)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'var(--primary)';
                }, 2000);
            }
        });
    });

    // Demo button functionality
    const demoButton = document.querySelector('.secondary-button');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            // Scroll to the phone mockup and add attention animation
            const phoneMockup = document.querySelector('.phone-mockup');
            if (phoneMockup) {
                phoneMockup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add pulse animation
                phoneMockup.style.animation = 'pulse 1s ease-in-out 3';
                
                const pulseStyle = document.createElement('style');
                pulseStyle.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(pulseStyle);
                
                setTimeout(() => {
                    phoneMockup.style.animation = '';
                }, 3000);
            }
        });
    }

    // Add stagger animation to feature cards
    const featureCardsStagger = document.querySelectorAll('.feature-card');
    featureCardsStagger.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    console.log('🍳 Pantry landing page loaded successfully!');
});
