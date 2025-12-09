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
        summary: "Cut test cycles from 3 weeks down to under an hour. This automated testing framework gets rid of all the manual hardware testing where engineers had to log into machines and run commands. BEAKER combines custom hardware plugins with a testing framework to automate everything. Now system test engineers can run tests whenever they need them instead of waiting weeks for manual execution.",
        layman: "Instead of engineers spending weeks manually testing equipment by logging into machines and running commands, BEAKER does all of this automatically. What used to take 3 weeks now takes less than an hour. Saves the company a lot of time and money.",
        technical: "Built using Python with asyncio for concurrent test execution and SQLite for data persistence. Implements modular architecture with pluggable hardware drivers supporting RS-232, Ethernet, and USB interfaces. The system integrates with hardware through custom plugins that interface with a test automation framework, eliminating manual login and command execution. Features include automated test scheduling, real-time monitoring dashboards, statistical analysis of test results, and configurable pass/fail criteria. The system uses dependency injection for hardware abstraction and supports both standalone and distributed testing scenarios.",
        tech: ["Python", "Hardware Integration", "Test Automation", "Data Analysis", "Reporting"],
        challenges: [
            "Integrating multiple hardware protocols (RS-232, Ethernet, USB) with a unified interface",
            "Designing async test execution to handle 50+ concurrent test sessions",
            "Creating flexible pass/fail criteria that work across different equipment types"
        ],
        metrics: [
            { label: "3 weeks → 1 hour", type: "time" },
            { label: "70% adoption", type: "adoption" }
        ]
    },
    atlassianApi: {
        title: "Atlassian API Clients",
        summary: "Built reusable API clients for Jira and Confluence that other developers at work now use for their own projects. These clients handle authentication, rate limiting, and error handling so developers don't have to write that boilerplate code every time. Multiple tools have been built on top of these clients, including Jira story exporters, equipment management systems, and inventory configuration dashboards.",
        layman: "I made tools that let other developers easily connect to Jira and Confluence without having to figure out all the complicated API stuff themselves. Now they can just use my code and focus on building their actual features.",
        technical: "Developed Python-based API clients for Jira and Confluence using the REST APIs. Implemented OAuth2 authentication, request rate limiting, pagination handling, and comprehensive error handling. The clients abstract away the complexity of API interactions, providing simple methods for common operations like creating issues, searching, and managing assets. Used by multiple internal tools including a Jira story export tool, an equipment management system for lab environments, and an inventory configuration dashboard.",
        tech: ["Python", "REST APIs", "OAuth2", "Jira", "Confluence"],
        challenges: [
            "Handling rate limits and pagination for large data sets",
            "Creating a simple interface that hides API complexity",
            "Supporting multiple authentication methods across different Atlassian instances"
        ]
    },
    homelabServers: {
        title: "Self-Hosted Privacy Infrastructure",
        summary: "I've been moving away from cloud services to take back control of my data and save money. This Proxmox-based home lab runs Jellyfin for media, PiHole for network-wide ad blocking, Tailscale for VPN mesh networking, and various other self-hosted services. Instead of paying for Netflix, cloud storage, and other subscriptions, I own and control everything. It's also been great for learning networking fundamentals, especially as I work with networked hardware at my job.",
        layman: "I set up my own servers at home to replace services I was paying for. Now I have my own Netflix, my own cloud storage, and my own ad blocker. I own everything and my data stays private.",
        technical: "Deployed Proxmox VE hypervisor cluster on decommissioned hardware. Running Jellyfin media server with an *arr suite for content management, PiHole for DNS-based ad blocking, Tailscale for VPN mesh networking, and experimenting with Immich for photo storage and Mealie for recipe management. Also using it to experiment with different Unix-like operating systems including Kali Linux for security tools. The setup has been invaluable for understanding networking, especially VLANs, reverse proxies, and VPN configurations that directly apply to my work with networked hardware.",
        tech: ["Proxmox", "Linux", "Docker", "Networking", "Self-Hosting"],
        challenges: [
            "Learning networking fundamentals like VLANs and reverse proxies",
            "Managing resource allocation across multiple services with limited hardware",
            "Setting up secure remote access without exposing services to the internet"
        ],
        metrics: [
            { label: "Cost savings", type: "cost" }
        ]
    },
    astronomyTools: {
        title: "Telescope Control Scripts & Stellarium Integration",
        summary: "I wanted to use Stellarium to control my telescope instead of the clunky hand controller. Built Python scripts that translate Stellarium's commands into the format my Orion XX14G telescope understands. It doesn't save much time, but the experience is way better with the nicer UI. This was purely for my own enjoyment.",
        layman: "I made my telescope work with astronomy software. Now I can click on stars in the software and my telescope automatically points to that star in the sky. The interface is much nicer than the hand controller.",
        technical: "Built a TCP listener in Python that captures slew commands from Stellarium, then decodes and translates them into the proper RS-232 protocol for the Orion XX14G. The system acts as a bridge between Stellarium's network commands and the telescope's serial interface, handling coordinate conversion and command formatting. It's basically reverse-engineering the communication protocol to make incompatible systems work together. Implements error handling for communication failures and supports both equatorial and alt-azimuth coordinate systems.",
        tech: ["Python", "TCP Networking", "RS-232 Serial", "Protocol Translation", "Telescope Control"],
        challenges: [
            "Making incompatible software and hardware work together",
            "Converting between equatorial and alt-azimuth coordinate systems in real-time",
            "Handling communication failures gracefully without losing telescope position"
        ]
    },
    budgetingApp: {
        title: "Personal Budgeting Application",
        summary: "I didn't want to pay for a budgeting app and the free ones were missing features I needed. Built my own with custom category management, bank statement imports with custom parsing, and a dashboard to track spending. All my financial data stays local for privacy, and I got to build exactly the features I wanted.",
        layman: "I made my own budgeting app because the free ones didn't have what I needed and I didn't want to pay. Now I can track my spending exactly how I want, and all my financial data stays on my computer.",
        technical: "Built a Python application with a web-based dashboard for budget tracking. Implements custom CSV parsing for bank statement imports, flexible category management system, and data visualization for spending patterns. Uses SQLite for local data storage to keep all financial information private. The dashboard provides insights into spending habits and helps identify areas for cost reduction.",
        tech: ["Python", "SQLite", "Data Visualization", "CSV Parsing", "Web Dashboard"],
        challenges: [
            "Parsing different bank statement formats consistently",
            "Creating a flexible category system that adapts to different spending patterns",
            "Building an intuitive dashboard that provides useful insights"
        ]
    },
    homeMaintenance: {
        title: "Home Maintenance Dashboard",
        summary: "I needed reminders for maintenance tasks I always forget about. Built a dashboard that sends alerts for tasks at custom intervals like daily, weekly, monthly, yearly, or even every decade. It reminds me to do things like water heater maintenance, cleaning out the washer, winterizing pipes, and other tasks I'd otherwise forget. Simple but effective. Hoping to make it smarter someday with custom tips and weather/location integration.",
        layman: "I made a reminder system for all the home maintenance stuff I forget about. It tells me when to change filters, clean things, and do other maintenance tasks so my house doesn't fall apart.",
        technical: "Developed a web-based dashboard for tracking home maintenance tasks with configurable reminder intervals. The system stores task definitions, last completion dates, and calculates next due dates based on custom intervals. Features include task categorization, priority levels, and notification system. Built with plans to integrate weather and location data for smarter reminders, like preparing for winter storms or seasonal maintenance.",
        tech: ["Web Dashboard", "Task Management", "Reminder System", "Data Tracking"],
        challenges: [
            "Designing a flexible interval system that handles everything from daily to decadal tasks",
            "Creating an intuitive interface for managing many different maintenance tasks",
            "Planning for future integrations with weather and location services"
        ]
    },
    hnefatafl: {
        title: "Hnefatafl Board Game Emulator",
        summary: "I wanted to play a video game version of Hnefatafl with my wife without buying the board game. Couldn't find a good two-player version online, so I made my own. It was a simple and fun project that let us play together.",
        layman: "I made a computer version of an old Viking board game so my wife and I could play together. It's like chess but different - one player tries to help the king escape while the other tries to catch him.",
        technical: "Developed using Python with Pygame for graphics rendering and event handling. Implemented object-oriented design with separate classes for game board, pieces, and game logic. Features include traditional Hnefatafl rules implementation, move validation algorithms, turn-based gameplay mechanics, and interactive visual feedback. The system uses event-driven programming for user input and includes game state persistence for save/load functionality.",
        tech: ["Python", "Pygame", "Game Development", "Object-Oriented Programming", "Local Multiplayer"],
        challenges: [
            "Translating ancient game rules into modern programming logic",
            "Creating user interface for a game with no existing digital precedent",
            "Handling asymmetric gameplay mechanics in a symmetric codebase"
        ]
    },
    mlTrading: {
        title: "Machine Learning Trading Dashboard",
        summary: "This started as a school project to use live stock data, make statistical inferences, and make decisions based on several ML models including Q-learning, KNN, random forests, and ensemble learners. Built a dashboard to abstract the lessons learned and apply them to a website where users could log in, set up their own model preferences, and backtest them. This was a proof of concept that wasn't made public, but it was a great hands-on way to understand different ML models and their effectiveness at maximizing profits.",
        layman: "I built a system that uses machine learning to try to predict stock prices and make trading decisions. It was a school project that helped me learn how different AI models work and which ones are better at making money.",
        technical: "Developed a web-based trading dashboard that integrates multiple machine learning models for stock prediction and trading signal generation. Implemented Q-learning for reinforcement learning-based trading strategies, KNN for pattern recognition, random forests for ensemble predictions, and various other models. The system includes backtesting functionality, user preference configuration, and performance metrics. Built as a proof of concept to understand model effectiveness and trading strategy optimization.",
        tech: ["Python", "Machine Learning", "scikit-learn", "Trading", "Data Analysis"],
        challenges: [
            "Integrating multiple ML models into a unified trading system",
            "Creating accurate backtesting functionality",
            "Understanding which models work best for different market conditions"
        ]
    },
    slamSimulation: {
        title: "SLAM Algorithm Simulation",
        summary: "This was a proof of concept to understand how the SLAM (Simultaneous Localization and Mapping) algorithm works. It was a great exercise to learn about non-deterministic motion and to tune the proper hyperparameters to help robots learn how to map themselves and their environment. This project helped me understand the fundamentals of robotics navigation and mapping.",
        layman: "I built a simulation to understand how robots can map their environment while moving around. It was a learning project to understand the algorithms that help robots know where they are and what's around them.",
        technical: "Implemented a SLAM algorithm simulation to understand simultaneous localization and mapping concepts. The system models non-deterministic robot motion, sensor noise, and environment mapping. Features include hyperparameter tuning for optimal performance, visualization of robot path and map generation, and comparison of different SLAM approaches. This was an educational project focused on understanding the fundamentals of robotics navigation and probabilistic mapping.",
        tech: ["Python", "SLAM", "Robotics", "Simulation", "Machine Learning"],
        challenges: [
            "Understanding non-deterministic motion models",
            "Tuning hyperparameters for optimal mapping performance",
            "Visualizing complex probabilistic data in an understandable way"
        ]
    },
    fpgaLaserControl: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
        summary: "Built a system for fine current control to achieve an ultra-stable wavelength for laser interferometry to identify gas compositions. All lasers have noise that's not helpful for interferometry, so I set up an FPGA data acquisition and control feedback loop to stabilize the laser wavelength. We were able to achieve control and data acquisition through commercial FPGAs, but couldn't achieve the stability we hoped for within the allotted time. The company that sourced us as students would have had to pay a lot more for highly precise instrumentation otherwise.",
        layman: "I built a system that keeps a laser perfectly stable for scientific measurements. It's like a smart thermostat, but instead of controlling temperature, it keeps the laser's color exactly right. This helps scientists identify what gases are in the air.",
        technical: "Used a Xilinx Zynq 7010 SoC with custom VHDL modules for the real-time control and data acquisition. Python handles the data processing and analysis side, while the FPGA manages the fast control loops and signal conditioning. The system implements a Pound-Drever-Hall control loop with PID feedback to keep the laser frequency locked. Features include real-time data logging, automated lock acquisition, and configurable control parameters for different laser systems.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        challenges: [
            "Maintaining laser stability in a noisy laboratory environment",
            "Implementing real-time control loops with microsecond precision timing",
            "Debugging VHDL modules without traditional simulation tools"
        ],
        metrics: [
            { label: "Cost savings", type: "cost" }
        ]
    },
    circuitSynthesis: {
        title: "Circuit Synthesis from Frequency Response Data",
        summary: "These numerical methods are applied to black box hardware testing when you don't know or can't know the internals of how a hardware piece is designed. These methods allow you to design a very close clone of the internals of a black box circuit. Trying to replicate the hardware in any other way has immense challenges and hurdles, but applying these numerical methods made it much simpler to make a close-in-behavior clone for the sake of analysis and testing. This was based on a class I took senior year in my undergrad and was a lot of fun.",
        layman: "I made a program that can figure out what's inside an electronic device without opening it. It listens to how the device responds to different signals and then tells you what electronic parts are probably inside. This is useful for testing hardware when you can't see inside it.",
        technical: "Implemented Vector Fitting algorithms for rational approximation of frequency response data, using iterative pole-residue optimization to minimize fitting error. The system employs passivity enforcement techniques to ensure physical realizability of synthesized circuits. Features include automated RLC parameter extraction, SPICE netlist generation, and support for multi-port systems. The algorithm uses frequency domain analysis with impedance matching to reconstruct circuit topology, incorporating techniques from 'Vector Fitting Algorithm for Rational Approximation of Frequency Domain Responses' and 'Passivity Enforcement in Rational Approximation' publications.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        challenges: [
            "Converting frequency domain data into physically realizable circuit models",
            "Preventing non-physical circuit behavior through passivity constraints",
            "Ensuring mathematical models produce real-world circuit components"
        ]
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
    // Tooltips are handled by CSS hover, no JavaScript needed
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
// DARK MODE / THEME TOGGLE
// ============================================================================

/**
 * Initialize theme toggle functionality
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Apply theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggle.addEventListener('click', toggleTheme);
}

/**
 * Set the theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// ============================================================================
// EXPANDABLE SECTIONS
// ============================================================================

/**
 * Initialize expandable sections functionality
 */
function initializeExpandableSections() {
    const expandableToggles = document.querySelectorAll('.expandable-toggle');
    
    expandableToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const contentId = toggle.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            
            if (!content) return;
            
            // Toggle expanded state
            const newExpandedState = !isExpanded;
            toggle.setAttribute('aria-expanded', newExpandedState);
            
            // Toggle content visibility
            if (newExpandedState) {
                content.classList.add('expanded');
            } else {
                content.classList.remove('expanded');
            }
        });
    });
}

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
    initializeThemeToggle();
    initializeExpandableSections();
    
    // Initialize active navigation highlighting
    updateActiveNavigation();
    
    console.log('Portfolio website initialized successfully');
});