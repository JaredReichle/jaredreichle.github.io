// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Modal System
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.project-card');

// Project data
const projectData = {
    homelabServers: {
        title: "Home Lab Servers & Proxmox Cluster",
        summary: "Built a home lab environment using surplus hardware to create a Proxmox virtualization cluster. This setup enables experimentation with various operating systems (RHEL, Ubunut, Kali), networking configurations (NFS, vmbr), and virtualization technologies (Containers, VMs, ISOs).",
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
        summary: "Upgrading a 12-inch Apertura Dobsonian by adding stepper motors and implementing OnStep tracking, turning a manual telescope into a go-to system for automated star tracking and positioning.",
        layman: "I'm taking a manual telescope that you normally have to point by hand and adding motors and a computer control to it. This will let me tell the telescope to find specific stars or galaxies automatically, and it will track them as they move across the sky, like having a robot assistant for stargazing.",
        technical: "The conversion involves integrating stepper motors to both the azimuth and altitude axes of the Dobsonian mount. An Arduino-based control system manages the motors and implements the OnStep tracking algorithm for accurate celestial object positioning. The system includes manual override capabilities and real-time position feedback with precision encoders for position verification.",
        tech: ["Arduino", "Stepper Motors", "Astronomy", "Mechanical Design", "C++", "OnStep"],
        highlights: [
            "Stepper motor integration for azimuth and altitude control",
            "OnStep tracking system implementation",
            "Automated star positioning and tracking",
            "Manual override capabilities",
            "Precision mechanical modifications",
            "Real-time position feedback and control"
        ],
    }
};

// Open modal when project card is clicked
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            // Populate modal with project data
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalSummary').textContent = project.summary;
            document.getElementById('modalLayman').textContent = project.layman;
            document.getElementById('modalTechnical').textContent = project.technical;
            
            // Update tech tags
            const techContainer = document.querySelector('.modal-tech');
            techContainer.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
            
            // Update highlights list
            const highlightsList = document.getElementById('modalHighlights');
            highlightsList.innerHTML = project.highlights.map(highlight => `<li>${highlight}</li>`).join('');
            
            // Add external links if they exist
            const linksContainer = document.getElementById('modalLinks');
            if (projectId === 'fpgaLaserControl') {
                linksContainer.innerHTML = `
                    <a href="https://mindworks.shoutwiki.com/wiki/FPGA_Data_Acquisition_and_Control" class="modal-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        View Documentation
                    </a>
                `;
            } else {
                linksContainer.innerHTML = '';
            }
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Scroll animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .resume-content, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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