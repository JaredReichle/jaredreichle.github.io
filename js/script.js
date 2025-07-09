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
    homelab: {
        title: "Home Lab Servers & Proxmox Cluster",
        description: "Built a comprehensive home lab environment using surplus hardware to create a Proxmox virtualization cluster. This setup enables experimentation with various operating systems, networking configurations, and virtualization technologies.",
        tech: ["Proxmox", "Linux", "Virtualization", "Networking", "Hardware"],
        features: [
            "Proxmox virtualization cluster setup",
            "Multiple VM environments for testing",
            "Network isolation and segmentation",
            "Hardware resource optimization",
            "Backup and recovery systems",
            "Monitoring, management and cyber tools"
        ],
        technical: "The home lab consists of multiple physical servers running Proxmox VE for virtualization management. The cluster provides high availability and resource pooling across multiple nodes. Network segmentation is achieved through VLANs and virtual switches.",
        challenges: "Key challenges included optimizing resource allocation across limited hardware, ensuring network security and isolation, and maintaining system reliability with surplus equipment. Solutions involved careful capacity planning, network design best practices, and implementing robust monitoring systems.",
    },
    taskapp: {
        title: "FPGA Data Acquisition & Control System for Laser Interferometry",
        description: "Designed and implemented a modular FPGA-based system to acquire data and drive closed-loop control for a laser interferometer, simulating and verifying the architecture on a Zynq 7010 SoC.",
        tech: ["FPGA", "VHDL", "Python", "Control Systems", "Signal Processing"],
        features: [
            "Modular FPGA architecture design",
            "Real-time data acquisition system",
            "Closed-loop control implementation",
            "Laser interferometer integration",
            "Zynq 7010 SoC verification",
            "Signal processing and analysis"
        ],
        technical: "The system utilizes a Xilinx Zynq 7010 SoC with custom VHDL modules for data acquisition and control logic. Python interfaces handle data processing and analysis, while the FPGA manages real-time control loops and signal conditioning for the laser interferometer.",
        challenges: "Primary challenges included designing a modular architecture that could handle real-time data acquisition while maintaining precise control loops, optimizing FPGA resource utilization, and ensuring reliable communication between the FPGA and processing units. Solutions involved careful timing analysis, efficient resource allocation, and robust error handling mechanisms.",
    },
    analytics: {
        title: "Circuit Synthesis from Frequency Response Data",
        description: "Built a Python tool that reverse-engineers frequency response data into equivalent RLC circuit branches, effectively turning a 'black-box' circuit into an analyzable model.",
        tech: ["Python", "Signal Processing", "Circuit Analysis", "Optimization", "Numerical Methods"],
        features: [
            "Frequency response data analysis",
            "RLC circuit synthesis algorithms",
            "Black-box circuit modeling",
            "Numerical optimization techniques",
            "Circuit parameter extraction",
            "Model validation and verification"
        ],
        technical: "The tool uses advanced signal processing techniques to analyze frequency response data and employs numerical optimization algorithms to synthesize equivalent RLC circuit models. Python libraries handle complex mathematical operations, while custom algorithms perform circuit parameter extraction and model validation.",
        challenges: "Key challenges were developing robust algorithms for circuit synthesis from limited frequency response data, ensuring the synthesized models accurately represent the original circuit behavior, and handling cases with multiple valid solutions. Solutions involved implementing sophisticated optimization algorithms, developing validation metrics, and creating robust error handling for edge cases.",
    },
    telescope: {
        title: "DIY Go-To Dobsonian Telescope Conversion",
        description: "Upgrading a 12-inch Apertura Dobsonian by adding stepper motors and implementing OnStep tracking, turning a manual telescope into a go-to system for automated star tracking and positioning.",
        tech: ["Arduino", "Stepper Motors", "Astronomy", "Mechanical Design", "C++", "OnStep"],
        features: [
            "Stepper motor integration for azimuth and altitude control",
            "OnStep tracking system implementation",
            "Automated star positioning and tracking",
            "Manual override capabilities",
            "Precision mechanical modifications",
            "Real-time position feedback and control"
        ],
        technical: "The conversion involves integrating stepper motors to both the azimuth and altitude axes of the Dobsonian mount. An Arduino-based control system manages the motors and implements the OnStep tracking algorithm for accurate celestial object positioning. The system includes manual override capabilities and real-time position feedback.",
        challenges: "Primary challenges include maintaining the telescope's balance after adding motor weight, ensuring precise motor control for accurate positioning, and implementing reliable tracking algorithms. Solutions involve careful weight distribution planning, high-precision stepper motor selection, and robust control system design with fail-safe mechanisms.",
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
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalTechnical').textContent = project.technical;
            document.getElementById('modalChallenges').textContent = project.challenges;
            
            // Update tech tags
            const techContainer = document.querySelector('.modal-tech');
            techContainer.innerHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
            
            // Update features list
            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
            
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