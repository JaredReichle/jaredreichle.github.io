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
        image: "images/projects/BEAKERStockLogo.jpg",
        summary: "Cut test cycles from 3 weeks down to under an hour. This automated testing framework gets rid of all the manual hardware testing where engineers had to log into machines and run commands. BEAKER combines custom hardware plugins with a testing framework to automate everything. Now system test engineers can run tests whenever they need them instead of waiting weeks for manual execution.",
        layman: "Instead of engineers spending weeks manually testing equipment by logging into machines and running commands, BEAKER does all of this automatically. What used to take 3 weeks now takes less than an hour. Saves the company a lot of time and money.",
        technical: "Built using Python with asyncio for concurrent test execution and SQLite for data persistence. Implements modular architecture with pluggable hardware drivers supporting RS-232, Ethernet, and USB interfaces. The system integrates with hardware through custom plugins that interface with a test automation framework, eliminating manual login and command execution. Features include automated test scheduling, real-time monitoring dashboards, statistical analysis of test results, and configurable pass/fail criteria. The system uses dependency injection for hardware abstraction and supports both standalone and distributed testing scenarios.",
        architecture: "BEAKER follows a modular plugin architecture where hardware-specific drivers are abstracted through a unified interface. The core framework manages test execution, scheduling, and data collection, while hardware plugins handle protocol-specific communication (RS-232, Ethernet, USB). The system uses dependency injection to decouple hardware dependencies from test logic, enabling easy addition of new hardware types. Data flows from hardware through plugins to the test framework, which processes results and stores them in SQLite. Real-time monitoring is achieved through async event streams that update dashboards without blocking test execution.",
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
        title: "Atlassian API Clients",
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
    homelabServers: {
        title: "Self-Hosted Privacy Infrastructure",
        image: "images/projects/homelab-proxmox.png",
        summary: "I've been moving away from cloud services to take back control of my data and save money. This Proxmox-based home lab runs Jellyfin for media, PiHole for network-wide ad blocking, Tailscale for VPN mesh networking, and various other self-hosted services. Instead of paying for Netflix, cloud storage, and other subscriptions, I own and control everything. It's also been great for learning networking fundamentals, especially as I work with networked hardware at my job.",
        layman: "I set up my own servers at home to replace services I was paying for. Now I have my own Netflix, my own cloud storage, and my own ad blocker. I own everything and my data stays private.",
        technical: "Deployed Proxmox VE hypervisor cluster on decommissioned hardware. Running Jellyfin media server with an *arr suite for content management, PiHole for DNS-based ad blocking, Tailscale for VPN mesh networking, and experimenting with Immich for photo storage and Mealie for recipe management. Also using it to experiment with different Unix-like operating systems including Kali Linux for security tools. The setup has been invaluable for understanding networking, especially VLANs, reverse proxies, and VPN configurations that directly apply to my work with networked hardware.",
        architecture: "The infrastructure is built on Proxmox VE, which provides virtualization and containerization capabilities. Services are organized into VLANs for network segmentation, with a reverse proxy (Nginx) handling SSL termination and routing. PiHole acts as the network's DNS server, blocking ads at the DNS level. Tailscale creates a mesh VPN network for secure remote access without exposing ports. Each service runs in either a VM or LXC container, with resource limits to prevent any single service from consuming all available resources.",
        implementation: "Proxmox is installed on bare metal with ZFS for storage redundancy. Services are deployed using Docker containers where possible, managed through Portainer for easier administration. The reverse proxy uses Let's Encrypt for SSL certificates with automatic renewal. Network configuration uses VLANs to separate services (media, infrastructure, development) for security. Backup strategy includes automated snapshots of critical VMs and containers. Monitoring is handled through a combination of Proxmox's built-in monitoring and custom scripts that alert on resource usage or service failures.",
        tech: ["Proxmox", "Linux", "Docker", "Networking", "Self-Hosting"],
        highlights: [
            "Replaced paid cloud services with self-hosted alternatives",
            "Deployed Proxmox VE hypervisor cluster on decommissioned hardware",
            "Implemented network-wide ad blocking and VPN mesh networking",
            "Gained practical networking experience with VLANs and reverse proxies"
        ],
        challenges: [
            "Learning networking fundamentals like VLANs and reverse proxies",
            "Managing resource allocation across multiple services with limited hardware",
            "Setting up secure remote access without exposing services to the internet"
        ],
        metrics: [
            { label: "Cost savings", type: "cost", icon: "fa-dollar-sign" }
        ]
    },
    astronomyTools: {
        title: "Telescope Control Scripts & Stellarium Integration",
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
    budgetingApp: {
        title: "Personal Budgeting Application",
        image: "images/projects/Budgeting.jpg",
        summary: "I didn't want to pay for a budgeting app and the free ones were missing features I needed. Built my own with custom category management, bank statement imports with custom parsing, and a dashboard to track spending. All my financial data stays local for privacy, and I got to build exactly the features I wanted.",
        layman: "I made my own budgeting app because the free ones didn't have what I needed and I didn't want to pay. Now I can track my spending exactly how I want, and all my financial data stays on my computer.",
        technical: "Built a Python application with a web-based dashboard for budget tracking. Implements custom CSV parsing for bank statement imports, flexible category management system, and data visualization for spending patterns. Uses SQLite for local data storage to keep all financial information private. The dashboard provides insights into spending habits and helps identify areas for cost reduction.",
        architecture: "The application follows a three-tier architecture: data layer (SQLite database), business logic layer (Python backend), and presentation layer (web dashboard). The database schema includes tables for transactions, categories, budgets, and import configurations. The backend handles data processing, categorization logic, and budget calculations. The frontend provides interactive visualizations and forms for data entry and management.",
        implementation: "Built with Flask for the web framework and SQLite for data persistence. CSV parsing uses pandas for data manipulation, with custom parsers for different bank formats that handle date parsing, amount extraction, and transaction type detection. Category management uses a hierarchical system with parent and child categories. Data visualization uses Chart.js for interactive charts showing spending trends, category breakdowns, and budget comparisons. All data processing happens server-side to keep financial information secure.",
        tech: ["Python", "SQLite", "Data Visualization", "CSV Parsing", "Web Dashboard"],
        highlights: [
            "Built custom budgeting solution with features not available in free apps",
            "Implemented flexible category management and custom CSV parsing",
            "Created data visualization dashboard for spending insights",
            "Kept all financial data local for privacy"
        ],
        challenges: [
            "Parsing different bank statement formats consistently",
            "Creating a flexible category system that adapts to different spending patterns",
            "Building an intuitive dashboard that provides useful insights"
        ],
        metrics: []
    },
    homeMaintenance: {
        title: "Home Maintenance Dashboard",
        image: "images/projects/HomeMaint.jpg",
        summary: "I needed reminders for maintenance tasks I always forget about. Built a dashboard that sends alerts for tasks at custom intervals like daily, weekly, monthly, yearly, or even every decade. It reminds me to do things like water heater maintenance, cleaning out the washer, winterizing pipes, and other tasks I'd otherwise forget. Simple but effective. Hoping to make it smarter someday with custom tips and weather/location integration.",
        layman: "I made a reminder system for all the home maintenance stuff I forget about. It tells me when to change filters, clean things, and do other maintenance tasks so my house doesn't fall apart.",
        technical: "Developed a web-based dashboard for tracking home maintenance tasks with configurable reminder intervals. The system stores task definitions, last completion dates, and calculates next due dates based on custom intervals. Features include task categorization, priority levels, and notification system. Built with plans to integrate weather and location data for smarter reminders, like preparing for winter storms or seasonal maintenance.",
        architecture: "The system uses a simple client-server architecture with a web-based frontend and a backend that manages task data and scheduling. Tasks are stored with metadata including interval type, last completion date, and priority. The scheduling engine calculates next due dates by adding the interval to the last completion date. The notification system checks for overdue tasks and sends alerts through the dashboard interface.",
        implementation: "Built with a lightweight web framework for the frontend and a simple backend for data persistence. The interval system supports multiple types: fixed intervals (daily, weekly, monthly), calendar-based (yearly on specific dates), and custom intervals (e.g., every 90 days). Task completion updates the last completion date and recalculates the next due date. The dashboard displays tasks sorted by due date with visual indicators for overdue items. Future enhancements will integrate weather APIs for seasonal reminders.",
        tech: ["Web Dashboard", "Task Management", "Reminder System", "Data Tracking"],
        highlights: [
            "Created flexible reminder system supporting intervals from daily to decadal",
            "Implemented task categorization and priority levels",
            "Automated calculation of next due dates based on custom intervals",
            "Designed for future weather and location-based smart reminders"
        ],
        challenges: [
            "Designing a flexible interval system that handles everything from daily to decadal tasks",
            "Creating an intuitive interface for managing many different maintenance tasks",
            "Planning for future integrations with weather and location services"
        ],
        metrics: []
    },
    hnefatafl: {
        title: "Hnefatafl Board Game Emulator",
        image: "images/projects/HnefataflBoard.jpg",
        summary: "I wanted to play a video game version of Hnefatafl with my wife without buying the board game. Couldn't find a good two-player version online, so I made my own. It was a simple and fun project that let us play together.",
        layman: "I made a computer version of an old Viking board game so my wife and I could play together. It's like chess but different - one player tries to help the king escape while the other tries to catch him.",
        technical: "Developed using Python with Pygame for graphics rendering and event handling. Implemented object-oriented design with separate classes for game board, pieces, and game logic. Features include traditional Hnefatafl rules implementation, move validation algorithms, turn-based gameplay mechanics, and interactive visual feedback. The system uses event-driven programming for user input and includes game state persistence for save/load functionality.",
        architecture: "The game uses a Model-View-Controller (MVC) architecture. The model contains the game state (board, pieces, turn), the view handles rendering with Pygame, and the controller processes user input and updates the model. Game logic is separated into classes for the board, pieces, and rule engine. The board maintains piece positions, the rule engine validates moves according to Hnefatafl rules, and the view renders the current state.",
        implementation: "Built with Pygame for graphics and event handling. The board is represented as a 2D array with piece objects at each position. Move validation checks for piece movement rules, capture conditions, and win conditions. The game loop handles input events, updates the game state, and redraws the screen. Save/load functionality serializes the game state to JSON files. The UI includes visual feedback for valid moves, selected pieces, and game over conditions.",
        tech: ["Python", "Pygame", "Game Development", "Object-Oriented Programming", "Local Multiplayer"],
        highlights: [
            "Built complete digital implementation of ancient Viking board game",
            "Implemented traditional Hnefatafl rules with move validation",
            "Created user interface for game with no existing digital precedent",
            "Added game state persistence for save/load functionality"
        ],
        challenges: [
            "Translating ancient game rules into modern programming logic",
            "Creating user interface for a game with no existing digital precedent",
            "Handling asymmetric gameplay mechanics in a symmetric codebase"
        ],
        metrics: []
    },
    mlTrading: {
        title: "Machine Learning Trading Dashboard",
        image: "images/projects/MLTrader.jpg",
        summary: "This started as a school project to use live stock data, make statistical inferences, and make decisions based on several ML models including Q-learning, KNN, random forests, and ensemble learners. Built a dashboard to abstract the lessons learned and apply them to a website where users could log in, set up their own model preferences, and backtest them. This was a proof of concept that wasn't made public, but it was a great hands-on way to understand different ML models and their effectiveness at maximizing profits.",
        layman: "I built a system that uses machine learning to try to predict stock prices and make trading decisions. It was a school project that helped me learn how different AI models work and which ones are better at making money.",
        technical: "Developed a web-based trading dashboard that integrates multiple machine learning models for stock prediction and trading signal generation. Implemented Q-learning for reinforcement learning-based trading strategies, KNN for pattern recognition, random forests for ensemble predictions, and various other models. The system includes backtesting functionality, user preference configuration, and performance metrics. Built as a proof of concept to understand model effectiveness and trading strategy optimization.",
        architecture: "The system follows a modular architecture with separate components for data ingestion, feature engineering, model training, prediction, and backtesting. Data flows from stock APIs through preprocessing pipelines to feature extractors, then to model trainers. Predictions are generated by ensemble methods that combine outputs from multiple models. The backtesting engine simulates trading strategies using historical data, calculating performance metrics like Sharpe ratio, maximum drawdown, and total return.",
        implementation: "Built with Python using scikit-learn for ML models, pandas for data manipulation, and a web framework for the dashboard. Q-learning uses a state-action-reward framework where states represent market conditions and actions are buy/sell/hold decisions. KNN identifies similar historical patterns to predict future movements. Random forests combine multiple decision trees for robust predictions. Backtesting uses walk-forward analysis to avoid look-ahead bias. The dashboard allows users to configure model parameters, select stocks, and view performance visualizations.",
        tech: ["Python", "Machine Learning", "scikit-learn", "Trading", "Data Analysis"],
        highlights: [
            "Integrated multiple ML models (Q-learning, KNN, random forests) into unified system",
            "Built backtesting functionality for strategy validation",
            "Created user-configurable model preferences and performance metrics",
            "Gained hands-on experience with ML model effectiveness in trading"
        ],
        challenges: [
            "Integrating multiple ML models into a unified trading system",
            "Creating accurate backtesting functionality",
            "Understanding which models work best for different market conditions"
        ],
        metrics: []
    },
    slamSimulation: {
        title: "SLAM Algorithm Simulation",
        image: "images/projects/SLAM.jpg",
        summary: "This was a proof of concept to understand how the SLAM (Simultaneous Localization and Mapping) algorithm works. It was a great exercise to learn about non-deterministic motion and to tune the proper hyperparameters to help robots learn how to map themselves and their environment. This project helped me understand the fundamentals of robotics navigation and mapping.",
        layman: "I built a simulation to understand how robots can map their environment while moving around. It was a learning project to understand the algorithms that help robots know where they are and what's around them.",
        technical: "Implemented a SLAM algorithm simulation to understand simultaneous localization and mapping concepts. The system models non-deterministic robot motion, sensor noise, and environment mapping. Features include hyperparameter tuning for optimal performance, visualization of robot path and map generation, and comparison of different SLAM approaches. This was an educational project focused on understanding the fundamentals of robotics navigation and probabilistic mapping.",
        architecture: "The simulation implements a particle filter-based SLAM algorithm. The system maintains a probabilistic representation of the robot's pose and the environment map. Each particle represents a hypothesis about the robot's position and the map. The algorithm iteratively updates particles based on motion models (predict step) and sensor observations (update step). The map is represented as a grid of occupancy probabilities, and the robot's pose is tracked through odometry and sensor fusion.",
        implementation: "Built with Python using NumPy for numerical computations and Matplotlib for visualization. The particle filter uses importance sampling to maintain a diverse set of hypotheses. Motion models incorporate noise to represent non-deterministic robot movement. Sensor models simulate LIDAR-like range sensors with Gaussian noise. The update step uses likelihood functions to weight particles based on how well their map hypotheses match sensor observations. Visualization shows the robot's estimated path, true path, and evolving map estimate over time.",
        tech: ["Python", "SLAM", "Robotics", "Simulation", "Machine Learning"],
        highlights: [
            "Implemented SLAM algorithm simulation with non-deterministic motion modeling",
            "Developed hyperparameter tuning system for optimal mapping performance",
            "Created visualization of robot path and map generation",
            "Gained understanding of robotics navigation and probabilistic mapping"
        ],
        challenges: [
            "Understanding non-deterministic motion models",
            "Tuning hyperparameters for optimal mapping performance",
            "Visualizing complex probabilistic data in an understandable way"
        ],
        metrics: []
    },
    fpgaLaserControl: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
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
        title: "Circuit Synthesis from Frequency Response Data",
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