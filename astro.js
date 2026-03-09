const astroImages = [
    {
        filename: 'M81BodesGalaxy.jpg',
        title: 'Bode\'s Galaxy (M81)',
        description: 'A grand design spiral galaxy in the constellation Ursa Major, about 12 million light-years away. M81 is one of the brightest galaxies visible from Earth and is part of the M81 Group.',
        date: 'March 2026',
        equipment: 'Seestar S50'
    },
    {
        filename: 'moon.png',
        title: 'The Moon',
        description: 'A detailed look at the Moon\'s surface, highlighting cratered terrain and lunar maria during the February observing session.',
        date: 'February 2026',
        equipment: 'Seestar S50'
    },
    {
        filename: 'C31FlamingStarNebula.jpg',
        title: 'Flaming Star Nebula (C31)',
        description: 'An emission and reflection nebula located in the constellation Auriga, approximately 1,500 light-years away. Also known as IC 405, this nebula gets its name from the bright star AE Aurigae, which illuminates the surrounding gas and dust, creating the appearance of flames.',
        date: 'January 2026',
        equipment: 'Seestar S50'
    },
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
    {
        filename: 'M42OrionsNebula.jpg',
        title: 'Orion Nebula (M42)',
        description: 'One of the brightest and most famous nebulae in the night sky, located in the constellation Orion approximately 1,344 light-years away. This stellar nursery is where new stars are being born, visible even to the naked eye as a fuzzy patch in Orion\'s sword.',
        date: 'November 2025',
        equipment: 'Seestar S50'
    },
    {
        filename: 'IC5146CocoonNebula.jpg',
        title: 'Cocoon Nebula (IC 5146)',
        description: 'A reflection/emission nebula in the constellation Cygnus, approximately 4,000 light-years away. This beautiful nebula contains both dark dust lanes and bright emission regions where new stars are forming.',
        date: 'September 2025',
        equipment: 'Seestar S50'
    },
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

const planetariumSeasons = {
    spring: {
        label: 'Spring',
        date: '2026-03-20T00:00:00'
    },
    summer: {
        label: 'Summer',
        date: '2026-06-21T00:00:00'
    },
    fall: {
        label: 'Fall',
        date: '2026-09-22T00:00:00'
    },
    winter: {
        label: 'Winter',
        date: '2026-12-21T00:00:00'
    }
};

const planetariumPointers = [
    {
        ra: 83.8221,
        dec: -5.3911,
        label: 'Orion Nebula (M42)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=5.58813861333333&de=-5.3911111&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M42',
        credit: 'Wikisky',
        colour: 'rgb(255,220,220)'
    },
    {
        ra: 56.75,
        dec: 24.1167,
        label: 'Pleiades (M45)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=3.78333333333333&de=24.1167&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M45',
        credit: 'Wikisky',
        colour: 'rgb(210,230,255)'
    },
    {
        ra: 10.6847,
        dec: 41.269,
        label: 'Andromeda Galaxy (M31)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=0.71298&de=41.269&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M31',
        credit: 'Wikisky',
        colour: 'rgb(255,235,200)'
    },
    {
        ra: 83.6331,
        dec: 22.0145,
        label: 'Crab Nebula (M1)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=5.57554&de=22.0145&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M1',
        credit: 'Wikisky',
        colour: 'rgb(255,200,200)'
    },
    {
        ra: 85.25,
        dec: -2.45,
        label: 'Horsehead Nebula (IC 434)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=5.68333333333333&de=-2.45&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=IC%20434',
        credit: 'Wikisky',
        colour: 'rgb(200,200,255)'
    },
    {
        ra: 97.5,
        dec: 5.0,
        label: 'Rosette Nebula (NGC 2237)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=6.5&de=5.0&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=NGC%202237',
        credit: 'Wikisky',
        colour: 'rgb(255,210,210)'
    },
    {
        ra: 101.287,
        dec: -16.716,
        label: 'Sirius',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=6.7525&de=-16.716&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=Sirius',
        credit: 'Wikisky',
        colour: 'rgb(220,220,255)'
    },
    {
        ra: 327.7,
        dec: 47.3,
        label: 'Cocoon Nebula (IC 5146)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=21.8467&de=47.3&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=IC%205146',
        credit: 'Wikisky',
        colour: 'rgb(210,240,255)'
    },
    {
        ra: 311.7,
        dec: 30.7,
        label: 'Veil Nebula (C33)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=20.78&de=30.7&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=NGC%206990',
        credit: 'Wikisky',
        colour: 'rgb(200,230,255)'
    },
    {
        ra: 250.42,
        dec: 36.46,
        label: 'Hercules Globular Cluster (M13)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=16.694&de=36.46&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M13',
        credit: 'Wikisky',
        colour: 'rgb(255,240,200)'
    },
    {
        ra: 299.9,
        dec: 22.72,
        label: 'Dumbbell Nebula (M27)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=19.993&de=22.72&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M27',
        credit: 'Wikisky',
        colour: 'rgb(220,255,220)'
    },
    {
        ra: 283.4,
        dec: 33.03,
        label: 'Ring Nebula (M57)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=18.893&de=33.03&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=M57',
        credit: 'Wikisky',
        colour: 'rgb(240,220,255)'
    },
    {
        ra: 314.0,
        dec: 44.3,
        label: 'North America Nebula (NGC 7000)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=20.933&de=44.3&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=NGC%207000',
        credit: 'Wikisky',
        colour: 'rgb(210,230,255)'
    },
    {
        ra: 79.9,
        dec: 34.4,
        label: 'Flaming Star Nebula (C31 / IC 405)',
        img: 'http://server7.sky-map.org/imgcut?survey=DSS2&w=128&h=128&ra=5.3267&de=34.4&angle=1.25&output=PNG',
        url: 'http://simbad.u-strasbg.fr/simbad/sim-id?Ident=IC%20405',
        credit: 'Wikisky',
        colour: 'rgb(255,220,200)'
    }
];

function initializeTelescopeCards() {
}

function initializeLoggingPlanetarium() {
    const planetariumContainer = document.getElementById('starmap');
    if (!planetariumContainer) {
        return;
    }

    const seasonButtons = document.querySelectorAll('.season-button');
    const projectionButtons = document.querySelectorAll('.projection-button');
    const gridButtons = document.querySelectorAll('.grid-toggle-button');
    const defaultSeason = 'spring';
    const defaultProjection = 'stereo';
    const defaultGrid = {
        equatorial: true,
        zenith: false
    };
    const latitude = 40.7608;
    const longitude = -111.8910;
    let currentSeason = defaultSeason;
    let currentProjection = defaultProjection;
    let currentGrid = { ...defaultGrid };
    let planetariumInstance = null;

    const buildPlanetarium = (seasonKey) => {
        if (!window.jQuery || typeof window.jQuery.virtualsky !== 'function') {
            console.warn('VirtualSky library not loaded');
            return;
        }

        const season = planetariumSeasons[seasonKey];
        if (!season) {
            console.warn('Unknown season key:', seasonKey);
            return;
        }

        planetariumContainer.innerHTML = '';

        planetariumInstance = window.jQuery.virtualsky({
            id: 'starmap',
            projection: currentProjection,
            latitude,
            longitude,
            constellations: false,
            constellationlabels: false,
            constellationboundaries: false,
            gridlines_eq: currentGrid.equatorial,
            gridlines_az: currentGrid.zenith,
            showstars: true,
            transparent: false,
            background: 'rgb(8, 12, 24)',
            color: 'rgb(240, 244, 255)',
            magnitude: 6,
            mouse: true,
            keyboard: true,
            clock: new Date(season.date)
        });

        planetariumPointers.forEach((pointer) => {
            planetariumInstance.addPointer(pointer);
        });

        if (typeof planetariumInstance.draw === 'function') {
            planetariumInstance.draw();
        }

        if (typeof planetariumInstance.resize === 'function') {
            setTimeout(() => planetariumInstance.resize(), 0);
        }
    };

    const setActiveButton = (targetSeason) => {
        seasonButtons.forEach((button) => {
            const isActive = button.getAttribute('data-season') === targetSeason;
            button.classList.toggle('active', isActive);
        });
    };

    const setActiveProjection = (targetProjection) => {
        projectionButtons.forEach((button) => {
            const isActive = button.getAttribute('data-projection') === targetProjection;
            button.classList.toggle('active', isActive);
        });
    };

    const setActiveGridButtons = () => {
        gridButtons.forEach((button) => {
            const gridType = button.getAttribute('data-grid');
            const isActive = gridType === 'equatorial'
                ? currentGrid.equatorial
                : currentGrid.zenith;
            button.classList.toggle('active', isActive);
        });
    };

    seasonButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const seasonKey = button.getAttribute('data-season');
            currentSeason = seasonKey;
            setActiveButton(seasonKey);
            buildPlanetarium(seasonKey);
        });
    });

    projectionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const projection = button.getAttribute('data-projection');
            currentProjection = projection;
            setActiveProjection(projection);
            buildPlanetarium(currentSeason);
        });
    });

    gridButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const gridType = button.getAttribute('data-grid');
            if (gridType === 'equatorial') {
                currentGrid.equatorial = !currentGrid.equatorial;
            } else if (gridType === 'zenith') {
                currentGrid.zenith = !currentGrid.zenith;
            }
            setActiveGridButtons();
            buildPlanetarium(currentSeason);
        });
    });

    setActiveButton(defaultSeason);
    setActiveProjection(defaultProjection);
    setActiveGridButtons();
    buildPlanetarium(defaultSeason);
}

/**
 * Initialize astronomy gallery when page loads
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initializeThemeToggle === 'function') {
        initializeThemeToggle();
    }
    
    if (typeof initializeExpandableSections === 'function') {
        initializeExpandableSections();
    }
    
    initializeTelescopeCards();
    
    initializeLoggingPlanetarium();

    loadAstroGallery();
    setupImageModal();
    setupFilters();
    setupMobileNavigation();
    setupAiDisclaimer();
    
    setTimeout(() => {
        setAstronomyActive();
    }, 100);
    
    console.log('Astronomy gallery initialized successfully');
});

function loadAstroGallery() {
    const gallery = document.getElementById('astroGallery');
    
    if (!gallery) {
        console.warn('Gallery container not found');
        return;
    }
    
    filteredImages = [...astroImages];
    
    astroImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryItem.setAttribute('data-filtered-index', index);
        gallery.appendChild(galleryItem);
    });
}

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

let currentImageIndex = 0;
let filteredImages = [...astroImages];
let activeFilter = 'all';

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
    
    closeBtn.addEventListener('click', closeImageModal);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateImage(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateImage(1));
    }
    
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => zoomImage(1.2));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => zoomImage(0.8));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);
    
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
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
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

function openImageModal(imageIndex) {
    const image = filteredImages[imageIndex];
    const elements = window.astroModalElements;
    
    if (!image || !elements) {
        console.warn('Image data or modal elements not found');
        return;
    }
    
    currentImageIndex = imageIndex;
    
    resetZoom();
    
    elements.modalImage.src = `images/astro/${image.filename}`;
    elements.modalImage.alt = image.title;
    elements.imageTitle.textContent = image.title;
    elements.imageDescription.textContent = image.description;
    elements.imageDate.textContent = `Date: ${image.date}`;
    elements.imageEquipment.textContent = `Equipment: ${image.equipment}`;
    
    if (elements.imageCounter) {
        elements.imageCounter.textContent = `Image ${imageIndex + 1} of ${filteredImages.length}`;
    }
    
    elements.modal.style.display = 'block';
    elements.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    elements.modal.querySelector('.close').focus();
}

function navigateImage(direction) {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
        openImageModal(newIndex);
    }
}

function zoomImage(factor) {
    const elements = window.astroModalElements;
    if (!elements || !elements.modalImage || !elements.imageContainer) return;
    
    const currentScale = parseFloat(elements.modalImage.style.transform.match(/scale\(([^)]+)\)/)?.[1] || 1);
    const newScale = Math.max(1, Math.min(5, currentScale * factor));
    elements.modalImage.style.transform = `scale(${newScale})`;
    elements.modalImage.style.cursor = newScale > 1 ? 'grab' : 'default';
    
    elements.imageContainer.style.overflow = newScale > 1 ? 'auto' : 'hidden';
    elements.imageContainer.style.overflowX = newScale > 1 ? 'auto' : 'hidden';
    elements.imageContainer.style.overflowY = newScale > 1 ? 'auto' : 'hidden';
}

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

function toggleFullscreen() {
    const elements = window.astroModalElements;
    const imageContainer = elements?.imageContainer;
    if (!imageContainer) return;
    
    try {
        if (!document.fullscreenElement &&
            !document.webkitFullscreenElement && 
            !document.mozFullScreenElement && 
            !document.msFullscreenElement) {
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

function closeImageModal() {
    const elements = window.astroModalElements;
    if (elements) {
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

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            activeFilter = filter;
            
            applyFilters();
        });
    });
}

function applyFilters() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (activeFilter === 'all') {
        filteredImages = [...astroImages];
    } else {
        filteredImages = astroImages.filter(img => 
            img.category === activeFilter || img.type === activeFilter
        );
    }
    
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
            item.setAttribute('data-filtered-index', filteredIndexCounter);
            filteredIndexCounter++;
        } else {
            item.style.display = 'none';
        }
    });
}

function setAstronomyActive() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Astronomy page - setting active navigation');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    const astronomyLink = document.querySelector('a[href="astro.html"]');
    if (astronomyLink) {
        astronomyLink.classList.add('active');
        astronomyLink.setAttribute('aria-current', 'page');
        console.log('Successfully set astronomy link as active');
        
        astronomyLink.style.color = 'var(--primary-color)';
        astronomyLink.style.setProperty('color', 'var(--primary-color)', 'important');
    } else {
        console.error('Astronomy link not found!');
    }
}

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
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

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
