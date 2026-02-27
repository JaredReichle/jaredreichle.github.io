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
        title: "Test Automation Platform",
        image: "images/projects/BEAKERStockLogo.jpg",
        summary: "Cut test cycles from 3 weeks down to under an hour. This automated testing platform removes manual hardware testing where engineers had to log into machines and run commands. It combines custom hardware plugins with a unified test framework to automate execution end to end. System test engineers can run tests whenever they need them instead of waiting weeks for manual execution.",
        layman: "Instead of engineers spending weeks manually testing equipment by logging into machines and running commands, the platform does it automatically. What used to take 3 weeks now takes less than an hour, saving significant time and effort.",
        technical: "Built using Python with asyncio for concurrent test execution and SQLite for data persistence. Implements modular architecture with pluggable hardware drivers supporting RS-232, Ethernet, and USB interfaces. The system integrates with hardware through custom plugins that interface with a test automation framework, eliminating manual login and command execution. Features include automated test scheduling, real-time monitoring dashboards, statistical analysis of test results, and configurable pass/fail criteria. The system uses dependency injection for hardware abstraction and supports both standalone and distributed testing scenarios.",
        architecture: "The system follows a modular plugin architecture where hardware-specific drivers are abstracted through a unified interface. The core framework manages test execution, scheduling, and data collection, while hardware plugins handle protocol-specific communication (RS-232, Ethernet, USB). The system uses dependency injection to decouple hardware dependencies from test logic, enabling easy addition of new hardware types. Data flows from hardware through plugins to the test framework, which processes results and stores them in SQLite. Real-time monitoring is achieved through async event streams that update dashboards without blocking test execution.",
        implementation: "The system is built on Python's asyncio for concurrent execution, allowing multiple test sessions to run simultaneously without blocking. Each hardware plugin implements a standard interface with methods for connection, command execution, and data retrieval. The test framework uses a queue-based scheduler that manages test execution order and resource allocation. Statistical analysis is performed on test results using pandas, with configurable pass/fail criteria that can evaluate multiple metrics simultaneously. The dashboard uses a web-based interface that connects to the test framework via WebSocket for real-time updates.",
        tech: ["Python", "Hardware Integration", "Test Automation", "Data Analysis", "Reporting"],
        highlights: [
            "Reduced test cycles from 3 weeks to under 1 hour",
            "Built modular hardware plugin system supporting RS-232, Ethernet, and USB",
            "Enabled 50+ concurrent test sessions with async execution",
            "Achieved 70% team adoption rate"
        ],
        challenges: [
            "Integrating multiple hardware protocols (RS-232, Ethernet, USB) with a unified interface",
            "Designing async test execution to handle 50+ concurrent test sessions",
            "Creating flexible pass/fail criteria that work across different equipment types"
        ],
        metrics: [
            { label: "3 weeks → 1 hour", type: "time", icon: "fa-clock" },
            { label: "70% adoption", type: "adoption", icon: "fa-users" }
        ]
    },
    atlassianApi: {
        title: "Atlassian API Toolkit",
        image: "images/projects/AtlassianAPI.jpg",
        summary: "Built reusable API clients for Jira and Confluence that other developers at work now use for their own projects. These clients handle authentication, rate limiting, and error handling so developers don't have to write that boilerplate code every time. Multiple tools have been built on top of these clients, including Jira story exporters, equipment management systems, and inventory configuration dashboards.",
        layman: "I made tools that let other developers easily connect to Jira and Confluence without having to figure out all the complicated API stuff themselves. Now they can just use my code and focus on building their actual features.",
        technical: "Developed Python-based API clients for Jira and Confluence using the REST APIs. Implemented OAuth2 authentication, request rate limiting, pagination handling, and comprehensive error handling. The clients abstract away the complexity of API interactions, providing simple methods for common operations like creating issues, searching, and managing assets. Used by multiple internal tools including a Jira story export tool, an equipment management system for lab environments, and an inventory configuration dashboard.",
        architecture: "The API clients use a layered architecture with a base HTTP client that handles authentication, rate limiting, and error handling. Each Atlassian product (Jira, Confluence) has its own client class that extends the base functionality with product-specific methods. The clients implement a retry mechanism with exponential backoff for rate limit handling, and automatic pagination for endpoints that return large datasets. Authentication is abstracted through a strategy pattern, supporting API tokens, OAuth2, and basic auth.",
        implementation: "Built using the requests library with custom session management for connection pooling and cookie handling. Rate limiting is implemented using a token bucket algorithm that tracks API calls per minute. Pagination is handled automatically through iterator patterns that fetch pages on-demand. Error handling includes specific exception types for different HTTP status codes, with detailed error messages that help developers debug issues. The clients use type hints and docstrings extensively to provide a clear API for other developers.",
        tech: ["Python", "REST APIs", "OAuth2", "Jira", "Confluence"],
        highlights: [
            "Created reusable API clients used by multiple internal tools",
            "Eliminated boilerplate code for authentication and rate limiting",
            "Enabled Jira story exporters, equipment management systems, and inventory dashboards",
            "Supported multiple authentication methods across Atlassian instances"
        ],
        challenges: [
            "Handling rate limits and pagination for large data sets",
            "Creating a simple interface that hides API complexity",
            "Supporting multiple authentication methods across different Atlassian instances"
        ],
        metrics: [
            { label: "3+ tools built", type: "adoption", icon: "fa-tools" }
        ]
    },
    homelab: {
        title: "Homelab Infrastructure",
        image: "images/projects/homelab-proxmox.png",
        summary: "A Proxmox-based homelab infrastructure built with an emphasis on reliability, observability, and recoverability. Replaced paid cloud services with self-hosted alternatives including Jellyfin for media, AdGuard Home for DNS and network-wide ad blocking, Immich for photos and videos, and WireGuard for remote access to all these services. The architecture, decisions, and evolution are documented in an Obsidian vault to enable long-term reasoning about the system and avoid repeating mistakes. Built primarily around Proxmox and self-hosted services rather than novelty.",
        layman: "I set up my own servers at home to replace services I was paying for. Now I have my own Netflix, my own cloud storage, and my own ad blocker. I own everything and my data stays private. I also keep detailed notes about how everything works so I can maintain and improve it over time.",
        technical: "Deployed Proxmox VE hypervisor cluster on decommissioned hardware with ZFS for storage redundancy. Running Jellyfin media server with an *arr suite for content management, AdGuard Home for DNS and network-wide ad blocking, Immich for photos and videos, and WireGuard for remote access to all services. Services are organized into VLANs for network segmentation with a reverse proxy (Nginx) handling SSL termination. The entire architecture is documented in an Obsidian vault covering overview, architecture, services, automation, operations, and ongoing thoughts. The setup prioritizes reliability and recoverability over cutting-edge features.",
        architecture: "The infrastructure is built on Proxmox VE, which provides virtualization and containerization capabilities. Services are organized into VLANs for network segmentation, with a reverse proxy (Nginx) handling SSL termination and routing. AdGuard Home acts as the network's DNS server, blocking ads at the DNS level and providing network-wide ad blocking. WireGuard provides secure remote access to all services without exposing ports to the internet. Each service runs in either a VM or LXC container, with resource limits to prevent any single service from consuming all available resources. Architecture documentation is maintained in an Obsidian vault structured by overview, architecture, services, automation, operations, and thoughts.",
        implementation: "Proxmox is installed on bare metal with ZFS for storage redundancy. Services are deployed using Docker containers where possible, managed through Portainer for easier administration. The reverse proxy uses Let's Encrypt for SSL certificates with automatic renewal. Network configuration uses VLANs to separate services (media, infrastructure, development) for security. Backup strategy includes automated snapshots of critical VMs and containers. Monitoring is handled through a combination of Proxmox's built-in monitoring and custom scripts that alert on resource usage or service failures. All architecture decisions, tradeoffs, and evolution are documented in the HomelabNotes repository as an Obsidian vault for long-term maintainability.",
        tech: ["Proxmox", "Linux", "Docker", "Networking", "Self-Hosting", "Obsidian", "ZFS"],
        highlights: [
            "Replaced paid cloud services with self-hosted alternatives",
            "Deployed Proxmox VE hypervisor cluster on decommissioned hardware",
            "Implemented network-wide ad blocking with AdGuard Home and secure remote access with WireGuard",
            "Documented architecture and decisions in Obsidian vault for long-term maintainability"
        ],
        challenges: [
            "Learning networking fundamentals like VLANs and reverse proxies",
            "Managing resource allocation across multiple services with limited hardware",
            "Setting up secure remote access without exposing services to the internet",
            "Maintaining comprehensive documentation to enable long-term reasoning about system decisions"
        ],
        metrics: [
            { label: "Cost savings", type: "cost", icon: "fa-dollar-sign" }
        ]
    },
    astronomyTools: {
        title: "Telescope Control Bridge",
        image: "images/projects/orion.jpg",
        summary: "I wanted to use Stellarium to control my telescope instead of the clunky hand controller. Built Python scripts that translate Stellarium's commands into the format my Orion XX14G telescope understands. It doesn't save much time, but the experience is way better with the nicer UI. This was purely for my own enjoyment.",
        layman: "I made my telescope work with astronomy software. Now I can click on stars in the software and my telescope automatically points to that star in the sky. The interface is much nicer than the hand controller.",
        technical: "Built a TCP listener in Python that captures slew commands from Stellarium, then decodes and translates them into the proper RS-232 protocol for the Orion XX14G. The system acts as a bridge between Stellarium's network commands and the telescope's serial interface, handling coordinate conversion and command formatting. It's basically reverse-engineering the communication protocol to make incompatible systems work together. Implements error handling for communication failures and supports both equatorial and alt-azimuth coordinate systems.",
        architecture: "The system uses a client-server architecture where Stellarium acts as the client sending TCP commands, and the Python bridge acts as the server. The bridge receives network commands, parses them, converts coordinates from equatorial to alt-azimuth format, and translates them into the telescope's proprietary RS-232 protocol. The system maintains state for the current telescope position and handles reconnection logic if communication is lost.",
        implementation: "Implemented using Python's socket library for TCP communication and pyserial for RS-232 communication. The coordinate conversion uses spherical trigonometry to transform between coordinate systems. Command translation involves parsing Stellarium's ASCII-based protocol and encoding it into the telescope's binary protocol. Error handling includes timeout detection, connection retry logic, and position recovery mechanisms. The system runs as a background service that can be started independently of Stellarium.",
        tech: ["Python", "TCP Networking", "RS-232 Serial", "Protocol Translation", "Telescope Control"],
        highlights: [
            "Bridged incompatible software and hardware through protocol translation",
            "Enabled telescope control via Stellarium's intuitive UI",
            "Implemented real-time coordinate system conversion",
            "Added error handling for reliable communication"
        ],
        challenges: [
            "Making incompatible software and hardware work together",
            "Converting between equatorial and alt-azimuth coordinate systems in real-time",
            "Handling communication failures gracefully without losing telescope position"
        ],
        metrics: []
    },
    fpgaLaserControl: {
        title: "FPGA Laser Interferometer Control System",
        image: "images/projects/laser_interferometer.jpg",
        summary: "Built a system for fine current control to achieve an ultra-stable wavelength for laser interferometry to identify gas compositions. All lasers have noise that's not helpful for interferometry, so I set up an FPGA data acquisition and control feedback loop to stabilize the laser wavelength. We were able to achieve control and data acquisition through commercial FPGAs, but couldn't achieve the stability we hoped for within the allotted time. The company that sourced us as students would have had to pay a lot more for highly precise instrumentation otherwise.",
        layman: "I built a system that keeps a laser perfectly stable for scientific measurements. It's like a smart thermostat, but instead of controlling temperature, it keeps the laser's color exactly right. This helps scientists identify what gases are in the air.",
        technical: "Used a Xilinx Zynq 7010 SoC with custom VHDL modules for the real-time control and data acquisition. Python handles the data processing and analysis side, while the FPGA manages the fast control loops and signal conditioning. The system implements a Pound-Drever-Hall control loop with PID feedback to keep the laser frequency locked. Features include real-time data logging, automated lock acquisition, and configurable control parameters for different laser systems.",
        architecture: "The system uses a hybrid architecture with an FPGA handling real-time control and a host computer running Python for data processing. The FPGA implements the Pound-Drever-Hall (PDH) control loop, which uses phase-sensitive detection to generate error signals. The error signal feeds into a PID controller implemented in VHDL, which outputs control signals to a laser current driver. The FPGA also handles high-speed ADC sampling and data buffering. Communication between FPGA and host uses AXI interfaces on the Zynq SoC.",
        implementation: "The PDH loop is implemented using VHDL modules for signal processing: a phase detector, low-pass filter, and PID controller. The phase detector uses a reference signal and feedback signal to generate an error signal proportional to frequency deviation. The PID controller processes this error with configurable gains (Kp, Ki, Kd) to generate control outputs. ADC sampling runs at high frequency (MHz range) to capture fast laser fluctuations. Python scripts on the host computer configure PID parameters, log data, and provide visualization. The system uses fixed-point arithmetic in VHDL for deterministic timing.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        highlights: [
            "Built FPGA-based control system for laser wavelength stabilization",
            "Implemented Pound-Drever-Hall control loop with PID feedback",
            "Achieved real-time control loops with microsecond precision",
            "Delivered cost-effective solution using commercial FPGAs"
        ],
        challenges: [
            "Maintaining laser stability in a noisy laboratory environment",
            "Implementing real-time control loops with microsecond precision timing",
            "Debugging VHDL modules without traditional simulation tools"
        ],
        metrics: []
    },
    circuitSynthesis: {
        title: "Frequency-Response Circuit Synthesis",
        image: "images/projects/circuits.jpg",
        summary: "These numerical methods are applied to black box hardware testing when you don't know or can't know the internals of how a hardware piece is designed. These methods allow you to design a very close clone of the internals of a black box circuit. Trying to replicate the hardware in any other way has immense challenges and hurdles, but applying these numerical methods made it much simpler to make a close-in-behavior clone for the sake of analysis and testing. This was based on a class I took senior year in my undergrad and was a lot of fun.",
        layman: "I made a program that can figure out what's inside an electronic device without opening it. It listens to how the device responds to different signals and then tells you what electronic parts are probably inside. This is useful for testing hardware when you can't see inside it.",
        technical: "Implemented Vector Fitting algorithms for rational approximation of frequency response data, using iterative pole-residue optimization to minimize fitting error. The system employs passivity enforcement techniques to ensure physical realizability of synthesized circuits. Features include automated RLC parameter extraction, SPICE netlist generation, and support for multi-port systems. The algorithm uses frequency domain analysis with impedance matching to reconstruct circuit topology, incorporating techniques from 'Vector Fitting Algorithm for Rational Approximation of Frequency Domain Responses' and 'Passivity Enforcement in Rational Approximation' publications.",
        architecture: "The system processes frequency response data through a pipeline: data preprocessing, rational approximation via Vector Fitting, passivity enforcement, and circuit synthesis. Vector Fitting iteratively finds poles and residues that approximate the frequency response as a rational function. Passivity enforcement ensures the resulting transfer function represents a physically realizable passive circuit. The synthesis step converts the rational function into RLC component values and generates a SPICE netlist representing the equivalent circuit.",
        implementation: "Implemented in Python using NumPy and SciPy for numerical optimization. Vector Fitting uses iterative pole relocation to minimize fitting error between the rational approximation and measured data. The algorithm alternates between solving linear least-squares problems for residues and nonlinear optimization for poles. Passivity enforcement uses eigenvalue constraints to ensure the transfer function matrix is positive real. RLC extraction identifies component values by matching the rational function's poles and zeros to circuit topologies. SPICE netlist generation creates standard circuit description files that can be simulated in circuit analysis tools.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        highlights: [
            "Implemented Vector Fitting algorithms for black box circuit analysis",
            "Enabled circuit topology reconstruction from frequency response data",
            "Automated RLC parameter extraction and SPICE netlist generation",
            "Applied passivity enforcement for physically realizable circuits"
        ],
        challenges: [
            "Converting frequency domain data into physically realizable circuit models",
            "Preventing non-physical circuit behavior through passivity constraints",
            "Ensuring mathematical models produce real-world circuit components"
        ],
        metrics: []
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
    // Update title
    document.getElementById('modalTitle').textContent = project.title;
    
    // Update project image
    const projectImage = document.getElementById('modalProjectImage');
    if (projectImage && project.image) {
        projectImage.src = project.image;
        projectImage.alt = `${project.title} project image`;
    }
    
    // Update metrics (in Results & Metrics section)
    const metricsSection = document.querySelector('.modal-metrics-section');
    const metricsContainer = document.getElementById('modalMetrics');
    if (metricsContainer && project.metrics && project.metrics.length > 0) {
        metricsContainer.innerHTML = project.metrics.map(metric => {
            const icon = metric.icon ? `<i class="fas ${metric.icon}" aria-hidden="true"></i>` : '';
            return `<div class="metric-card">
                ${icon}
                <span class="metric-label">${metric.label}</span>
            </div>`;
        }).join('');
        if (metricsSection) {
            metricsSection.style.display = 'block';
        }
    } else {
        // Hide entire metrics section (including header) when there are no metrics
        if (metricsSection) {
            metricsSection.style.display = 'none';
        }
        if (metricsContainer) {
            metricsContainer.innerHTML = '';
        }
    }
    
    // Update summary
    document.getElementById('modalSummary').textContent = project.summary;
    
    // Update highlights
    const highlightsList = document.getElementById('modalHighlights');
    if (highlightsList && project.highlights) {
        highlightsList.innerHTML = project.highlights.map(highlight => 
            `<li>${highlight}</li>`
        ).join('');
    }
    
    // Update layman explanation
    document.getElementById('modalLayman').textContent = project.layman;
    
    // Update architecture
    const architectureDiv = document.getElementById('modalArchitecture');
    if (architectureDiv && project.architecture) {
        architectureDiv.innerHTML = `<p>${project.architecture}</p>`;
    } else if (architectureDiv) {
        architectureDiv.innerHTML = '<p>Architecture details not available.</p>';
    }
    
    // Update implementation
    const implementationDiv = document.getElementById('modalImplementation');
    if (implementationDiv && project.implementation) {
        implementationDiv.innerHTML = `<p>${project.implementation}</p>`;
    } else if (implementationDiv) {
        implementationDiv.innerHTML = '<p>Implementation details not available.</p>';
    }
    
    // Update challenges list
    const challengesList = document.getElementById('modalChallenges');
    challengesList.innerHTML = project.challenges.map(challenge => 
        `<li>${challenge}</li>`
    ).join('');
    
    // Update results/technical section
    const resultsDiv = document.getElementById('modalResults');
    if (resultsDiv) {
        const technicalP = document.getElementById('modalTechnical');
        if (technicalP) {
            technicalP.textContent = project.technical;
        }
    }
    
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
        astronomyTools: {
            url: 'https://github.com/JaredReichle/DobConversion',
            text: 'View on GitHub',
            icon: 'fab fa-github'
        },
        beaker: {
            url: 'https://github.com/JaredReichle/BEAKER',
            text: 'View on GitHub',
            icon: 'fab fa-github'
        },
        homelab: {
            url: 'https://github.com/JaredReichle/HomelabNotes',
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