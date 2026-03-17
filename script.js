const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.project-card');

const skillsEvidenceData = {
    python: {
        description: "Automation tooling, backend services, data pipelines, and scientific computing.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "astronomyTools", tab: "personal", label: "Telescope Control Bridge" }
        ],
        related: ["bash", "sqlalchemy", "pandas", "numpy", "api_dev"]
    },
    cpp: {
        description: "Performance-sensitive systems and hardware interface layers.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" }
        ],
        related: ["c_lang", "real_time", "hardware_integration", "vxworks", "fault_isolation"]
    },
    c_lang: {
        description: "Low-level systems programming with explicit memory management and deterministic behavior.",
        projects: [
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" },
            { id: "circuitSynthesis", tab: "practicum", label: "Frequency-Response Circuit Synthesis" }
        ],
        related: ["cpp", "real_time", "vxworks", "hardware_integration"]
    },
    typescript: {
        description: "Typed frontend development for maintainable web interfaces.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["javascript", "api_dev", "service_arch"]
    },
    javascript: {
        description: "Lightweight UI logic and browser-side integrations.",
        projects: [
            { id: "astronomyTools", tab: "personal", label: "Telescope Control Bridge" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["typescript", "api_dev"]
    },
    bash: {
        description: "Linux automation, environment provisioning, and scripting repetitive tasks.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" },
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["linux_dev", "ansible", "cicd", "python"]
    },
    powershell: {
        description: "Windows automation and administrative tooling.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" }
        ],
        related: ["bash", "cicd", "git_workflows"]
    },
    linux_dev: {
        description: "Application development, debugging, and performance investigation on Linux environments.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" },
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["bash", "docker", "proxmox", "ansible"]
    },
    vxworks: {
        description: "Development and debugging on real-time embedded operating systems.",
        projects: [
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" }
        ],
        related: ["real_time", "c_lang", "cpp", "hardware_integration", "fault_isolation"]
    },
    real_time: {
        description: "Designing software where latency, scheduling, and timing guarantees matter.",
        projects: [
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" },
            { id: "astronomyTools", tab: "personal", label: "Telescope Control Bridge" }
        ],
        related: ["vxworks", "cpp", "c_lang", "hardware_integration", "hil_testing"]
    },
    hardware_integration: {
        description: "Building reliable interfaces between software and physical devices.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "astronomyTools", tab: "personal", label: "Telescope Control Bridge" }
        ],
        related: ["hil_testing", "real_time", "cpp", "fault_isolation"]
    },
    api_dev: {
        description: "Designing REST APIs and service interfaces for internal tools and applications.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["service_arch", "event_driven", "python", "authz", "sqlalchemy"]
    },
    event_driven: {
        description: "Using message/event patterns to decouple services and handle asynchronous workflows.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["service_arch", "api_dev", "cicd"]
    },
    service_arch: {
        description: "Designing backend components that can evolve without breaking dependent systems.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" }
        ],
        related: ["api_dev", "event_driven", "docker", "cicd"]
    },
    test_arch: {
        description: "Designing frameworks that replace manual test procedures with repeatable automated validation.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["integration_testing", "hil_testing", "fault_isolation", "python", "cicd"]
    },
    integration_testing: {
        description: "Testing interactions between services, hardware, and system components.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" }
        ],
        related: ["test_arch", "hil_testing", "fault_isolation", "api_dev"]
    },
    hil_testing: {
        description: "Validating software against real hardware in automated test environments.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "astronomyTools", tab: "personal", label: "Telescope Control Bridge" }
        ],
        related: ["test_arch", "hardware_integration", "real_time", "fault_isolation"]
    },
    fault_isolation: {
        description: "Tracing failures across system boundaries from hardware through application layers.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" }
        ],
        related: ["hil_testing", "integration_testing", "test_arch", "cpp", "linux_dev"]
    },
    cicd: {
        description: "Automating build, test, and deployment workflows.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["docker", "ansible", "git_workflows", "azure", "bash"]
    },
    docker: {
        description: "Packaging applications into reproducible runtime environments.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" },
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["cicd", "ansible", "linux_dev", "proxmox", "service_arch"]
    },
    ansible: {
        description: "Infrastructure provisioning and configuration management.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["docker", "proxmox", "linux_dev", "bash", "cicd"]
    },
    git_workflows: {
        description: "Version control, branching strategies, and collaborative development.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["cicd", "service_arch", "bash"]
    },
    azure: {
        description: "Compute, storage, and infrastructure services for deployed applications.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" }
        ],
        related: ["cicd", "docker", "service_arch", "authz"]
    },
    proxmox: {
        description: "Operating a homelab virtualization environment for experimentation and infrastructure testing.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["docker", "ansible", "linux_dev", "netsec"]
    },
    pytorch: {
        description: "Training and experimenting with neural network models.",
        projects: [
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" }
        ],
        related: ["numpy", "sklearn", "model_eval", "python", "pandas"]
    },
    sklearn: {
        description: "Classical ML models and experimentation.",
        projects: [
            { id: "circuitSynthesis", tab: "practicum", label: "Frequency-Response Circuit Synthesis" }
        ],
        related: ["pytorch", "numpy", "pandas", "model_eval", "python"]
    },
    numpy: {
        description: "Numerical computing and array operations.",
        projects: [
            { id: "circuitSynthesis", tab: "practicum", label: "Frequency-Response Circuit Synthesis" },
            { id: "fpgaLaserControl", tab: "practicum", label: "FPGA Laser Interferometer Control System" }
        ],
        related: ["pandas", "sklearn", "pytorch", "python"]
    },
    pandas: {
        description: "Data cleaning, transformation, and exploratory analysis.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["numpy", "sklearn", "python", "postgres", "sqlalchemy"]
    },
    model_eval: {
        description: "Evaluating models using validation sets and error analysis.",
        projects: [
            { id: "circuitSynthesis", tab: "practicum", label: "Frequency-Response Circuit Synthesis" }
        ],
        related: ["sklearn", "pytorch", "numpy", "pandas"]
    },
    postgres: {
        description: "Schema design, indexing, and query optimization.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["sqlite", "sqlalchemy", "api_dev", "python"]
    },
    sqlite: {
        description: "Embedded databases for lightweight applications.",
        projects: [
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["postgres", "sqlalchemy", "python"]
    },
    sqlalchemy: {
        description: "ORM-based data models for Python applications.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "beaker", tab: "professional", label: "Test Automation Platform" }
        ],
        related: ["postgres", "sqlite", "python", "api_dev"]
    },
    rbac: {
        description: "Designing permission systems based on user roles.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["authz", "encryption", "netsec", "api_dev"]
    },
    authz: {
        description: "Implementing login flows and access control logic.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["rbac", "encryption", "netsec", "api_dev"]
    },
    encryption: {
        description: "Secure handling of sensitive data and secrets.",
        projects: [
            { id: "atlassianApi", tab: "professional", label: "Atlassian API Toolkit" },
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["rbac", "authz", "netsec"]
    },
    netsec: {
        description: "Secure protocols, firewall configuration, and VPN access.",
        projects: [
            { id: "homelab", tab: "personal", label: "Homelab Infrastructure" }
        ],
        related: ["rbac", "authz", "encryption", "proxmox", "linux_dev"]
    }
};

const skillsResumeEvidence = {
    cpp: ["Senior Software Engineer - Northrop Grumman"],
    c_lang: ["Electronics Engineer - United States Air Force"],
    powershell: ["Senior Software Engineer - Northrop Grumman"],
    linux_dev: ["Senior Software Engineer - Northrop Grumman"],
    vxworks: ["Electronics Engineer - United States Air Force"],
    real_time: [
        "Senior Software Engineer - Northrop Grumman",
        "Electronics Engineer - United States Air Force"
    ],
    hardware_integration: ["Senior Software Engineer - Northrop Grumman"],
    api_dev: ["Senior Software Engineer - Northrop Grumman"],
    event_driven: ["Senior Software Engineer - Northrop Grumman"],
    service_arch: ["Senior Software Engineer - Northrop Grumman"],
    test_arch: ["Senior Software Engineer - Northrop Grumman"],
    integration_testing: ["Senior Software Engineer - Northrop Grumman"],
    hil_testing: ["Senior Software Engineer - Northrop Grumman"],
    fault_isolation: [
        "Senior Software Engineer - Northrop Grumman",
        "Electronics Engineer - United States Air Force",
        "Customer Systems Engineering Intern - Micron Technology"
    ],
    cicd: ["Senior Software Engineer - Northrop Grumman"],
    docker: ["Senior Software Engineer - Northrop Grumman"],
    ansible: ["Senior Software Engineer - Northrop Grumman"],
    git_workflows: ["Senior Software Engineer - Northrop Grumman"],
    azure: ["Senior Software Engineer - Northrop Grumman"],
    postgres: ["Senior Software Engineer - Northrop Grumman"],
    sqlite: ["Senior Software Engineer - Northrop Grumman"],
    sqlalchemy: ["Senior Software Engineer - Northrop Grumman"],
    rbac: ["Senior Software Engineer - Northrop Grumman"],
    authz: ["Senior Software Engineer - Northrop Grumman"],
    encryption: ["Senior Software Engineer - Northrop Grumman"],
    netsec: ["Senior Software Engineer - Northrop Grumman"]
};

function initializeMobileNavigation() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

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

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
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
        return;
    }
    
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
        
        if (href === `#${currentSection}`) {
            link.classList.add('active');
            console.log('Set active link:', href);
        }
        else if (href === 'astro.html' && currentSection === 'astronomy') {
            link.classList.add('active');
            console.log('Set astronomy link as active (in astronomy section)');
        }
    });
}

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
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                switchToTab(targetTab, tabButtons, tabPanels);
            }
        });
    });
}

function switchToTab(targetTab, tabButtons, tabPanels) {
    tabButtons.forEach(button => {
        const isActive = button.getAttribute('data-tab') === targetTab;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive);
    });
    
    tabPanels.forEach(panel => {
        const isActive = panel.id === `${targetTab}-panel`;
        panel.classList.toggle('active', isActive);
    });
}

const projectData = {
    beaker: {
        title: "Remote Hardware Execution Platform",
        image: "images/projects/TestAuto.png",
        summary: "A Python server that authenticates via a privileged service account, whitelists authorized clients, then reaches out to any networked hardware to spawn a shell process, run commands, and return interpreted results. The connection methods and command sets are both plugin-based. PXI, GPIB, serial, SCPI, USB, Ethernet — if the hardware is on the network and you write a connection plugin for it, the platform handles the rest. It replaced a fully manual process where testers remoted into 200+ lab machines by hand.",
        layman: "Before this existed, testing meant a person remoting into machines one at a time, typing commands, and writing down what came back. This server does all of that automatically. It reaches out to the hardware, runs the same commands a tester would have typed, and hands back a pass or fail. The hardware could be a power supply, a data acquisition system, a workstation — the framework handles it the same way either way.",
        technical: "Built entirely in Python. The server authenticates with a service account and maintains a whitelist of authorized clients before accepting any requests. Connection plugins handle everything transport-specific: how to authenticate, how to spawn a remote process on that hardware, how to capture stdout and stderr, and how to close cleanly. Command plugins define what to run and how to interpret the response. Both plugin types load dynamically so adding support for new hardware or new test routines means writing one file and dropping it in.",
        architecture: "Clients send requests specifying a target machine and a command set. The server resolves the appropriate connection plugin for that target, establishes a privileged remote shell using the service account, runs the requested command plugin, captures and interprets the output, then returns structured results to the client. Connection plugins and command plugins are independent of each other and of the core server. The server manages concurrent requests across 200+ networked lab machines.",
        implementation: "Each connection plugin owns the full lifecycle for its transport — authentication, process spawning, output capture, error handling, and teardown. Getting reliable output capture was the hardest part since every hardware type exposes a process differently. Command plugins define the commands to run and the parsing logic for the response. The service account privilege model combined with client whitelisting keeps a broad attack surface well-scoped. Adoption has spread beyond the original lab to other teams in the organization.",
        tech: ["Python", "Plugin Architecture", "Hardware Integration", "Remote Execution", "Authentication"],
        highlights: [
            "Plugin architecture supports any networked hardware: PXI, GPIB, serial, SCPI, USB, Ethernet",
            "Service account authentication with per-client whitelisting",
            "~80% cost reduction replacing fully manual hardware testing workflows",
            "Adoption expanding to multiple labs across the organization"
        ],
        challenges: [
            "Every hardware type spawns a process differently. The hard part wasn't running commands — it was reliably capturing output across serial devices, PXI chassis, GPIB instruments, and Ethernet hosts that each behave differently under the hood.",
            "Building an output parser robust enough to handle timeouts, partial reads, and unexpected responses across dozens of hardware types took significant iteration. Hardware doesn't always respond the way its documentation says it will.",
            "A service account with access to 200+ machines is a real attack surface. The privilege model and client whitelisting had to be airtight from the start, not bolted on later."
        ],
        metrics: [
            { label: "~80% cost reduction", type: "time", icon: "fa-clock" },
            { label: "200+ machines", type: "scale", icon: "fa-server" }
        ]
    },
    systemIntegrationMap: {
        title: "System Integration Lab Interactive Map",
        image: "images/projects/interactive-map.png",
        summary: "A Flask web application that gives engineers a live, visual snapshot of the System Integration Lab's configuration at any given time. The UI renders isometric drawings of the lab equipment styled by an automated auditing function — so what you see reflects what's actually installed. From the same interface users build machine configuration manifests, map those manifests to hardware in Hardware-in-the-Loop configs, push software deployments to the lab, and generate traceability reports for test events.",
        layman: "A test is only trustworthy if you know exactly what software is running on every machine involved. Before this tool, auditing that across a large shared lab was slow and error-prone. Now you open the app, see the lab's current configuration rendered as an isometric view, configure what you need for the upcoming test event, push it to the hardware, and print a report. The whole configuration lifecycle lives in one place.",
        technical: "Built on Flask with a PostgreSQL backend. Multiple background daemons run continuously to sync live data from asset management software, feeding the app with equipment metadata: serial numbers, IPs, hostnames, procurement IDs, open tickets, and more. Configuration pushes route through the Remote Hardware Execution Platform. A custom RBAC implementation gates all control-plane endpoints so read access and write access are scoped separately. The app supports multi-user concurrent sessions throughout.",
        architecture: "Flask serves the frontend and exposes endpoints for configuration management and deployment orchestration. Background daemons pull from asset management APIs and write into PostgreSQL. The isometric lab view is driven directly by the database — each machine's visual state reflects its current audited configuration. Deployment requests route through the hardware automation server and track status back in the DB. The RBAC layer sits in front of all control endpoints and checks every request before it reaches business logic.",
        implementation: "Isometric assets are styled representations that map one-to-one with equipment records in the database. An audit daemon polls hardware configuration state on a schedule and updates those records, which drives both the visual display and the data behind traceability reports. Machine config manifests and HIL configs are versioned and stored in PostgreSQL. The deployment pipeline sends push requests to the hardware execution platform and monitors completion. Getting concurrent writes from audit daemons and active deployments to coexist without race conditions or stale reads required careful transaction design.",
        tech: ["Python", "Flask", "PostgreSQL", "RBAC", "Hardware Integration", "Isometric UI"],
        highlights: [
            "Live isometric lab visualization driven by automated hardware audit data",
            "Full configuration lifecycle: machine manifests, HIL configs, software deployment",
            "Custom RBAC authentication gates all control-plane access",
            "Automated traceability reports for test event configuration control",
            "Integrates with Remote Hardware Execution Platform for config pushes"
        ],
        challenges: [
            "The scope of the system — live data feeds, multi-user access, deployment orchestration, asset metadata, and a custom RBAC — all had to fit together before any of it could be performance-tuned. Getting the architecture right early saved a lot of rework later.",
            "Maintaining isometric assets for hundreds of pieces of equipment and keeping them synchronized with live database state was more demanding than it looked. Any asset that fell out of sync with the DB made the view unreliable.",
            "Concurrent writes from audit daemons polling hardware and active deployments pushing configuration changes required careful transaction design. A stale read during a test event configuration push could mean a misconfigured lab."
        ],
        metrics: [
            { label: "200+ machines config-controlled", type: "scale", icon: "fa-server" }
        ]
    },
    atlassianApi: {
        title: "Atlassian API Toolkit",
        image: "images/projects/AtlassianAPI.jpg",
        summary: "Every internal tool that needed Jira or Confluence access was solving the same problems from scratch. Auth setup, pagination, retries, error handling. I wrote a shared Python client library so teams could skip all of that and get straight to building what they actually needed.",
        layman: "Jira and Confluence have messy APIs. Every developer who tried to use them had to figure out the same authentication dance and error handling on their own. This toolkit handles all of that once so the next tool gets built in a fraction of the time.",
        technical: "The library wraps Atlassian REST APIs in Python clients with shared session management, automatic pagination, retry logic, and consistent error handling. Jira and Confluence each get their own client that extends a common base. Auth strategies are injected rather than hardcoded, which made it straightforward to support different deployment environments without forking the design. Three internal tools ship on top of it: a story exporter, an equipment manager, and an inventory dashboard.",
        architecture: "A shared HTTP base layer handles session pooling, retries, and auth injection. Jira and Confluence clients sit on top of that and expose methods specific to their data models. The goal was to make everyday operations one function call rather than fifteen lines of boilerplate. Adding a new tool meant importing the client and starting from working auth, not reinventing it.",
        implementation: "Persistent sessions reduce connection overhead across paginated requests. Retry logic backs off on rate limit responses and surfaces failures through typed exceptions rather than raw HTTP codes. Pagination is automatic so callers don't have to think about result set size. The clients ship with type hints throughout, which made them easier to use correctly without reading the source.",
        tech: ["Python", "REST APIs", "OAuth2", "Jira", "Confluence"],
        highlights: [
            "Reusable client library powering 3 internal tools",
            "Auth, retries, pagination, and error handling handled once at the base layer",
            "Supports multiple authentication strategies across different Atlassian deployments",
            "Cut per-tool integration time significantly for each downstream consumer"
        ],
        challenges: [
            "Atlassian's rate limiting behavior isn't consistent across endpoints. The retry logic had to handle several different failure modes without making the client feel brittle.",
            "Supporting different auth strategies across deployments without forcing callers to know which one they were using took a few design iterations.",
            "Keeping the interface simple while still covering enough of the API to be genuinely useful was a constant tradeoff."
        ],
        metrics: [
            { label: "3+ tools built", type: "adoption", icon: "fa-tools" }
        ]
    },
    homelab: {
        title: "Homelab Infrastructure",
        image: "images/projects/homelab-proxmox.png",
        summary: "I run a self-hosted stack on repurposed hardware at home. Jellyfin for media, Immich for photos, AdGuard for DNS filtering, WireGuard for remote access. It replaced a handful of paid subscriptions and turned into a useful sandbox for practicing infrastructure work outside of a job context.",
        layman: "Instead of paying for cloud storage, media streaming, and VPN services separately, I run my own versions on a home server. The monthly cost is effectively zero and I own the whole thing. Keeping it documented means I can still understand what I built six months later.",
        technical: "Proxmox handles virtualization on decommissioned enterprise hardware. Services run as LXC containers or full VMs depending on isolation requirements. ZFS backs the storage layer with redundancy and snapshot support. A reverse proxy sits in front of externally accessible services and SSL certificates renew automatically. Ansible provisions new VMs so standing up a service is repeatable rather than manual every time.",
        architecture: "Proxmox is the base layer. VMs handle workloads that need real isolation. Containers cover everything else. Network segmentation separates internal-only services from anything exposed externally. The reverse proxy terminates TLS and routes traffic by hostname. Every architectural decision lives in an Obsidian vault alongside runbooks and operational notes so the setup stays understandable over time.",
        implementation: "Automated snapshots run on a schedule. Ansible playbooks handle provisioning so rebuilding a service doesn't mean recreating it from memory. Monitoring scripts watch resource usage and alert on problems before they become outages. The whole thing runs on hardware that cost nothing because it came from a decommission pile.",
        tech: ["Proxmox", "Linux", "Docker", "Networking", "Self-Hosting", "Obsidian", "ZFS"],
        highlights: [
            "Full self-hosted stack replacing paid cloud services at near-zero recurring cost",
            "Ansible-driven provisioning makes service deployment repeatable",
            "ZFS storage with automated snapshots and WireGuard remote access",
            "Full architecture documented in Obsidian for long-term maintainability"
        ],
        challenges: [
            "Networking fundamentals took real investment. Designing segmentation and a working remote access setup required understanding subnets, routing, and firewall rules well enough to debug them when they broke.",
            "Repurposed hardware has quirks. Squeezing several always-on services out of limited RAM and CPU meant making deliberate choices about what runs where.",
            "Documentation discipline is harder than it sounds. The goal was making sure future-me could understand any part of the system without reverse engineering it."
        ],
        metrics: [
            { label: "Cost savings", type: "cost", icon: "fa-dollar-sign" }
        ]
    },
    astronomyTools: {
        title: "Telescope Control Bridge",
        image: "images/projects/orion.jpg",
        summary: "Stellarium has no native support for the Orion XX14G. The hand controller it comes with works but it's clunky, especially when you want to quickly hop between objects. I wrote a Python bridge that sits between Stellarium and the telescope over TCP and RS-232 so I can just click something on screen and watch it move.",
        layman: "Click a star in Stellarium, telescope points there. Before this I had to punch in coordinates manually on a small hand controller in the dark. Same hardware, completely different experience.",
        technical: "The bridge opens a TCP socket for Stellarium and a serial connection to the telescope. When Stellarium issues a goto command the bridge converts the coordinates from the software's format into the encoded byte sequences the XX14G expects, then writes them over RS-232. Position feedback travels the other direction. The bridge keeps enough state to recover when a message drops or timing gets off, which happens more than you'd expect outdoors.",
        architecture: "Stellarium sends commands over TCP as though it's talking to a supported mount. The bridge intercepts those, converts the coordinate system, and translates them into the XX14G's serial protocol. Responses from the telescope go back through the same path in reverse. State tracking handles cases where the two sides get out of sync, which is important when you're mid-session and don't want to restart the software to recover.",
        implementation: "Python handles both sides: socket listener on the Stellarium end, pyserial on the hardware end. Coordinate conversion runs on every command since the two systems use different reference frames. Timeouts and retry logic are tuned for serial communication, which doesn't always behave cleanly. The whole thing runs on a small single-board computer connected to the mount so it's portable.",
        tech: ["Python", "TCP Networking", "RS-232 Serial", "Protocol Translation", "Telescope Control"],
        highlights: [
            "Full goto control via Stellarium's sky map with no hand controller needed",
            "Real-time coordinate conversion between Stellarium's format and the XX14G serial protocol",
            "Runs on a small single-board computer for portable use",
            "Handles dropped messages and serial timeouts without losing mount position"
        ],
        challenges: [
            "The XX14G serial protocol is not documented publicly. Figuring out the exact command format required capturing and analyzing real traffic from the hand controller.",
            "Coordinate conversion has to be accurate enough that the telescope actually points at the right thing. Small errors compound when you're pointed at dim objects.",
            "Serial communication outdoors at night means temperature changes, cable flex, and noise. The error recovery had to be robust enough to survive real conditions."
        ],
        metrics: []
    },
    fpgaLaserControl: {
        title: "FPGA Laser Interferometer Control System",
        image: "images/projects/laser_interferometer.jpg",
        summary: "Laser interferometry requires a stable wavelength. Ours drifted. We built a Pound-Drever-Hall feedback loop on a Xilinx Zynq 7010 to actively correct that drift in real time. We didn't hit the final stability spec within the student project timeline but we proved the control architecture worked on commercial hardware at a fraction of what purpose-built lab instruments would have cost.",
        layman: "A laser that drifts gives you bad measurements. This project built a fast feedback loop that watches the laser and keeps nudging it back on target whenever it wanders. We showed the approach was viable on affordable hardware even if the final precision numbers needed more time to dial in.",
        technical: "The Zynq 7010 runs VHDL modules for the real-time signal path: ADC sampling, error signal detection, PID feedback, and actuator output. Fixed-point arithmetic keeps the loop deterministic at microsecond timescales. Python runs on the host side for parameter tuning, data logging, and visualization. The two sides stay loosely coupled so the control loop doesn't depend on the host being responsive.",
        architecture: "The FPGA owns everything time-critical. Signal detection, filtering, PID computation, and output generation all live in hardware so the loop latency stays consistent regardless of what the host is doing. The host-side Python tools connect over a simple interface to read telemetry and push configuration changes. That split made it easy to iterate on tuning parameters without touching the VHDL.",
        implementation: "VHDL modules implement the PDH error signal chain from input to PID output. The PID coefficients are register-mapped so the Python tools can adjust them live during a run. ADC data streams to the host for logging and display. We used fixed-point throughout to avoid floating-point latency in the feedback path. Debugging relied heavily on in-system logic analyzers since iteration speed on FPGA hardware is slow.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        highlights: [
            "Pound-Drever-Hall control loop implemented in VHDL on a Xilinx Zynq 7010",
            "Microsecond-scale feedback loop with fixed-point PID",
            "Host-side Python tooling for live tuning and data capture",
            "Demonstrated viable control architecture at commercial hardware cost"
        ],
        challenges: [
            "Physical noise in the lab environment made it hard to separate real drift from measurement artifacts. A lot of early tuning time went into figuring out what we were actually looking at.",
            "FPGA iteration cycles are slow. A logic change that takes seconds in software takes minutes on hardware. Debugging required thinking carefully before committing to a change.",
            "Hitting the final stability spec needed more time than the project window allowed. We got the loop working and stable but the last decade of precision remained out of reach."
        ],
        metrics: []
    },
    circuitSynthesis: {
        title: "Frequency-Response Circuit Synthesis",
        image: "images/projects/circuits.jpg",
        summary: "Given frequency-response measurements from an unknown circuit, this tool builds a working model of what's likely inside. Feed it S-parameter or impedance data and it comes back with RLC component values and a SPICE netlist you can drop straight into a simulator.",
        layman: "Some hardware is sealed or too complex to trace by hand. This tool takes measurements of how a circuit responds to different frequencies and works backwards to figure out what components are probably in there. The result is a model you can simulate and test without ever opening the box.",
        technical: "The tool uses vector fitting to approximate measured frequency-response data as a rational function, iterating on pole placement and residue computation until the fit converges. After fitting, it enforces passivity constraints to make sure the model stays physically realizable rather than just mathematically convenient. From that model it extracts R, L, and C values and writes them out as a SPICE netlist.",
        architecture: "The pipeline has three stages. First, raw frequency data gets preprocessed and normalized. Second, the vector fitting algorithm runs iteratively until it reaches a stable rational approximation. Third, passivity enforcement reshapes the model if needed before the synthesis step extracts component values and generates the netlist. Each stage is independent so you can inspect the intermediate result before moving forward.",
        implementation: "Python with NumPy and SciPy handles the numerical heavy lifting. Vector fitting alternates between a linear residue solve and a nonlinear pole update until convergence. The passivity check runs a semi-definite test on the fitted model and applies corrections if it fails. Component extraction maps the rational model onto RLC topology and writes the result in SPICE syntax.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        highlights: [
            "Vector fitting pipeline that converges a rational model from raw frequency-response data",
            "Passivity enforcement keeps the output physically realizable",
            "Automated RLC extraction and SPICE netlist generation",
            "Works on any device where you can measure frequency response"
        ],
        challenges: [
            "Real measurement data is noisy. The fitting algorithm had to converge on something useful even when the input wasn't clean.",
            "Passivity enforcement sounds simple until you realize correcting it can push the model away from the original data. Finding corrections that fix the physics without wrecking the fit took careful tuning.",
            "Mapping a rational function onto actual RLC values is not unique. The tool had to make reasonable topology assumptions and flag when the fit suggested something physically odd."
        ],
        metrics: []
    },
};

function initializeProjectModal() {
    if (!modal || !closeBtn) return;

    projectCards.forEach(card => {
        card.addEventListener('click', () => openProjectModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(card);
            }
        });
    });

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


function openProjectModal(card) {
    const projectId = card.getAttribute('data-project');
    const project = projectData[projectId];
    
    if (!project) {
        console.warn(`Project data not found for: ${projectId}`);
        return;
    }
    
    populateModalContent(project, projectId);
    
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    closeBtn.focus();
}

function populateModalContent(project, projectId) {
    document.getElementById('modalTitle').textContent = project.title;
    
    const projectImage = document.getElementById('modalProjectImage');
    if (projectImage && project.image) {
        projectImage.src = project.image;
        projectImage.alt = `${project.title} project image`;
    }
    
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
        if (metricsSection) {
            metricsSection.style.display = 'none';
        }
        if (metricsContainer) {
            metricsContainer.innerHTML = '';
        }
    }
    
    document.getElementById('modalSummary').textContent = project.summary;
    
    const highlightsList = document.getElementById('modalHighlights');
    if (highlightsList && project.highlights) {
        highlightsList.innerHTML = project.highlights.map(highlight => 
            `<li>${highlight}</li>`
        ).join('');
    }
    
    document.getElementById('modalLayman').textContent = project.layman;
    
    const architectureDiv = document.getElementById('modalArchitecture');
    if (architectureDiv && project.architecture) {
        architectureDiv.innerHTML = `<p>${project.architecture}</p>`;
    } else if (architectureDiv) {
        architectureDiv.innerHTML = '<p>Architecture details not available.</p>';
    }
    
    const implementationDiv = document.getElementById('modalImplementation');
    if (implementationDiv && project.implementation) {
        implementationDiv.innerHTML = `<p>${project.implementation}</p>`;
    } else if (implementationDiv) {
        implementationDiv.innerHTML = '<p>Implementation details not available.</p>';
    }
    
    const challengesList = document.getElementById('modalChallenges');
    challengesList.innerHTML = project.challenges.map(challenge => 
        `<li>${challenge}</li>`
    ).join('');
    
    const resultsDiv = document.getElementById('modalResults');
    if (resultsDiv) {
        const technicalP = document.getElementById('modalTechnical');
        if (technicalP) {
            technicalP.textContent = project.technical;
        }
    }
    
    updateModalLinks(projectId);
}


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
        beaker: null,
        systemIntegrationMap: null,
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


function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

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

    const animateElements = document.querySelectorAll('.about-content, .resume-content, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initializeSkillTooltips() {
    const chips = document.querySelectorAll('.skill-chip');
    const panel = document.getElementById('skillsEvidencePanel');
    const titleEl = document.getElementById('skillsEvidenceTitle');
    const descriptionEl = document.getElementById('skillsEvidenceDescription');
    const projectsEl = document.getElementById('skillsEvidenceProjects');

    if (!chips.length || !panel || !titleEl || !descriptionEl || !projectsEl) return;

    let activeChip = null;

    function renderSkill(skillKey, chip) {
        const skillData = skillsEvidenceData[skillKey];
        if (!skillData) return;

        activeChip = chip;
        chips.forEach(c => c.classList.toggle('active', c === chip));

        titleEl.textContent = chip.textContent.trim();
        descriptionEl.textContent = skillData.description;

        const projectItems = skillData.projects.map(project => `
            <li>
                <a href="#projects" class="skills-proof-project-link" data-project-id="${project.id}" data-project-tab="${project.tab}">
                    Project: ${project.label}
                </a>
            </li>
        `);

        const resumeItems = (skillsResumeEvidence[skillKey] || []).map(experience => `
            <li><a href="#resume" class="skills-proof-resume-ref">Work Experience: ${experience}</a></li>
        `);

        projectsEl.innerHTML = [...projectItems, ...resumeItems].join('');

        const relatedContainer = document.getElementById('skillsRelatedChips');
        if (relatedContainer) {
            const related = skillData.related || [];
            if (related.length) {
                relatedContainer.innerHTML = related.map(key => {
                    const relChip = document.querySelector(`.skill-chip[data-skill-key="${key}"]`);
                    const label = relChip ? relChip.textContent.trim() : key;
                    return `<button class="skill-chip skill-chip--related" data-skill-key="${key}">${label}</button>`;
                }).join('');
                relatedContainer.closest('.skills-related-section').style.display = 'block';
            } else {
                relatedContainer.closest('.skills-related-section').style.display = 'none';
            }
        }

        panel.style.display = 'block';
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            if (activeChip === chip && panel.style.display !== 'none') {
                panel.style.display = 'none';
                activeChip = null;
                chip.classList.remove('active');
            } else {
                renderSkill(chip.dataset.skillKey, chip);
            }
        });
    });

    panel.addEventListener('click', (event) => {
        const relChip = event.target.closest('.skill-chip--related');
        if (!relChip) return;
        const targetKey = relChip.dataset.skillKey;
        const targetChip = document.querySelector(`.skill-chip:not(.skill-chip--related)[data-skill-key="${targetKey}"]`);
        if (targetChip) {
            renderSkill(targetKey, targetChip);
            targetChip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    projectsEl.addEventListener('click', (event) => {
        const link = event.target.closest('.skills-proof-project-link');
        if (!link) return;

        event.preventDefault();

        const targetTab = link.getAttribute('data-project-tab');
        const projectId = link.getAttribute('data-project-id');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        if (targetTab && tabButtons.length && tabPanels.length) {
            switchToTab(targetTab, tabButtons, tabPanels);
        }

        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const projectCard = document.querySelector(`.project-card[data-project="${projectId}"]`);
        if (projectCard) {
            openProjectModal(projectCard);
        }
    });
}

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
    
    document.addEventListener('click', (e) => {
        if (!aiDisclaimerLink.contains(e.target) && !aiDisclaimerText.contains(e.target)) {
            closeAiDisclaimer();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && aiDisclaimerText.classList.contains('show')) {
            closeAiDisclaimer();
        }
    });
}

function closeAiDisclaimer() {
    const aiDisclaimerText = document.getElementById('aiDisclaimerText');
    if (aiDisclaimerText) {
        aiDisclaimerText.classList.remove('show');
        aiDisclaimerText.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

function initializeAiPerspective() {
    const toggle = document.getElementById('aiPerspectiveToggle');
    const popup = document.getElementById('aiPerspectivePopup');

    if (!toggle || !popup) return;

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = popup.classList.contains('show');
        popup.classList.toggle('show', !isOpen);
        popup.setAttribute('aria-hidden', String(isOpen));
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !popup.contains(e.target)) {
            popup.classList.remove('show');
            popup.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('show')) {
            popup.classList.remove('show');
            popup.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
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
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

window.addEventListener('scroll', updateActiveNavigation);

window.addEventListener('resize', () => {
    document.querySelectorAll('.skill-tooltip').forEach(tooltip => {
        tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-top');
    });
});

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

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

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function initializeExpandableSections() {
    const expandableToggles = document.querySelectorAll('.expandable-toggle');
    
    expandableToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const contentId = toggle.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            
            if (!content) return;
            
            const newExpandedState = !isExpanded;
            toggle.setAttribute('aria-expanded', newExpandedState);
            
            if (newExpandedState) {
                content.classList.add('expanded');
            } else {
                content.classList.remove('expanded');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNavigation();
    initializeSmoothScrolling();
    initializeProjectTabs();
    initializeProjectModal();
    initializeScrollAnimations();
    initializeSkillTooltips();
    initializeAiDisclaimer();
    initializeAiPerspective();
    initializeThemeToggle();
    initializeExpandableSections();
    
    updateActiveNavigation();
    
    console.log('Portfolio website initialized successfully');
});