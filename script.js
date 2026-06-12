/* ==========================================================================
   1. MENÜ-STEUERUNG (SIDE-MENU & HAMBURGER)
   ========================================================================== */
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

menuIcon.addEventListener('click', () => {
    sideMenu.style.right = (sideMenu.style.right === '0px') ? '-250px' : '0px';
});

document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
        sideMenu.style.right = '-250px';
    }
});


/* ==========================================================================
   2. PHYSIKALISCHER LACK-EFFEKT (KONKAVE WÖLBUNG)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Performance-Optimierung: Nur berechnen, wenn Footer im Bild
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
        });
    }, { threshold: 0.05 });

    observer.observe(footer);

    function handleLackReflektion(e) {
        if (!isFooterVisible) return;

        const rect = footer.getBoundingClientRect();
        
        // Maus- oder Touch-Koordinaten relativ zum Footer-Container
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const xInFooter = clientX - rect.left;
        const yInFooter = clientY - rect.top;

        // Normalisierte Position (-1 bis 1) für die mathematische Berechnung
        const relX = (xInFooter / rect.width) * 2 - 1;
        const relY = (yInFooter / rect.height) * 2 - 1;
        
        // Abstand vom Zentrum (0 = Mitte, 1 = äußerster Rand)
        const dist = Math.sqrt(relX * relX + relY * relY);
        
        // Physik: Streckungsfaktor (1 = kreisrund in der Mitte, 1.8 = gestreckt am Rand)
        const stretch = 1 + (dist * 0.8); 
        
        const baseSize = 130; // Basisgröße des Lichtpunkts
        const width = baseSize * stretch;
        const height = baseSize / stretch;

        // Werte an die CSS-Variablen übergeben
        footer.style.setProperty('--glow-x', xInFooter + 'px');
        footer.style.setProperty('--glow-y', yInFooter + 'px');
        footer.style.setProperty('--glow-w', width + 'px');
        footer.style.setProperty('--glow-h', height + 'px');
    }

    // Lauscht auf Bewegungen
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
