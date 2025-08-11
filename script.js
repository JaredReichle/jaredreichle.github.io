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
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================================================
// PROJECT MODAL SYSTEM
// ============================================================================

/**
 * Project data configuration
 */
const projectData = {
    homelabServers: {
        title: "Home Lab Servers & Proxmox Cluster",
        summary: "Built a home lab environment using surplus hardware to create a Proxmox virtualization cluster. This setup enables experimentation with various operating systems (RHEL, Ubuntu, Kali), networking configurations (NFS, vmbr), and virtualization technologies (Containers, VMs, ISOs).",
        layman: "Think of this like having a mini data center in my house. I took old computers and turned them into a system that can run multiple virtual machines (kinda like digital computers) and experiment with different technologies, just like big companies do but on a smaller scale.",
        technical: "The home lab consists of cheap computers from the neighboring university surplus running Proxmox VE for virtualization management. The cluster provides availability and resource pooling across multiple nodes. I had quite a few issues in configuring the network interface settings on those machines, but once I got them up I was able to enjoy the lab. I've used them to explore kernel features, dabble with cyber tools, and am currently looking to set up a home NAS.",
        tech: ["Proxmox", "Linux", "Virtualization", "Networking", "Hardware"],
        highlights: [
            "Proxmox virtualization cluster setup",
            "Multiple VM environments for testing",
            "Network configuration debugging",
            "Containerized application deployments",
            "Security hardening and access controls",
            "Monitoring, management and cyber tools"
        ],
    },
    fpgaLaserControl: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
        summary: "Designed and implemented a modular FPGA-based system to acquire data and drive closed-loop control for a laser interferometer, simulating and verifying the architecture on a Zynq 7010 SoC.",
        layman: "Imagine you have a very precise laser that needs to stay perfectly stable for scientific measurements. I built a system that constantly monitors the laser and makes tiny adjustments to keep it running perfectly, like a smart thermostat but for a laser's wavelength instead of temperature.",
        technical: "The system utilizes a Xilinx Zynq 7010 SoC with custom VHDL modules for data acquisition and control logic. Python interfaces handle data processing and analysis, while the FPGA manages real-time control loops and signal conditioning for the laser interferometer. The architecture implements a Pound-Drever-Hall control loop with PID feedback mechanisms (driving current) for precise frequency stabilization.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        highlights: [
            "Modular FPGA architecture design",
            "Real-time data acquisition system",
            "Closed-loop control implementation",
            "Laser interferometer integration",
            "Zynq 7010 SoC verification",
            "Signal processing and analysis"
        ],
    },
    circuitSynthesis: {
        title: "Circuit Synthesis from Frequency Response Data",
        summary: "Built a Python tool that reverse-engineers frequency response data into equivalent RLC circuit branches, effectively turning a 'black-box' circuit into an analyzable model.",
        layman: "Imagine you have a mysterious electronic device in a black box and you want to figure out what's inside without opening it. I created a program that listens to how the device responds (output nodes) to different signals (input nodes) and then figures out what electronic components are likely inside, like solving a puzzle using math.",
        technical: "The tool uses signal processing techniques to analyze frequency response data and employs rational approximation algorithms to create equivalent RLC circuit models. Python libraries handle complex mathematical operations, while custom algorithms perform circuit parameter extraction and model validation. The system implements frequency domain analysis with impedance matching algorithms to reconstruct circuit topology.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        highlights: [
            "Frequency response data analysis",
            "RLC circuit synthesis algorithms",
            "Black-box circuit modeling",
            "Numerical optimization techniques",
            "Circuit parameter extraction",
            "Model validation and verification"
        ],
    },
    telescopeConversion: {
        title: "DIY Go-To Dobsonian Telescope Conversion",
        summary: "Upgrading a 12-inch Apertura Dobsonian by adding stepper motors and implementing Stellarium slew commands, turning a manual telescope into a go-to system for automated star tracking and positioning.",
        layman: "I'm taking a manual telescope that you normally have to point by hand and adding motors and a computer control to it. This will let me tell the telescope to find specific stars or galaxies automatically, and it will track them as they move across the sky, like having a robot assistant for stargazing.",
        technical: "The conversion involves integrating stepper motors to both the azimuth and altitude axes of the Dobsonian mount. An Arduino-based control system manages the motors and receives Stellarium slew commands for accurate celestial object positioning. The system includes manual override capabilities and real-time position feedback with precision encoders for position verification.",
        tech: ["Arduino", "Stepper Motors", "Astronomy", "Mechanical Design", "C++", "Stellarium"],
        highlights: [
            "Stepper motor integration for azimuth and altitude control",
            "Stellarium slew command system implementation",
            "Automated star positioning and tracking",
            "Manual override capabilities",
            "Precision mechanical modifications",
            "Real-time position feedback and control"
        ],
    }
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
    
    // Show/hide Dobsonian update section
    toggleDobsonianUpdate(projectId);
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
 * Toggle Dobsonian update section visibility
 * @param {string} projectId - Project identifier
 */
function toggleDobsonianUpdate(projectId) {
    const dobsonianUpdate = document.querySelector('.dobsonian-update');
    if (dobsonianUpdate) {
        dobsonianUpdate.style.display = projectId === 'telescopeConversion' ? 'block' : 'none';
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
    initializeProjectModal();
    initializeScrollAnimations();
    initializeSkillTooltips();
    initializeAiDisclaimer();
    
    console.log('Portfolio website initialized successfully');
});