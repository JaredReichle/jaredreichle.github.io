/**
 * Astronomy Gallery JavaScript
 * Handles the astronomy gallery page functionality including image loading,
 * modal interactions, and mobile navigation
 */

// ============================================================================
// ASTRONOMY IMAGE DATA
// ============================================================================

/**
 * Astronomy image data configuration
 * Contains metadata for each astronomy image in the gallery
 * 
 * IMPORTANT: Images are ordered by date with MOST RECENT FIRST.
 * When adding new images, place them at the top of this array to maintain chronological order.
 */
const astroImages = [
    // November 2025
    {
        filename: 'M42OrionsNebula.jpg',
        title: 'Orion Nebula (M42)',
        description: 'One of the brightest and most famous nebulae in the night sky, located in the constellation Orion approximately 1,344 light-years away. This stellar nursery is where new stars are being born, visible even to the naked eye as a fuzzy patch in Orion\'s sword.',
        date: 'November 2025',
        equipment: 'Seestar S50'
    },
    // September 2025
    {
        filename: 'IC5146CocoonNebula.jpg',
        title: 'Cocoon Nebula (IC 5146)',
        description: 'A reflection/emission nebula in the constellation Cygnus, approximately 4,000 light-years away. This beautiful nebula contains both dark dust lanes and bright emission regions where new stars are forming.',
        date: 'September 2025',
        equipment: 'Seestar S50'
    },
    // August 2025
    {
        filename: 'M31AndromedaGalaxy.jpg',
        title: 'Andromeda Galaxy (M31)',
        description: 'The closest spiral galaxy to our Milky Way, located approximately 2.5 million light-years away. This is the most distant object visible to the naked eye from Earth.',
        date: 'August 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'C33VeilNebula.jpg',
        title: 'Veil Nebula (C33)',
        description: 'A supernova remnant located in the constellation Cygnus, approximately 2,100 light-years away. This is the visible portion of the Cygnus Loop.',
        date: 'August 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'M13HerculesCluster.jpg',
        title: 'Hercules Globular Cluster (M13)',
        description: 'One of the brightest globular clusters in the northern hemisphere, containing hundreds of thousands of stars located 22,200 light-years away.',
        date: 'August 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'M27DumbbellNebula.jpg',
        title: 'Dumbbell Nebula (M27)',
        description: 'A planetary nebula in the constellation Vulpecula, approximately 1,360 light-years away. This is one of the brightest planetary nebulae visible from Earth.',
        date: 'August 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'M57RingNebula.jpg',
        title: 'Ring Nebula (M57)',
        description: 'A planetary nebula in the constellation Lyra, located about 2,300 light-years away. This is one of the most famous and beautiful planetary nebulae.',
        date: 'August 2025',
        equipment: 'Seestar S50'
    },
    // July 2025
    {
        filename: 'NGC7000NorthAmericaNebula.jpg',
        title: 'North America Nebula (NGC 7000)',
        description: 'An emission nebula in the constellation Cygnus, approximately 2,590 light-years away. Its shape resembles the North American continent.',
        date: 'July 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'NightSkyCapitolReef1.jpg',
        title: 'Night Sky at Capitol Reef',
        description: 'A stunning view of the Milky Way galaxy over the dramatic landscape near Capitol Reef National Park.',
        date: 'July 2025',
        equipment: 'Google Pixel 7'
    },
    {
        filename: 'NightSkyCapitolReef2.jpg',
        title: 'Capitol Reef Star Trails',
        description: 'Campsite views looking at the tail of the Milky Way close to Capitol Reef National Park.',
        date: 'July 2025',
        equipment: 'Google Pixel 7'
    },
    {
        filename: 'NightSkyCapitolReef3.jpg',
        title: 'Capitol Reef Milky Way',
        description: 'Another breathtaking view of the Milky Way galaxy.',
        date: 'July 2025',
        equipment: 'Google Pixel 7'
    }
];

// ============================================================================
// GALLERY INITIALIZATION
// ============================================================================

/**
 * Initialize astronomy gallery when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
    loadAstroGallery();
    setupImageModal();
    setupMobileNavigation();
    setupAiDisclaimer();
    
    // Set astronomy navigation as active with a small delay to ensure DOM is ready
    setTimeout(() => {
        setAstronomyActive();
    }, 100);
    
    console.log('Astronomy gallery initialized successfully');
});

/**
 * Load astronomy gallery with image data
 */
function loadAstroGallery() {
    const gallery = document.getElementById('astroGallery');
    
    if (!gallery) {
        console.warn('Gallery container not found');
        return;
    }
    
    astroImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        gallery.appendChild(galleryItem);
    });
}

/**
 * Create a gallery item element
 * @param {Object} image - Image data object
 * @param {number} index - Image index
 * @returns {HTMLElement} - Gallery item element
 */
function createGalleryItem(image, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-image-index', index);
    galleryItem.setAttribute('role', 'gridcell');
    galleryItem.setAttribute('tabindex', '0');
    
    galleryItem.innerHTML = `
        <div class="gallery-image-container">
            <img src="images/astro/${image.filename}" 
                 alt="${image.title}" 
                 class="gallery-image"
                 loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${image.title}</h3>
                    <p>${image.date}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for accessibility
    galleryItem.addEventListener('click', () => openImageModal(index));
    galleryItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openImageModal(index);
        }
    });
    
    return galleryItem;
}

// ============================================================================
// IMAGE MODAL SYSTEM
// ============================================================================

/**
 * Setup image modal functionality
 */
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (!modal || !closeBtn) {
        console.warn('Image modal elements not found');
        return;
    }
    
    // Store modal elements for global access
    window.astroModalElements = {
        modal,
        modalImage: document.getElementById('modalImage'),
        imageTitle: document.getElementById('imageTitle'),
        imageDescription: document.getElementById('imageDescription'),
        imageDate: document.getElementById('imageDate'),
        imageEquipment: document.getElementById('imageEquipment')
    };
    
    // Close modal event handlers
    closeBtn.addEventListener('click', closeImageModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeImageModal();
        }
    });
}

/**
 * Open image modal with specific image data
 * @param {number} imageIndex - Index of the image to display
 */
function openImageModal(imageIndex) {
    const image = astroImages[imageIndex];
    const elements = window.astroModalElements;
    
    if (!image || !elements) {
        console.warn('Image data or modal elements not found');
        return;
    }
    
    // Update modal content
    elements.modalImage.src = `images/astro/${image.filename}`;
    elements.modalImage.alt = image.title;
    elements.imageTitle.textContent = image.title;
    elements.imageDescription.textContent = image.description;
    elements.imageDate.textContent = `Date: ${image.date}`;
    elements.imageEquipment.textContent = `Equipment: ${image.equipment}`;
    
    // Show modal
    elements.modal.style.display = 'block';
    elements.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    elements.modal.querySelector('.close').focus();
}

/**
 * Close image modal
 */
function closeImageModal() {
    const elements = window.astroModalElements;
    if (elements) {
        elements.modal.style.display = 'none';
        elements.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// NAVIGATION ACTIVE STATE
// ============================================================================

/**
 * Set astronomy navigation link as active
 */
function setAstronomyActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Astronomy page - setting active navigation');
    console.log('Found nav links:', navLinks.length);
    
    // Force remove all active classes first
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // Find and activate the astronomy link
    const astronomyLink = document.querySelector('a[href="astro.html"]');
    if (astronomyLink) {
        astronomyLink.classList.add('active');
        astronomyLink.setAttribute('aria-current', 'page');
        console.log('Successfully set astronomy link as active');
        
        // Force the styles to apply
        astronomyLink.style.color = 'var(--primary-color)';
        astronomyLink.style.setProperty('color', 'var(--primary-color)', 'important');
    } else {
        console.error('Astronomy link not found!');
    }
}

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

/**
 * Setup mobile navigation functionality
 */
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }
    
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
// AI DISCLAIMER
// ============================================================================

/**
 * Setup AI disclaimer functionality
 */
function setupAiDisclaimer() {
    const aiDisclaimerLink = document.getElementById('aiDisclaimerLink');
    const aiDisclaimerText = document.getElementById('aiDisclaimerText');
    
    if (!aiDisclaimerLink || !aiDisclaimerText) {
        console.warn('AI disclaimer elements not found');
        return;
    }
    
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
