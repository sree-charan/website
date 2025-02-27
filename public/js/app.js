// Theme Management
const themes = ['cyberpunk', 'minimalist', 'space', 'digital', 'surreal', 'neon-flux', 'biomimicry', 'glassmorphism'];
let currentTheme = '';

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.progress-bar');
const themeInfo = document.getElementById('theme-info');
const themeOptions = document.querySelectorAll('.theme-option');
const navLinks = document.querySelectorAll('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');


function simulateLoading() {
    // Select random theme immediately
    const randomIndex = Math.floor(Math.random() * themes.length);
    const selectedTheme = themes[randomIndex];
    currentTheme = selectedTheme;
    
    // Show quick progress animation
    progressBar.style.width = "0%";
    
    // Animate to 100% in 1 second
    setTimeout(() => {
        progressBar.style.width = "100%";
        document.querySelector('.loader-text').textContent = "Ready!";
        
        // Apply theme and remove loading screen after 1 second
        setTimeout(() => {
            // Apply the selected theme before removing loading screen
            document.body.classList.add(`theme-${currentTheme}`);
            
            // Initialize theme-specific backgrounds and particles
            if (window.updateThreeJsBackground) {
                window.updateThreeJsBackground(currentTheme);
            }
            if (typeof updateParticles === 'function') {
                updateParticles(currentTheme);
            }
            
            // Hide loading screen
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                initializeWebsite();
            }, 300);
        }, 700);
    }, 300);
}


// // Loading Animation
// function simulateLoading() {
//     // Select random theme immediately
//     const randomIndex = Math.floor(Math.random() * themes.length);
//     const selectedTheme = themes[randomIndex];
    
//     // Store the selected theme but don't apply it yet
//     currentTheme = selectedTheme;
    
//     let progress = 0;
//     const interval = setInterval(() => {
//         progress += Math.random() * 10;
//         if (progress > 100) progress = 100;
        
//         progressBar.style.width = `${progress}%`;
        
//         // Dynamic loading messages
//         const loadingMessages = [
//             "Initializing quantum particles...",
//             "Generating dimensional matrices...",
//             "Calibrating visual cortex interface...",
//             "Synchronizing neural networks...",
//             "Rendering immersive environment..."
//         ];
        
//         // Update loading message based on progress
//         if (progress > 20 && progress < 40) {
//             document.querySelector('.loader-text').textContent = loadingMessages[0];
//         } else if (progress >= 40 && progress < 60) {
//             document.querySelector('.loader-text').textContent = loadingMessages[1];
//         } else if (progress >= 60 && progress < 80) {
//             document.querySelector('.loader-text').textContent = loadingMessages[2];
//         } else if (progress >= 80 && progress < 95) {
//             document.querySelector('.loader-text').textContent = loadingMessages[3];
//         } else if (progress >= 95) {
//             document.querySelector('.loader-text').textContent = loadingMessages[4];
//         }
        
//         if (progress === 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//                 // Apply the selected theme before removing the loading screen
//                 document.body.classList.add(`theme-${currentTheme}`);
                
//                 // Initialize theme-specific backgrounds and particles
//                 if (window.updateThreeJsBackground) {
//                     window.updateThreeJsBackground(currentTheme);
//                 }
//                 if (typeof updateParticles === 'function') {
//                     updateParticles(currentTheme);
//                 }
                
//                 // Now fade out the loading screen
//                 loadingScreen.style.opacity = '0';
//                 setTimeout(() => {
//                     loadingScreen.style.display = 'none';
//                     initializeWebsite();
//                 }, 500);
//             }, 500);
//         }
//     }, 200);
// }


// Initialize Website
function initializeWebsite() {
     // Theme is already set during loading
    // 3D background is already initialized
    // Particles are already initialized
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add event listeners
    addEventListeners();
}

// Set Random Theme
function setRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const theme = themes[randomIndex];
    setTheme(theme);
}

// Set Theme
function setTheme(theme) {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    
    // Fade in overlay
    setTimeout(() => {
        overlay.style.opacity = '1';
        
        // After overlay is visible, change theme
        setTimeout(() => {
            if (currentTheme) {
                document.body.classList.remove(`theme-${currentTheme}`);
            }
            
            document.body.classList.add(`theme-${theme}`);
            currentTheme = theme;
            
            // Update background based on theme
            updateBackground(theme);
            
            // Update particles based on theme
            updateParticles(theme);
            
            // Show theme notification
            themeInfo.innerHTML = `
                <div class="theme-icon"><i class="fas fa-palette"></i></div>
                <div class="theme-name">${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</div>
            `;
            themeInfo.classList.add('show');
            
            // Fade out overlay
            setTimeout(() => {
                overlay.style.opacity = '0';
                
                // Remove overlay after fade out
                setTimeout(() => {
                    overlay.remove();
                }, 500);
                
                // Hide theme notification after delay
                setTimeout(() => {
                    themeInfo.classList.remove('show');
                }, 3000);
            }, 500);
        }, 500);
    }, 10);
}

// Update Background based on theme
function updateBackground(theme) {
    // This will be implemented in the Three.js section
    if (window.updateThreeJsBackground) {
        window.updateThreeJsBackground(theme);
    }
}

// Initialize Three.js Background
function initThreeJsBackground() {
    const canvas = document.getElementById('background-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create objects based on the current theme
    let objects = [];
    
    // Function to create theme-specific objects
    window.updateThreeJsBackground = function(theme) {
        // Remove existing objects
        objects.forEach(obj => scene.remove(obj));
        objects = [];
        
        // Create new objects based on theme
        switch(theme) {
            case 'cyberpunk':
                createCyberpunkBackground(scene, objects);
                break;
            case 'minimalist':
                createMinimalistBackground(scene, objects);
                break;
            case 'space':
                createSpaceBackground(scene, objects);
                break;
            case 'digital':
                createDigitalBackground(scene, objects);
                break;
            case 'surreal':
                createSurrealBackground(scene, objects);
                break;
            case 'neon-flux':
                createNeonFluxBackground(scene, objects);
                break;
            case 'biomimicry':
                createBiomimicryBackground(scene, objects);
                break;
            case 'glassmorphism':
                createGlassmorphismBackground(scene, objects);
                break;
            default:
                createCyberpunkBackground(scene, objects);
        }
    };
    
    // Initial background creation
    window.updateThreeJsBackground(currentTheme);
    
    // Mouse movement effect
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    
    window.addEventListener('mousemove', (event) => {
        targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Smooth mouse movement
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;
        
        // Animate objects
        objects.forEach(obj => {
            if (obj.userData.animate) {
                obj.userData.animate(elapsedTime * 1000);
            }
            
            // Mouse interaction
            if (obj.userData.mouseInteraction) {
                obj.rotation.x += mouse.y * 0.01;
                obj.rotation.y += mouse.x * 0.01;
            }
        });
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Particles
function initParticles() {
    // Initialize with default particles
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Initialize Typing Effect
function initTypingEffect() {
    const dynamicText = document.querySelector('.dynamic-text');
    const phrases = ['Software Engineer', 'AI Enthusiast', 'Cybersecurity Specialist', 'Full Stack Developer'];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            dynamicText.textContent = phrase.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            dynamicText.textContent = phrase.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentChar === phrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at end
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Initialize Scroll Animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        const sections = document.querySelectorAll('.section:not(#home)');
        
        sections.forEach(section => {
            gsap.fromTo(
                section.querySelector('.section-header'),
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1
                    }
                }
            );
            
            gsap.fromTo(
                section.querySelector('.content'),
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'top 40%',
                        scrub: 1
                    }
                }
            );
        });
        
        // Animate skill bars
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const level = item.querySelector('.skill-level');
            
            gsap.fromTo(
                level,
                {
                    width: '0%'
                },
                {
                    width: level.style.width,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'top 60%',
                        scrub: 1
                    }
                }
            );
        });
    } else {
        // Fallback for when GSAP is not available
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach(level => {
            level.style.width = level.getAttribute('data-width') || level.style.width;
        });
    }
}

// Enhanced Navigation Bar Functionality
function enhanceNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Add index for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Add hover effect to nav links
    const navLinks2 = document.querySelectorAll('.nav-link');
    navLinks2.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('nav-ripple');
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks2.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add scrolled class to navbar
        if (window.scrollY > 50) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }
    });
}



// Add Event Listeners
function addEventListeners() {

// Theme switcher
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
    });
});

// Project filters (should be in a separate event listener)
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});


    
    // Contact form submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create FormData object
        const formData = new FormData(contactForm);
        
        // Submit to Google Forms
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // This is important for Google Forms
        })
        .then(() => {
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = document.querySelector('button[type="submit"]');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                formGroups.forEach(group => group.style.display = 'block');
                submitBtn.style.display = 'block';
                successMessage.remove();
                contactForm.reset();
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
    });
}

    
    // Add interactive elements to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });
}

enhanceNavigation();

// Start the loading animation when the page loads
window.addEventListener('load', () => {
    simulateLoading();
    
    // Update copyright year
    const copyrightYear = document.querySelector('.footer-text p');
    if (copyrightYear) {
        copyrightYear.textContent = `© ${new Date().getFullYear()} Sree Charan Reddy. All rights reserved.`;
    }
});

// Add this to your JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle-icon');
    const themePanel = document.querySelector('.theme-toggle-sticky');
    const themePanelClose = document.querySelector('.theme-panel-close');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Show/hide theme panel
    themeToggle.addEventListener('click', function() {
        themePanel.classList.toggle('active');
    });
    
    // Close theme panel
    themePanelClose.addEventListener('click', function() {
        themePanel.classList.remove('active');
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            themePanel.classList.remove('active');
        });
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (!themePanel.contains(e.target)) {
            themePanel.classList.remove('active');
        }
    });
});
