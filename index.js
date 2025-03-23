// Parallax effect for .Image.Cover class
document.addEventListener('DOMContentLoaded', function() {
    // Startup animation for H1 headings
    const headings = document.querySelectorAll('H2 Heading');
    headings.forEach(heading => {
        // Set initial styles
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
        heading.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        // Trigger animation after a small delay
        setTimeout(() => {
            heading.style.opacity = '1';
            heading.style.transform = 'translateY(0)';
        }, 300);
    });

    // Get all elements with class .Image.Cover
    const parallaxImages = document.querySelectorAll('.Image.Cover');
    
    // Initial position setup
    parallaxImages.forEach(image => {
        image.style.transform = 'translateY(0)';
        image.style.transition = 'transform 0.1s ease-out';
        image.style.willChange = 'transform';
    });

    // Throttle function to limit scroll event firing
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
        };
    }

    // Parallax scroll effect
    const handleScroll = throttle(() => {
        parallaxImages.forEach(image => {
            // Get the image's position relative to the viewport
            const rect = image.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if image is in viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate the parallax offset
                const scrolled = window.pageYOffset;
                const parallaxOffset = scrolled * 0.5; // Adjust speed by changing this value
                
                // Apply the transform
                image.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }, 16); // Throttle to ~60fps

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});