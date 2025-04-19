// Function to create mobile project images
function setupMobileProjectImages() {
    const projects = document.querySelectorAll('.project');
    
    // Create mobile images for each project
    projects.forEach(project => {
        // Check if we've already added a mobile image
        if (!project.querySelector('.project-mobile-img')) {
            const projectId = project.getAttribute('data-project');
            const originalImg = document.querySelector(`.project-img[data-for="${projectId}"]`);
            
            if (originalImg) {
                // Create a new image element for mobile
                const mobileImg = document.createElement('img');
                mobileImg.className = 'project-mobile-img';
                mobileImg.src = originalImg.src;
                mobileImg.alt = originalImg.alt;
                
                // Add it after the project content
                const projectContent = project.querySelector('.project-content');
                if (projectContent) {
                    projectContent.appendChild(mobileImg);
                }
            }
        }
    });
}


// JavaScript for interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const imageSection = document.querySelector('.image-section');
    
    // Only add the effect if we found the image section
    if (imageSection) {
        // Add a style element for the CSS variables
        const style = document.createElement('style');
        style.textContent = `
            .image-section::before {
                transform: translate(var(--bubble-x, 0), var(--bubble-y, 0)) 
                           rotate(var(--bubble-rotate, 0)) 
                           scale(var(--bubble-scale, 1));
            }
        `;
        document.head.appendChild(style);
        
        // Only track movement when directly over the image section
        imageSection.addEventListener('mousemove', function(e) {
            // Get the bounding rectangle of the image section
            const rect = imageSection.getBoundingClientRect();
            
            // Calculate the center of the image
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate how far the cursor is from the center
            const distX = (e.clientX - centerX) / rect.width * 2; // Normalized to -1 to 1
            const distY = (e.clientY - centerY) / rect.height * 2; // Normalized to -1 to 1
            
            // Maximum movement in pixels
            const maxMove = 20;
            
            // Apply the transform to the bubble
            imageSection.style.setProperty('--bubble-x', `${distX * maxMove}px`);
            imageSection.style.setProperty('--bubble-y', `${distY * maxMove}px`);
            
            // Rotate based on cursor position
            const rotateValue = distX * 8; // Max 8 degrees
            imageSection.style.setProperty('--bubble-rotate', `${rotateValue}deg`);
            
            // Apply a subtle scale effect based on distance from center
            const distance = Math.sqrt(distX * distX + distY * distY);
            const scaleValue = 1.05 + distance * 0.05; // Max ~10% larger
            imageSection.style.setProperty('--bubble-scale', scaleValue);
        });
        
        // Reset when the mouse leaves the image section
        imageSection.addEventListener('mouseleave', function() {
            // Smoothly animate back to original position
            imageSection.style.setProperty('--bubble-x', '0px');
            imageSection.style.setProperty('--bubble-y', '0px');
            imageSection.style.setProperty('--bubble-rotate', '0deg');
            imageSection.style.setProperty('--bubble-scale', '1');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact button functionality
    document.querySelector('.contact-btn').addEventListener('click', function () {
        alert("Contact form coming soon! Please email me at larkhiya@example.com");
    });

    // Download CV button
    document.querySelector('.dwnl-btn').addEventListener('click', function () {
        alert("CV download will be available soon!");
    });

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Check if elements are in viewport and add animation class
    function checkScroll() {
        timelineItems.forEach((item, index) => {
            if (!item.classList.contains('visible')) {
                const itemTop = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight * 0.8;
    
                if (itemTop < screenPosition) {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 300);
                }
            }
        });
    }

    // Initial check on page load
    checkScroll();

    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    setupMobileProjectImages();
    
    // Make sure to run checkProjectInView on page load
    initTimelineAnimations();
    
    // Set up event listeners
    window.addEventListener('scroll', checkTimelineVisibility);
    window.addEventListener('resize', handleResize);
    
    // Initial check for timeline visibility
    checkTimelineVisibility();
    
    // Initialize animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Setup initial state
        timelineItems.forEach(item => {
            if (!isElementInViewport(item)) {
                item.classList.remove('visible');
            }
        });
    }
    
    // Check which timeline items should be visible based on scroll position
    function checkTimelineVisibility() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.8; // 80% from the top
        
        timelineItems.forEach((item, index) => {
            if (!item.classList.contains('visible')) {
                const itemTop = item.getBoundingClientRect().top;
                
                if (itemTop < triggerPoint) {
                    // Add delay based on index for cascading effect
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 300);
                }
            }
        });
    }
    
    var copy = document.querySelector(".logos-slide").cloneNode(true);
    document.querySelector(".tech-stack-carousel").appendChild(copy);

    // Handle resize events
    function handleResize() {
        // Just check visibility again on resize
        checkTimelineVisibility();
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to check which project is in view
    function checkProjectInView() {

        const projects = document.querySelectorAll('.project');
        const projectImages = document.querySelectorAll('.project-img');
        const isMobile = window.innerWidth <= 768;

        if (isMobile){
            return;
        }

        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight / 2; // Middle of viewport
        let activeProjectFound = false;
        
        // For mobile, we'll show the image that corresponds to the project in view
        
            projects.forEach(project => {
                const projectRect = project.getBoundingClientRect();
                const projectTop = projectRect.top;
                const projectBottom = projectRect.bottom;
                
                // Check if this project is in view (center of viewport)
                if (projectTop <= triggerPoint && projectBottom >= triggerPoint) {
                    activeProjectFound = true;
                    const projectId = project.getAttribute('data-project');
                    
                    project.style.opacity = '1';
        
                    // Hide all images
                    projectImages.forEach(img => {
                        img.classList.remove('active');
                    });
                    
                    // Show the relevant image
                    const relevantImage = document.querySelector(`.project-img[data-for="${projectId}"]`);
                    if (relevantImage) {
                        relevantImage.classList.add('active');
                    }
                }
                else {
                    project.style.opacity = '0.6';
                }
            });
        
            if (!activeProjectFound) {
                projects.forEach(project => {
                    project.style.opacity = '1';
                });
            }
        }

    
    // Make sure to update when window resizes
    window.addEventListener('resize', checkProjectInView);
    
    // Run on initial load
    checkProjectInView();
    
    // Add event listener for scroll on the window
    window.addEventListener('scroll', checkProjectInView);

    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // This is where you would normally set up your email functionality
        // For a real implementation, you would need to use a backend service or API
        
        // Example using a serverless function or API endpoint (you would need to create this)
        // const formData = { name, email, subject, message };
        // fetch('your-api-endpoint/send-email', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        
        // For now, let's just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset the form
        this.reset();
    });

    new FinisherHeader({
        "count": 8 ,
        "size": {
            "min": 420,
            "max": 845,
            "pulse": 0.4
        },
        "speed": {
            "x": {
                "min": 0.6,
                "max": 3
            },
            "y": {
                "min": 0.6,
                "max": 3
            }
        },
        "colors": {
            "background": "#171A1C",
            "particles": [
                "#20c0a5",
                "#2b413d"
            ]
        },
        "blending": "lighten",
        "opacity": {
            "center": 0.9,
            "edge": 0
        },
        "skew": 0,
        "shapes": [
            "c"
        ]
    });
});



