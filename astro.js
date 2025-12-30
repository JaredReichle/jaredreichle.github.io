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
    // December 2025
    {
        filename: 'M1CrabNebula.jpg',
        title: 'Crab Nebula (M1)',
        description: 'A supernova remnant located in the constellation Taurus, approximately 6,500 light-years away. This is the remnant of a supernova that was observed and recorded by Chinese astronomers in 1054 AD. The nebula is expanding at about 1,500 km/s and contains a pulsar at its center.',
        date: 'December 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'IC434HorseheadNebula.jpg',
        title: 'Horsehead Nebula (IC 434)',
        description: 'A dark nebula located in the constellation Orion, approximately 1,500 light-years away. The distinctive horsehead shape is created by dark dust clouds silhouetted against the bright emission nebula IC 434. This is one of the most photographed objects in the night sky.',
        date: 'December 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'NGC2237RosetteNebula.jpg',
        title: 'Rosette Nebula (NGC 2237)',
        description: 'A large emission nebula located in the constellation Monoceros, approximately 5,000 light-years away. The nebula surrounds the open star cluster NGC 2244, whose stars were formed from the nebula\'s material. The rosette shape is created by stellar winds from the central stars.',
        date: 'December 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'Sirius.jpg',
        title: 'Sirius',
        description: 'The brightest star in the night sky, located in the constellation Canis Major approximately 8.6 light-years away. Also known as the Dog Star, Sirius is actually a binary star system consisting of a main-sequence star (Sirius A) and a white dwarf companion (Sirius B).',
        date: 'December 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'Pleiades.jpg',
        title: 'Pleiades (M45)',
        description: 'Also known as the Seven Sisters, this is one of the nearest and most beautiful open star clusters, located approximately 444 light-years away in the constellation Taurus. The cluster contains hundreds of stars, with the brightest seven visible to the naked eye.',
        date: 'December 2025',
        equipment: 'Seestar S50'
    },
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
    // Initialize theme toggle if function exists (from script.js)
    if (typeof initializeThemeToggle === 'function') {
        initializeThemeToggle();
    }
    
    // Initialize expandable sections if function exists (from script.js)
    if (typeof initializeExpandableSections === 'function') {
        initializeExpandableSections();
    }
    
    loadAstroGallery();
    setupImageModal();
    setupFilters();
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
    
    // Initialize filtered images
    filteredImages = [...astroImages];
    
    astroImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        // Set initial filtered index
        galleryItem.setAttribute('data-filtered-index', index);
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
    galleryItem.setAttribute('data-category', image.category || 'all');
    galleryItem.setAttribute('data-type', image.type || 'all');
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
    galleryItem.addEventListener('click', function() {
        const filteredIndex = parseInt(this.getAttribute('data-filtered-index')) || index;
        openImageModal(filteredIndex);
    });
    galleryItem.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const filteredIndex = parseInt(this.getAttribute('data-filtered-index')) || index;
            openImageModal(filteredIndex);
        }
    });
    
    return galleryItem;
}

// ============================================================================
// IMAGE MODAL SYSTEM
// ============================================================================

// Global state for lightbox
let currentImageIndex = 0;
let filteredImages = [...astroImages];
let activeFilter = 'all';

/**
 * Setup image modal functionality
 */
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = modal?.querySelector('.close');
    const prevBtn = modal?.querySelector('.lightbox-prev');
    const nextBtn = modal?.querySelector('.lightbox-next');
    const zoomInBtn = modal?.querySelector('.zoom-in');
    const zoomOutBtn = modal?.querySelector('.zoom-out');
    const zoomResetBtn = modal?.querySelector('.zoom-reset');
    const imageContainer = document.getElementById('lightboxImageContainer');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !closeBtn) {
        console.warn('Image modal elements not found');
        return;
    }
    
    window.astroModalElements = {
        modal,
        modalImage,
        imageContainer,
        imageTitle: document.getElementById('imageTitle'),
        imageDescription: document.getElementById('imageDescription'),
        imageDate: document.getElementById('imageDate'),
        imageEquipment: document.getElementById('imageEquipment'),
        imageCounter: document.getElementById('imageCounter')
    };
    
    // Close modal event handlers
    closeBtn.addEventListener('click', closeImageModal);
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateImage(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateImage(1));
    }
    
    // Zoom controls
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => zoomImage(1.2));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomImage(0.8));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);
    
    // Fullscreen control
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const fullscreenIcon = document.getElementById('fullscreenIcon');
    if (fullscreenBtn && imageContainer) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        document.addEventListener('fullscreenchange', updateFullscreenIcon);
        document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
        document.addEventListener('mozfullscreenchange', updateFullscreenIcon);
        document.addEventListener('MSFullscreenChange', updateFullscreenIcon);
    }
    
    function updateFullscreenIcon() {
        if (fullscreenIcon) {
            const isFullscreen = !!(document.fullscreenElement ||
                                   document.webkitFullscreenElement ||
                                   document.mozFullScreenElement ||
                                   document.msFullscreenElement);
            fullscreenIcon.className = isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
    }
    
    function toggleFullscreen() {
        if (!imageContainer) return;

        try {
            if (!document.fullscreenElement &&
                !document.webkitFullscreenElement &&
                !document.mozFullScreenElement &&
                !document.msFullscreenElement) {
                // Enter fullscreen
                if (imageContainer.requestFullscreen) {
                    imageContainer.requestFullscreen();
                } else if (imageContainer.webkitRequestFullscreen) {
                    imageContainer.webkitRequestFullscreen();
                } else if (imageContainer.mozRequestFullScreen) {
                    imageContainer.mozRequestFullScreen();
                } else if (imageContainer.msRequestFullscreen) {
                    imageContainer.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        } catch (error) {
            console.warn('Fullscreen not supported:', error);
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display !== 'block') return;
        
        if (event.key === 'Escape') {
            closeImageModal();
        } else if (event.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (event.key === 'ArrowRight') {
            navigateImage(1);
        } else if (event.key === '+' || event.key === '=') {
            zoomImage(1.2);
        } else if (event.key === '-') {
            zoomImage(0.8);
        } else if (event.key === '0') {
            resetZoom();
        }
    });
    
    // Click outside to close
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
    // Pan functionality when zoomed
    if (modalImage && imageContainer) {
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;
        
        modalImage.addEventListener('mousedown', (e) => {
            const currentScale = parseFloat(modalImage.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
            if (currentScale > 1) {
                isDragging = true;
                const rect = imageContainer.getBoundingClientRect();
                startX = e.clientX - rect.left;
                startY = e.clientY - rect.top;
                scrollLeft = imageContainer.scrollLeft;
                scrollTop = imageContainer.scrollTop;
                modalImage.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const rect = imageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const walkX = (x - startX) * 2;
            const walkY = (y - startY) * 2;
            imageContainer.scrollLeft = scrollLeft - walkX;
            imageContainer.scrollTop = scrollTop - walkY;
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            if (modalImage) {
                const currentScale = parseFloat(modalImage.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
                modalImage.style.cursor = currentScale > 1 ? 'grab' : 'default';
            }
        });
    }
}

/**
 * Open image modal with specific image data
 * @param {number} imageIndex - Index of the image to display (in filtered array)
 */
function openImageModal(imageIndex) {
    const image = filteredImages[imageIndex];
    const elements = window.astroModalElements;
    
    if (!image || !elements) {
        console.warn('Image data or modal elements not found');
        return;
    }
    
    currentImageIndex = imageIndex;
    
    // Reset zoom
    resetZoom();
    
    // Update modal content
    elements.modalImage.src = `images/astro/${image.filename}`;
    elements.modalImage.alt = image.title;
    elements.imageTitle.textContent = image.title;
    elements.imageDescription.textContent = image.description;
    elements.imageDate.textContent = `Date: ${image.date}`;
    elements.imageEquipment.textContent = `Equipment: ${image.equipment}`;
    
    // Update counter
    if (elements.imageCounter) {
        elements.imageCounter.textContent = `Image ${imageIndex + 1} of ${filteredImages.length}`;
    }
    
    // Show modal
    elements.modal.style.display = 'block';
    elements.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    elements.modal.querySelector('.close').focus();
}

/**
 * Navigate to next/previous image in lightbox
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateImage(direction) {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
        openImageModal(newIndex);
    }
}

/**
 * Zoom image in lightbox
 * @param {number} factor - Zoom factor (multiplier)
 */
function zoomImage(factor) {
    const elements = window.astroModalElements;
    if (!elements || !elements.modalImage || !elements.imageContainer) return;
    
    const currentScale = parseFloat(elements.modalImage.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
    const newScale = Math.max(1, Math.min(5, currentScale * factor));
    elements.modalImage.style.transform = `scale(${newScale})`;
    elements.modalImage.style.cursor = newScale > 1 ? 'grab' : 'default';
    
    // Ensure container can scroll when zoomed
    elements.imageContainer.style.overflow = newScale > 1 ? 'auto' : 'hidden';
    elements.imageContainer.style.overflowX = newScale > 1 ? 'auto' : 'hidden';
    elements.imageContainer.style.overflowY = newScale > 1 ? 'auto' : 'hidden';
}

/**
 * Reset zoom to default
 */
function resetZoom() {
    const elements = window.astroModalElements;
    if (!elements || !elements.modalImage) return;
    
    elements.modalImage.style.transform = 'scale(1)';
    elements.modalImage.style.cursor = 'default';
    if (elements.imageContainer) {
        elements.imageContainer.scrollLeft = 0;
        elements.imageContainer.scrollTop = 0;
        elements.imageContainer.style.overflow = 'hidden';
        elements.imageContainer.style.overflowX = 'hidden';
        elements.imageContainer.style.overflowY = 'hidden';
    }
}

/**
 * Toggle fullscreen mode for image container
 */
function toggleFullscreen() {
    const elements = window.astroModalElements;
    const imageContainer = elements?.imageContainer;
    if (!imageContainer) return;
    
    try {
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
            // Enter fullscreen
            if (imageContainer.requestFullscreen) {
                imageContainer.requestFullscreen();
            } else if (imageContainer.webkitRequestFullscreen) {
                imageContainer.webkitRequestFullscreen();
            } else if (imageContainer.mozRequestFullScreen) {
                imageContainer.mozRequestFullScreen();
            } else if (imageContainer.msRequestFullscreen) {
                imageContainer.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    } catch (error) {
        console.warn('Fullscreen not supported:', error);
    }
}

/**
 * Close image modal
 */
function closeImageModal() {
    const elements = window.astroModalElements;
    if (elements) {
        // Exit fullscreen if active
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        
        elements.modal.style.display = 'none';
        elements.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }
}

// ============================================================================
// FILTER FUNCTIONALITY
// ============================================================================

/**
 * Setup filter functionality
 */
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update active filter state
            activeFilter = filter;
            
            // Apply filter
            applyFilters();
        });
    });
}

/**
 * Apply filter to gallery
 */
function applyFilters() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter images based on object type
    if (activeFilter === 'all') {
        filteredImages = [...astroImages];
    } else {
        filteredImages = astroImages.filter(img => 
            img.category === activeFilter || img.type === activeFilter
        );
    }
    
    // Update gallery items visibility and filtered indices
    let filteredIndexCounter = 0;
    galleryItems.forEach((item) => {
        const imageIndex = parseInt(item.getAttribute('data-image-index'));
        const image = astroImages[imageIndex];
        
        if (!image) return;
        
        const shouldShow = activeFilter === 'all' || 
                          image.category === activeFilter || 
                          image.type === activeFilter;
        
        if (shouldShow) {
            item.style.display = '';
            // Update data-filtered-index to reflect position in filtered array
            item.setAttribute('data-filtered-index', filteredIndexCounter);
            filteredIndexCounter++;
        } else {
            item.style.display = 'none';
        }
    });
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
