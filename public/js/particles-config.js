
// Theme-specific particle configurations
function getParticlesConfig(theme) {
    let config = {};
    
    switch(theme) {
        case 'cyberpunk':
            config = {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: ["#ff00ff", "#00ffff", "#ff9900"] },
                    shape: { type: "triangle" },
                    opacity: { value: 1, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 1, width: 1 },
                    move: { enable: true, speed: 6, direction: "none", random: true, out_mode: "out" }
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
                }
            };
            break;
        case 'minimalist':
            config = {
                particles: {
                    number: { value: 30, density: { enable: true, value_area: 800 } },
                    color: { value: "#333333" },
                    shape: { type: "circle" },
                    opacity: { value: 1, random: false },
                    size: { value: 4, random: true },
                    line_linked: { enable: true, distance: 150, color: "#999999", opacity: 1, width: 2 },
                    move: { enable: true, speed: 2, direction: "none", random: false, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 2 }
                    }
                }
            };
            break;
        case 'space':
            config = {
                particles: {
                    number: { value: 260, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 1, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: false },
                    move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "bubble" },
                        onclick: { enable: true, mode: "repulse" },
                        resize: true
                    },
                    modes: {
                        bubble: { distance: 250, size: 2, duration: 2, opacity: 1, speed: 3 },
                        repulse: { distance: 400, duration: 0.4 }
                    }
                }
            };
            break;
        case 'digital':
            config = {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: "#4ecca3" },
                    shape: { type: "edge" },
                    opacity: { value: 1, random: true },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#4ecca3", opacity: 1, width: 1 },
                    move: { enable: true, speed: 4, direction: "none", random: false, straight: false, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "connect" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        connect: { distance: 80, line_linked: { opacity: 1 }, radius: 60 },
                        push: { particles_nb: 4 }
                    }
                }
            };
            break;
        case 'surreal':
            config = {
                particles: {
                    number: { value: 100, density: { enable: true, value_area: 800 } },
                    color: { value: ["#ff7700", "#ff0077", "#eeaa00"] },
                    shape: { type: "circle" },
                    opacity: { value: 1, random: true },
                    size: { value: 6, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ff7700", opacity: 1, width: 2 },
                    move: { enable: true, speed: 3, direction: "none", random: true, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "bubble" },
                        onclick: { enable: true, mode: "repulse" },
                        resize: true
                    },
                    modes: {
                        bubble: { distance: 200, size: 6, duration: 0.4, opacity: 1, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 }
                    }
                }
            };
            break;
        case 'neon-flux':
            config = {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: ["#00eeff", "#ff00aa", "#ffcc00"] },
                    shape: { type: "circle" },
                    opacity: { value: 1, random: true },
                    size: { value: 8, random: true },
                    line_linked: { enable: true, distance: 150, color: "#00eeff", opacity: 1, width: 1 },
                    move: { enable: true, speed: 5, direction: "none", random: true, out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 200, line_linked: { opacity: 1 } },
                        push: { particles_nb: 6 }
                    }
                }
            };
            break;
        case 'biomimicry':
            config = {
                particles: {
                    number: { value: 100, density: { enable: true, value_area: 800 } },
                    color: { value: ["#2ecc71", "#3498db", "#f1c40f"] },
                    shape: { type: "circle" },
                    opacity: { value: 1, random: true },
                    size: { value: 8, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 1, width: 2 },
                    move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "bubble" },
                        onclick: { enable: true, mode: "repulse" },
                        resize: true
                    },
                    modes: {
                        bubble: { distance: 200, size: 5, duration: 2, opacity: 0.8, speed: 3 },
                        repulse: { distance: 200, duration: 0.4 }
                    }
                }
            };
            break;
        case 'glassmorphism':
            config = {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: ["#4facfe", "#00f2fe", "#f093fb"] },
                    shape: { type: "circle" },
                    opacity: { value: 0.8, random: true },
                    size: { value: 4, random: true },
                    line_linked: { enable: true, distance: 150, color: "#4facfe", opacity: 0.8, width: 1 },
                    move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "bubble" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        bubble: { distance: 200, size: 6, duration: 0.4, opacity: 0.8, speed: 3 },
                        push: { particles_nb: 4 }
                    }
                }
            };
            break;
        default:
            config = {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.8, random: false },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.8, width: 1 },
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
                }
            };
    }
    
    // Add retina detect
    config.retina_detect = true;
    
    return config;
}

// Update particles based on theme
function updateParticles(theme) {
    if (window.pJSDom && window.pJSDom.length > 0) {
        // Destroy existing particles
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    
    // Initialize new particles with theme config
    particlesJS("particles-js", getParticlesConfig(theme));
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    // Default theme particles or wait for theme to be set
    if (currentTheme) {
        updateParticles(currentTheme);
    } else {
        // Use default particles until theme is set
        particlesJS("particles-js", getParticlesConfig('default'));
    }
});
