// Vibes Enhanced - Interactive Script
class VibesSlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.isPlaying = true;
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds per slide
        this.progressBar = document.getElementById('progressBar');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startSlideshow();
        this.initializeProgressBar();
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupTouchGestures();
    }

    setupEventListeners() {
        // Control buttons
        const playPauseBtn = document.getElementById('playPause');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');

        playPauseBtn?.addEventListener('click', () => this.togglePlayPause());
        prevBtn?.addEventListener('click', () => this.previousSlide());
        nextBtn?.addEventListener('click', () => this.nextSlide());

        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));

        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('blur', () => this.pauseSlideshow());
        window.addEventListener('focus', () => this.resumeSlideshow());

        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        ctaButton?.addEventListener('click', () => this.handleCTAClick());
    }

    startSlideshow() {
        this.slideInterval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, this.slideDuration);
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    pauseSlideshow() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    resumeSlideshow() {
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayPauseButton();
        
        if (this.isPlaying && !this.slideInterval) {
            this.startSlideshow();
        }
    }

    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('playPause');
        if (!playPauseBtn) return;

        const icon = this.isPlaying 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        
        playPauseBtn.innerHTML = icon;
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlideshow();
    }

    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.updateSlideshow();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlideshow();
    }

    updateSlideshow() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
            
            // Add entrance animation
            if (index === this.currentSlide) {
                slide.style.animation = 'slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Reset and start progress bar
        this.resetProgressBar();
        
        // Update slide content with animation
        this.animateSlideContent();
    }

    initializeProgressBar() {
        if (!this.progressBar) return;
        
        this.progressBar.style.width = '0%';
        this.startProgressAnimation();
    }

    startProgressAnimation() {
        if (!this.progressBar) return;
        
        this.progressBar.style.transition = `width ${this.slideDuration}ms linear`;
        this.progressBar.style.width = '100%';
    }

    resetProgressBar() {
        if (!this.progressBar) return;
        
        this.progressBar.style.transition = 'none';
        this.progressBar.style.width = '0%';
        
        // Force reflow
        this.progressBar.offsetHeight;
        
        if (this.isPlaying) {
            setTimeout(() => this.startProgressAnimation(), 50);
        }
    }

    animateSlideContent() {
        const activeSlide = this.slides[this.currentSlide];
        const content = activeSlide?.querySelector('.slide-content');
        
        if (content) {
            content.style.animation = 'contentSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both';
        }
    }

    handleKeyboardNavigation(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.slides.length - 1);
                break;
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target.classList.contains('slideshow-container')) {
                    if (entry.isIntersecting) {
                        this.resumeSlideshow();
                    } else {
                        this.pauseSlideshow();
                    }
                }
            });
        }, { threshold: 0.5 });

        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            observer.observe(slideshowContainer);
        }
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.orb');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    setupTouchGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!slideshowContainer) return;

        slideshowContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        slideshowContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > 50) { // Minimum swipe distance
                    if (deltaX > 0) {
                        this.nextSlide();
                    } else {
                        this.previousSlide();
                    }
                }
            }
        }, { passive: true });
    }

    handleResize() {
        // Adjust layout based on screen size
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        if (window.innerWidth <= 1024 && slideshowWrapper) {
            slideshowWrapper.style.gridTemplateColumns = '1fr';
        } else if (slideshowWrapper) {
            slideshowWrapper.style.gridTemplateColumns = '1fr 300px';
        }
    }

    handleCTAClick() {
        // Smooth scroll to slideshow
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
        
        // Add visual feedback
        this.addRippleEffect(event.target);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Utility functions
class VibesUtils {
    static addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: scale(1.1);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes contentSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    static preloadImages() {
        const imageUrls = [
            'https://raw.githubusercontent.com/ESousa97/Vibes/9f9c8021befca2127520a398554d78d3015ffda2/Assets/nature1.png',
            'https://raw.githubusercontent.com/ESousa97/Vibes/9f9c8021befca2127520a398554d78d3015ffda2/Assets/nature2.png',
            'https://raw.githubusercontent.com/ESousa97/Vibes/9f9c8021befca2127520a398554d78d3015ffda2/Assets/nature3.png',
            'https://raw.githubusercontent.com/ESousa97/Vibes/9f9c8021befca2127520a398554d78d3015ffda2/Assets/nature4.png'
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    static setupPerformanceOptimizations() {
        // Optimize animations for better performance
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.style.willChange = 'transform, opacity';
        });

        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    static setupAccessibility() {
        // Add ARIA labels
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.setAttribute('role', 'region');
            slideshowContainer.setAttribute('aria-label', 'Galeria de imagens naturais');
        }

        // Add keyboard navigation hints
        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach((btn, index) => {
            const labels = ['Reproduzir/Pausar slideshow', 'Slide anterior', 'Próximo slide'];
            btn.setAttribute('aria-label', labels[index]);
        });

        // Add live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.position = 'absolute';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.padding = '0';
        liveRegion.style.margin = '-1px';
        liveRegion.style.overflow = 'hidden';
        liveRegion.style.clip = 'rect(0, 0, 0, 0)';
        liveRegion.style.whiteSpace = 'nowrap';
        liveRegion.style.border = '0';
        
        document.body.appendChild(liveRegion);
        
        // Update live region when slide changes
        const originalUpdateSlideshow = VibesSlideshow.prototype.updateSlideshow;
        VibesSlideshow.prototype.updateSlideshow = function() {
            originalUpdateSlideshow.call(this);
            const slideContent = this.slides[this.currentSlide]?.querySelector('.slide-content h3')?.textContent;
            if (slideContent) {
                liveRegion.textContent = `Slide atual: ${slideContent}`;
            }
        };
    }

    static initializeThemeToggle() {
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('vibes-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Create theme toggle button (optional feature)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Alternar tema');
        themeToggle.innerHTML = '🌓';
        themeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 20px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('vibes-theme', newTheme);
        });

        document.body.appendChild(themeToggle);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    VibesUtils.addDynamicStyles();
    
    // Preload images for better performance
    VibesUtils.preloadImages();
    
    // Setup performance optimizations
    VibesUtils.setupPerformanceOptimizations();
    
    // Setup accessibility features
    VibesUtils.setupAccessibility();
    
    // Initialize theme toggle (optional)
    // VibesUtils.initializeThemeToggle();
    
    // Initialize main slideshow
    const slideshow = new VibesSlideshow();
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add entrance animations
        const animatedElements = document.querySelectorAll('.header-content, .slideshow-container, .info-panel');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both';
            }, index * 200);
        });
    });
});

// Add fade in animation styles
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header-content,
    .slideshow-container,
    .info-panel {
        opacity: 0;
    }
    
    .loaded .header-content,
    .loaded .slideshow-container,
    .loaded .info-panel {
        opacity: 1;
    }
`;
document.head.appendChild(fadeInStyle);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Vibes Error:', e.error);
});

// Service Worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
