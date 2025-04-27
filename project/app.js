emailjs.init("tgXoTj-OkzK_sIMl5");


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
                    projectContent.insertBefore(mobileImg, projectContent.firstChild);
                }
            }
        }
    });
}





document.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    document.querySelectorAll(".parallax").forEach((element) => {
        const speed = element.getAttribute("data-speed");
        element.style.transform = `translate(${x * speed * 10}px, ${y * speed * 10}px )`;
    })
})

document.addEventListener('DOMContentLoaded', function () {
    
const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const statusMessage = document.getElementById('status-message');
      
      // Reset any previous status message
      
      // Validate form fields
      if (!name || !email || !subject || !message) {
        // Add error class to empty fields
        if (!name) document.getElementById('name').classList.add('error');
        if (!email) document.getElementById('email').classList.add('error');
        if (!subject) document.getElementById('subject').classList.add('error');
        if (!message) document.getElementById('message').classList.add('error');
        
        showStatusMessage("Please fill in all required fields", "error");
        return;
      }
      
      // Email validation with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('error');
        showStatusMessage("Please enter a valid email address", "error");
        return;
      }

      const hcaptchaResponse = hcaptcha.getResponse();
      if (!hcaptchaResponse) {
        showStatusMessage("Please complete the captcha", "error");
        return;
      }

      hideStatusMessage();
      
      // Show loading state
      const submitButton = document.querySelector('#contact-form button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Optional: Show sending status
      showStatusMessage("Sending your message...", "info");
      
      // Prepare form data
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        'h-captcha-response': hcaptchaResponse
      };
      
      // Send data using EmailJS
      emailjs.send('service_mgvr2ou', 'template_qrg4dxm', formData, 'tgXoTj-OkzK_sIMl5')
        .then(function(response) {
          // Reset the form
          contactForm.reset();

          hcaptcha.reset();
          
          // Show success message
          showStatusMessage("Message sent successfully! I'll get back to you soon.", "success");
          
          // Scroll to status message to ensure visibility
          statusMessage.scrollIntoView({behavior: 'smooth', block: 'center'});
          
          // Remove success message after 5 seconds
          setTimeout(hideStatusMessage, 5000);
        })
        .catch(function(error) {
          // Handle error
          console.error('Email send failed:', error);
          
          // Show error message
          showStatusMessage("Failed to send message. Please try again or email me directly at jcwlarkhiya@gmail.com", "error");
          
          // Remove error message after 7 seconds
          setTimeout(hideStatusMessage, 7000);
        })
        .finally(function() {
          // Reset button state
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        });
    });
    
    // Helper function to show status message
    function showStatusMessage(text, type) {
      const statusMessage = document.getElementById('status-message');
      statusMessage.textContent = text;
      statusMessage.className = type + "-message";
      
      // Force a reflow to enable animation
      void statusMessage.offsetWidth;
      
      // Make visible with animation
      statusMessage.classList.add('visible');
    }
    
    // Helper function to hide status message
    function hideStatusMessage() {
      const statusMessage = document.getElementById('status-message');
      statusMessage.classList.remove('visible');
      
      // Clear content after animation
      setTimeout(() => {
        statusMessage.textContent = "";
        statusMessage.className = "";
      }, 300);
    }
    
    // Remove error class on focus
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(element => {
      element.addEventListener('focus', function() {
        this.classList.remove('error');
      });
    });
  }

  window.hcaptchaCallback = function() {
    // If there's an error message about captcha, clear it
    const statusMessage = document.getElementById('status-message');
    if (statusMessage && statusMessage.textContent === "Please complete the captcha.") {
      hideStatusMessage();
    }
  };

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
        imageSection.addEventListener('mousemove', function (e) {
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
        imageSection.addEventListener('mouseleave', function () {
            // Smoothly animate back to original position
            imageSection.style.setProperty('--bubble-x', '0px');
            imageSection.style.setProperty('--bubble-y', '0px');
            imageSection.style.setProperty('--bubble-rotate', '0deg');
            imageSection.style.setProperty('--bubble-scale', '1');
        });
    }

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

        if (isMobile) {
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


    const cards = document.querySelectorAll('.education-card');
    const cdCovers = document.querySelectorAll('.cd-cover');

    // Function to toggle active class for mobile view
    function toggleCardAnimation(card) {
        // Check if this card is already active
        const wasActive = card.classList.contains('active');

        // First, remove active class from all cards
        cards.forEach(c => {
            c.classList.remove('active');
        });

        // Toggle active class only if it wasn't already active
        if (!wasActive) {
            card.classList.add('active');
        }
    }

    // Function to set up mobile behavior
    function setupMobileBehavior() {
        // Remove hover event effects
        cards.forEach(card => {
            card.classList.remove('active');
        });

        // Reset works section position for mobile
        // worksSection.style.marginTop = '50px';

        // Add click event listeners for mobile view
        cdCovers.forEach((cover, index) => {
            cover.style.cursor = 'pointer';
            cover.onclick = function (e) {
                e.stopPropagation();
                toggleCardAnimation(cards[index]);
            };
        });
    }

    // Initial setup based on screen size
    function initLayout() {
        // Remove all previous event listeners
        cdCovers.forEach((cover) => {
            cover.onclick = null;
        });

        // Set up appropriate behavior based on screen width
        if (window.innerWidth > 1160) {
            setupDesktopBehavior();
        } else {
            setupMobileBehavior();
        }
    }

    // Initial setup
    initLayout();
    setupMobileProjectImages();

    // Get all projects and images
    const projects = document.querySelectorAll('.project');
    const projectImages = document.querySelectorAll('.project-img');

    // Initialize with first project active
    if (projects.length > 0 && projectImages.length > 0) {
        const firstProject = projects[0];
        const firstProjectId = firstProject.getAttribute('data-project');
        const firstImage = document.querySelector(`.project-img[data-for="${firstProjectId}"]`);
        if (firstImage) {
            firstImage.classList.add('active');
        }
    }

    // Function to determine which project is most visible in viewport
    function updateActiveProject() {
        let maxVisibility = 0;
        let mostVisibleProject = null;

        projects.forEach(project => {
            const rect = project.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how much of the project is visible
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(windowHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibility = visibleHeight / rect.height;

            // Update if this project is more visible than previous most visible
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleProject = project;
            }
        });

        // If we found a visible project, activate its image
        if (mostVisibleProject) {
            const projectId = mostVisibleProject.getAttribute('data-project');

            // Update project opacity
            projects.forEach(p => {
                if (p === mostVisibleProject) {
                    p.style.opacity = '1';
                } else {
                    p.style.opacity = '0.7';
                }
            });

            // Update image visibility
            projectImages.forEach(img => {
                if (img.getAttribute('data-for') === projectId) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });

            console.log('Active project:', projectId);
        }
    }

    // Initial update
    updateActiveProject();

    // Update on scroll
    window.addEventListener('scroll', updateActiveProject);

    // Also update on resize
    window.addEventListener('resize', updateActiveProject);


});
