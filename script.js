/**
 * Jared Reichle Portfolio Website - Main JavaScript
 * Handles navigation, modals, animations, and interactive features
 */

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.project-card');

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

/**
 * Initialize mobile navigation functionality
 */
function initializeMobileNavigation() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
    });

    // Close mobile menu when clicking on navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================================

/**
 * Update active navigation link based on current scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    // Get current page path
    const currentPath = window.location.pathname;
    const isAstronomyPage = currentPath.includes('astro.html');
    const isMainPage = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
    
    console.log('Navigation Debug:', {
        currentPath,
        isAstronomyPage,
        isMainPage,
        sectionsFound: sections.length,
        navLinksFound: navLinks.length
    });
    
    // If we're on the astronomy page, set astronomy as active immediately
    if (isAstronomyPage) {
        console.log('On astronomy page - setting astronomy link as active');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            console.log('Checking link:', href);
            if (href === 'astro.html') {
                link.classList.add('active');
                console.log('Set astronomy link as active');
            }
        });
        return; // Exit early for astronomy page
    }
    
    // For main page, determine current section based on scroll
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });

    console.log('Current section:', currentSection, 'Scroll Y:', window.scrollY);

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this is the current page section
        if (href === `#${currentSection}`) {
            link.classList.add('active');
            console.log('Set active link:', href);
        }
        // Special case for Astronomy link - highlight when in astronomy section
        else if (href === 'astro.html' && currentSection === 'astronomy') {
            link.classList.add('active');
            console.log('Set astronomy link as active (in astronomy section)');
        }
    });
}

// ============================================================================
// PROJECT TABS SYSTEM
// ============================================================================

/**
 * Initialize project tabs functionality
 */
function initializeProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabButtons.length || !tabPanels.length) {
        console.warn('Project tab elements not found');
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchToTab(targetTab, tabButtons, tabPanels);
        });
        
        // Keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                switchToTab(targetTab, tabButtons, tabPanels);
            }
        });
    });
}

/**
 * Switch to a specific tab
 * @param {string} targetTab - The tab to switch to
 * @param {NodeList} tabButtons - All tab buttons
 * @param {NodeList} tabPanels - All tab panels
 */
function switchToTab(targetTab, tabButtons, tabPanels) {
    // Update tab buttons
    tabButtons.forEach(button => {
        const isActive = button.getAttribute('data-tab') === targetTab;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive);
    });
    
    // Update tab panels
    tabPanels.forEach(panel => {
        const isActive = panel.id === `${targetTab}-panel`;
        panel.classList.toggle('active', isActive);
    });
}

// ============================================================================
// PROJECT MODAL SYSTEM
// ============================================================================

/**
 * Project data configuration
 */
const projectData = {
    beaker: {
        title: "BEAKER (Benchmarking Equipment Automation for Knowledge, Evaluation & Regression)",
        summary: "I'm building an automated testing framework that takes the pain out of hardware benchmarking. Instead of manually running tests and collecting data, BEAKER handles everything automatically and gives you clear pass/fail results.",
        layman: "Testing hardware is usually a tedious process where someone has to manually run tests, record data, and figure out if everything's working right. I'm building a system that does all that automatically. You just tell it what to test and it handles the rest, then tells you if your equipment passed or failed.",
        technical: "Currently developing in Python with plans for automated test execution and data logging. The goal is to integrate with various hardware interfaces and generate reports automatically. I'm focusing on making it flexible enough to work with different types of test equipment while keeping the interface simple.",
        tech: ["Python", "Hardware Integration", "Test Automation", "Data Analysis", "Reporting"],
        highlights: [
            "Automated test execution (in development)",
            "Hardware interface integration",
            "Real-time monitoring capabilities",
            "Automated reporting system",
            "Flexible test configuration",
            "Error handling and recovery"
        ],
    },
    homelabServers: {
        title: "Home Lab Servers & Proxmox Cluster",
        summary: "I built a home lab using cheap surplus hardware from the local university. It's basically a mini data center in my basement where I can experiment with different operating systems and technologies without breaking anything important.",
        layman: "I took some old computers that the university was throwing away and turned them into a system that can run multiple virtual machines. It's like having a bunch of computers in one box, and I can test different operating systems and software without worrying about messing up my main computer.",
        technical: "The setup uses Proxmox VE running on surplus hardware - basically old servers that were being decommissioned. I had to figure out the networking configuration, which was trickier than expected, but now I can spin up VMs running RHEL, Ubuntu, Kali, or whatever I need. I've used it to explore kernel features, test security tools, and I'm working on setting up a home NAS.",
        tech: ["Proxmox", "Linux", "Virtualization", "Networking", "Hardware"],
        highlights: [
            "Proxmox cluster on surplus hardware",
            "Multiple VM environments for testing",
            "Network configuration troubleshooting",
            "Container deployments",
            "Security tool experimentation",
            "Home NAS setup (in progress)"
        ],
    },
    astronomyTools: {
        title: "Telescope Control Scripts & Stellarium Integration",
        summary: "I built Python scripts that let me control my Orion XX14G telescope directly from Stellarium astronomy software. The system intercepts slew commands and translates them to work with my telescope's RS-232 interface.",
        layman: "I figured out how to make my telescope work with Stellarium, which is this cool astronomy software that shows you what's in the sky. Normally you'd have to manually point your telescope, but now I can just click on objects in Stellarium and my telescope automatically moves to point at them.",
        technical: "Built a TCP listener in Python that captures slew commands from Stellarium, then decodes and translates them into the proper RS-232 protocol for the Orion XX14G. The system acts as a bridge between Stellarium's network commands and the telescope's serial interface, handling coordinate conversion and command formatting. It's basically reverse-engineering the communication protocol to make incompatible systems work together.",
        tech: ["Python", "TCP Networking", "RS-232 Serial", "Protocol Translation", "Telescope Control"],
        highlights: [
            "TCP command interception from Stellarium",
            "RS-232 protocol translation",
            "Orion XX14G telescope integration",
            "Coordinate system conversion",
            "Real-time telescope control",
            "Protocol reverse engineering"
        ],
    },
    hnefatafl: {
        title: "Hnefatafl Board Game Emulator",
        summary: "I recreated an ancient Viking board game called Hnefatafl using Python. It's a two-player strategy game that's perfect for playing with friends on the same computer.",
        layman: "I built a digital version of an old Viking board game. It's kind of like chess but with different rules - the king tries to escape to the corners while the attackers try to capture him. You and a friend can play together on the same computer, taking turns.",
        technical: "Used Python with Pygame for the graphics and game logic. I implemented the traditional Hnefatafl rules with piece movement and move validation. It's designed for two people to play locally, with turn-based mechanics and visual feedback to show which moves are legal.",
        tech: ["Python", "Pygame", "Game Development", "Object-Oriented Programming", "Local Multiplayer"],
        highlights: [
            "Traditional Hnefatafl rules",
            "Interactive graphics",
            "Two-player local gameplay",
            "Turn-based mechanics",
            "Move validation",
            "Classic Viking game recreation"
        ],
    },
    fpgaLaserControl: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
        summary: "I built a system to keep a laser perfectly stable for scientific measurements. It constantly monitors the laser and makes tiny adjustments to keep it running at the right frequency.",
        layman: "Imagine you have a very precise laser that needs to stay perfectly stable for scientific measurements. I built a system that constantly monitors the laser and makes tiny adjustments to keep it running perfectly, like a smart thermostat but for a laser's wavelength instead of temperature.",
        technical: "Used a Xilinx Zynq 7010 SoC with custom VHDL modules for the real-time control and data acquisition. Python handles the data processing and analysis side, while the FPGA manages the fast control loops and signal conditioning. The system implements a Pound-Drever-Hall control loop with PID feedback to keep the laser frequency locked.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        highlights: [
            "Modular FPGA design",
            "Real-time data acquisition",
            "Closed-loop control",
            "Laser interferometer integration",
            "Zynq 7010 SoC verification",
            "Signal processing and analysis"
        ],
    },
    circuitSynthesis: {
        title: "Circuit Synthesis from Frequency Response Data",
        summary: "I built a Python tool that can figure out what's inside a circuit just by looking at how it responds to different frequencies. It's like reverse-engineering a black box to understand what components are inside.",
        layman: "Imagine you have a mysterious electronic device in a black box and you want to figure out what's inside without opening it. I created a program that listens to how the device responds to different signals and then figures out what electronic components are likely inside, like solving a puzzle using math.",
        technical: "The tool uses signal processing to analyze frequency response data and rational approximation algorithms to create equivalent RLC circuit models. Python libraries handle the complex math, while custom algorithms extract circuit parameters and validate the models. It uses frequency domain analysis with impedance matching to reconstruct the circuit topology.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        highlights: [
            "Frequency response analysis",
            "RLC circuit synthesis",
            "Black-box circuit modeling",
            "Numerical optimization",
            "Circuit parameter extraction",
            "Model validation"
        ],
    },
};

/**
 * Initialize project modal functionality
 */
function initializeProjectModal() {
    if (!modal || !closeBtn) return;

    // Add click handlers to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => openProjectModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card);
            }
        });
    });

    // Close modal handlers
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

/**
 * Open project modal with project data
 * @param {HTMLElement} card - The project card element
 */
function openProjectModal(card) {
    const projectId = card.getAttribute('data-project');
    const project = projectData[projectId];
    
    if (!project) {
        console.warn(`Project data not found for: ${projectId}`);
        return;
    }
    
    // Populate modal content
    populateModalContent(project, projectId);
    
    // Show modal
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    closeBtn.focus();
}

/**
 * Populate modal with project data
 * @param {Object} project - Project data object
 * @param {string} projectId - Project identifier
 */
function populateModalContent(project, projectId) {
    // Update text content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalSummary').textContent = project.summary;
    document.getElementById('modalLayman').textContent = project.layman;
    document.getElementById('modalTechnical').textContent = project.technical;
    
    // Update tech tags
    const techContainer = document.querySelector('.modal-tech');
    techContainer.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Update highlights list
    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = project.highlights.map(highlight => 
        `<li>${highlight}</li>`
    ).join('');
    
    // Add external links
    updateModalLinks(projectId);
}

/**
 * Update modal external links based on project
 * @param {string} projectId - Project identifier
 */
function updateModalLinks(projectId) {
    const linksContainer = document.getElementById('modalLinks');
    
    const linkConfigs = {
        fpgaLaserControl: {
            url: 'https://mindworks.shoutwiki.com/wiki/FPGA_Data_Acquisition_and_Control',
            text: 'View Documentation',
            icon: 'fas fa-external-link-alt'
        },
        circuitSynthesis: {
            url: 'https://github.com/JaredReichle/CrctSynth',
            text: 'View on GitHub',
            icon: 'fab fa-github'
        },
        hnefatafl: {
            url: 'https://github.com/JaredReichle/HnefataflVikingChess',
            text: 'View on GitHub',
            icon: 'fab fa-github'
        },
        astronomyTools: {
            url: 'https://github.com/JaredReichle/DobConversion',
            text: 'View on GitHub',
            icon: 'fab fa-github'
        }
    };
    
    const linkConfig = linkConfigs[projectId];
    
    if (linkConfig) {
        linksContainer.innerHTML = `
            <a href="${linkConfig.url}" class="modal-link" target="_blank" rel="noopener noreferrer">
                <i class="${linkConfig.icon}"></i>
                ${linkConfig.text}
            </a>
        `;
    } else {
        linksContainer.innerHTML = '';
    }
}


/**
 * Close project modal
 */
function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-content, .resume-content, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ============================================================================
// SKILL TOOLTIPS
// ============================================================================

/**
 * Initialize skill tooltip positioning
 */
function initializeSkillTooltips() {
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    
    skillBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', positionTooltip);
        bubble.addEventListener('mouseleave', resetTooltip);
    });
}

/**
 * Position tooltip to avoid viewport overflow
 * @param {Event} event - Mouse enter event
 */
function positionTooltip(event) {
    const bubble = event.currentTarget;
    const tooltip = bubble.querySelector('.skill-tooltip');
    
    if (!tooltip) return;
    
    // Reset previous positioning classes
    tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-top');
    
    // Get positioning data
    const bubbleRect = bubble.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Tooltip dimensions (from CSS)
    const tooltipWidth = 280;
    const tooltipHeight = 120;
    const margin = 20;
    
    // Calculate tooltip position
    const tooltipLeft = bubbleRect.left + (bubbleRect.width / 2) - (tooltipWidth / 2);
    const tooltipTop = bubbleRect.top - tooltipHeight - margin;
    
    // Apply positioning classes for overflow
    if (tooltipLeft < margin) {
        tooltip.classList.add('tooltip-left');
    } else if (tooltipLeft + tooltipWidth > viewportWidth - margin) {
        tooltip.classList.add('tooltip-right');
    }
    
    if (tooltipTop < margin) {
        tooltip.classList.add('tooltip-top');
    }
}

/**
 * Reset tooltip positioning classes
 * @param {Event} event - Mouse leave event
 */
function resetTooltip(event) {
    const bubble = event.currentTarget;
    const tooltip = bubble.querySelector('.skill-tooltip');
    
    if (tooltip) {
        tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-top');
    }
}

// ============================================================================
// AI DISCLAIMER
// ============================================================================

/**
 * Initialize AI disclaimer functionality
 */
function initializeAiDisclaimer() {
    const aiDisclaimerLink = document.getElementById('aiDisclaimerLink');
    const aiDisclaimerText = document.getElementById('aiDisclaimerText');
    
    if (!aiDisclaimerLink || !aiDisclaimerText) return;
    
    aiDisclaimerLink.addEventListener('click', (e) => {
        e.preventDefault();
        aiDisclaimerText.classList.add('show');
        aiDisclaimerText.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
    
    // Close disclaimer when clicking outside
    document.addEventListener('click', (e) => {
        if (!aiDisclaimerLink.contains(e.target) && !aiDisclaimerText.contains(e.target)) {
            closeAiDisclaimer();
        }
    });
    
    // Close disclaimer with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && aiDisclaimerText.classList.contains('show')) {
            closeAiDisclaimer();
        }
    });
}

/**
 * Close AI disclaimer
 */
function closeAiDisclaimer() {
    const aiDisclaimerText = document.getElementById('aiDisclaimerText');
    if (aiDisclaimerText) {
        aiDisclaimerText.classList.remove('show');
        aiDisclaimerText.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Scroll event for active navigation
window.addEventListener('scroll', updateActiveNavigation);

// Window resize handler for tooltip positioning
window.addEventListener('resize', () => {
    // Remove all positioning classes on resize
    document.querySelectorAll('.skill-tooltip').forEach(tooltip => {
        tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-top');
    });
});

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNavigation();
    initializeSmoothScrolling();
    initializeProjectTabs();
    initializeProjectModal();
    initializeScrollAnimations();
    initializeSkillTooltips();
    initializeAiDisclaimer();
    
    // Initialize active navigation highlighting
    updateActiveNavigation();
    
    console.log('Portfolio website initialized successfully');
});