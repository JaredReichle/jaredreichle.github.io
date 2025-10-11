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
        summary: "Developing a Python-based automated testing framework for hardware benchmarking that integrates with multiple hardware interfaces via APIs and serial protocols. The system implements automated test execution, real-time data collection, and generates comprehensive pass/fail reports with detailed metrics and failure analysis.",
        layman: "Instead of a person having to manually test equipment and write down results, I'm making a computer program that does all the testing automatically and tells you if the equipment works or not.",
        technical: "Built using Python with asyncio for concurrent test execution and SQLite for data persistence. Implements modular architecture with pluggable hardware drivers supporting RS-232, Ethernet, and USB interfaces. Features include automated test scheduling, real-time monitoring dashboards, statistical analysis of test results, and configurable pass/fail criteria. The system uses dependency injection for hardware abstraction and supports both standalone and distributed testing scenarios.",
        tech: ["Python", "Hardware Integration", "Test Automation", "Data Analysis", "Reporting"],
        challenges: [
            "Integrating multiple hardware protocols (RS-232, Ethernet, USB) with a unified interface",
            "Designing async test execution to handle 50+ concurrent test sessions",
            "Creating flexible pass/fail criteria that work across different equipment types"
        ],
        technologies: [
            "Python asyncio for concurrent hardware control",
            "SQLite with custom indexing for high-frequency data logging",
            "Dependency injection patterns for hardware abstraction"
        ],
    },
    homelabServers: {
        title: "Home Lab Servers & Proxmox Cluster",
        summary: "Deployed a Proxmox VE hypervisor cluster using decommissioned Dell Optiplex mini computers to create a private cloud infrastructure. The setup enables virtualization of multiple operating systems, container orchestration, and network isolation for testing and development environments.",
        layman: "I turned old computers into a system that can run many different computer programs at the same time, like having multiple computers in one box.",
        technical: "Implemented Proxmox VE on two Dell Optiplex mini computers with 8GB RAM per node. Configured VLAN-based network segmentation, iSCSI storage clustering, and automated VM provisioning. The cluster supports LXC containers and KVM virtual machines running various Linux distributions (RHEL, Ubuntu, Kali Linux) and Windows Server. Implemented automated backup strategies using Proxmox Backup Server. Currently expanding with TrueNAS for network-attached storage and exploring Kubernetes deployment on the cluster.",
        tech: ["Proxmox", "Linux", "Virtualization", "Networking", "Hardware"],
        challenges: [
            "Sandboxing with different tools, technologies and OSes",
            "Network segmentation is more complex than expected in home environments",
            "Managing resource allocation across multiple VMs with limited RAM"
        ],
        technologies: [
            "Proxmox VE hypervisor management and clustering",
            "VLAN configuration and network isolation techniques",
            "LXC containers vs KVM virtual machines performance optimization"
        ],
    },
    astronomyTools: {
        title: "Telescope Control Scripts & Stellarium Integration",
        summary: "Developed a Python-based protocol translation system that bridges Stellarium's TCP-based telescope control interface with the Orion XX14G's RS-232 serial protocol. The system implements real-time coordinate conversion, command translation, and bidirectional communication for automated telescope control.",
        layman: "I made my telescope work with astronomy software. Now I can click on stars in the software and my telescope automatically points to that star in the sky.",
        technical: "Built a TCP listener in Python that captures slew commands from Stellarium, then decodes and translates them into the proper RS-232 protocol for the Orion XX14G. The system acts as a bridge between Stellarium's network commands and the telescope's serial interface, handling coordinate conversion and command formatting. It's basically reverse-engineering the communication protocol to make incompatible systems work together. Implements error handling for communication failures and supports both equatorial and alt-azimuth coordinate systems.",
        tech: ["Python", "TCP Networking", "RS-232 Serial", "Protocol Translation", "Telescope Control"],
        challenges: [
            "Making incompatible software and hardware work together",
            "Converting between equatorial and alt-azimuth coordinate systems in real-time",
            "Handling communication failures gracefully without losing telescope position"
        ],
        technologies: [
            "TCP socket programming for real-time command interception",
            "RS-232 serial communication with hardware flow control",
            "Coordinate transformation mathematics for astronomical calculations"
        ],
    },
    hnefatafl: {
        title: "Hnefatafl Board Game Emulator",
        summary: "Implemented a complete Hnefatafl board game engine using Python and Pygame, featuring traditional Viking game rules, interactive graphics, and local multiplayer functionality. The system includes move validation algorithms, game state management, and user interface components.",
        layman: "I made a computer version of an old Viking board game. It's like chess but different - one player tries to help the king escape while the other tries to catch him.",
        technical: "Developed using Python with Pygame for graphics rendering and event handling. Implemented object-oriented design with separate classes for game board, pieces, and game logic. Features include traditional Hnefatafl rules implementation, move validation algorithms, turn-based gameplay mechanics, and interactive visual feedback. The system uses event-driven programming for user input and includes game state persistence for save/load functionality.",
        tech: ["Python", "Pygame", "Game Development", "Object-Oriented Programming", "Local Multiplayer"],
        challenges: [
            "Translating ancient game rules into modern programming logic",
            "Creating user interface for a game with no existing digital precedent",
            "Handling asymmetric gameplay mechanics in a symmetric codebase"
        ],
        technologies: [
            "Pygame graphics rendering and event handling systems",
            "Object-oriented game state management and persistence",
            "Event-driven programming for real-time user interaction"
        ],
    },
    fpgaLaserControl: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
        summary: "Designed and implemented a real-time laser frequency stabilization system using Xilinx Zynq 7010 SoC with custom VHDL modules for data acquisition and control. The system implements Pound-Drever-Hall locking with PID feedback control for sub-Hz frequency stability in laser interferometry applications.",
        layman: "I built a system that keeps a laser perfectly stable for scientific measurements. It's like a smart thermostat, but instead of controlling temperature, it keeps the laser's color exactly right.",
        technical: "Used a Xilinx Zynq 7010 SoC with custom VHDL modules for the real-time control and data acquisition. Python handles the data processing and analysis side, while the FPGA manages the fast control loops and signal conditioning. The system implements a Pound-Drever-Hall control loop with PID feedback to keep the laser frequency locked. Features include real-time data logging, automated lock acquisition, and configurable control parameters for different laser systems.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        challenges: [
            "Maintaining laser stability in a noisy laboratory environment",
            "Implementing real-time control loops with microsecond precision timing",
            "Debugging VHDL modules without traditional simulation tools"
        ],
        technologies: [
            "Xilinx Zynq 7010 SoC programming and ARM-FPGA communication",
            "Pound-Drever-Hall locking theory and PID control implementation",
            "High-speed ADC/DAC interfacing and signal conditioning"
        ],
    },
    circuitSynthesis: {
        title: "Circuit Synthesis from Frequency Response Data",
        summary: "Developed a Python-based circuit synthesis tool that performs black-box circuit analysis using frequency response data. The system implements rational approximation algorithms, impedance matching techniques, and automated RLC parameter extraction to reconstruct circuit topology from frequency domain measurements.",
        layman: "I made a program that can figure out what's inside an electronic device without opening it. It listens to how the device responds to different signals and then tells you what electronic parts are probably inside.",
        technical: "Implemented Vector Fitting algorithms for rational approximation of frequency response data, using iterative pole-residue optimization to minimize fitting error. The system employs passivity enforcement techniques to ensure physical realizability of synthesized circuits. Features include automated RLC parameter extraction, SPICE netlist generation, and support for multi-port systems. The algorithm uses frequency domain analysis with impedance matching to reconstruct circuit topology, incorporating techniques from 'Vector Fitting Algorithm for Rational Approximation of Frequency Domain Responses' and 'Passivity Enforcement in Rational Approximation' publications.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        challenges: [
            "Converting frequency domain data into physically realizable circuit models",
            "Preventing non-physical circuit behavior through passivity constraints",
            "Ensuring mathematical models produce real-world circuit components"
        ],
        technologies: [
            "Vector Fitting algorithm implementation and pole-residue optimization",
            "SPICE netlist generation from mathematical models",
            "Multi-port system analysis and impedance matching techniques"
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
    
    // Update challenges list
    const challengesList = document.getElementById('modalChallenges');
    challengesList.innerHTML = project.challenges.map(challenge => 
        `<li>${challenge}</li>`
    ).join('');
    
    // Update technologies list
    const technologiesList = document.getElementById('modalTechnologies');
    technologiesList.innerHTML = project.technologies.map(technology => 
        `<li>${technology}</li>`
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