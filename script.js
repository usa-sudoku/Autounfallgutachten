/* ==========================================================================
   1. MENÜ-STEUERUNG (SIDE-MENU & HAMBURGER)
   ========================================================================== */
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

menuIcon.addEventListener('click', () => {
    if (sideMenu.style.right === '0px') {
        sideMenu.style.right = '-250px';
    } else {
        sideMenu.style.right = '0px';
    }
});

document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
        sideMenu.style.right = '-250px';
    }
});


/* ==========================================================================
   2. FREIER HIGH-GLOSS LACKEFFEKT (MAUS- & TOUCH-STEUERUNG)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    // Funktion zur Berechnung der freien Lichtposition
    function moveLight(e) {
        const rect = footer.getBoundingClientRect();
        
        // Holt die Position entweder vom Touch-Event (Handy) oder Maus-Event (PC)
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        // Berechnet die exakte Position in Prozent innerhalb des Footers
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        
        // Übergibt die freien Koordinaten live ans CSS
        footer.style.setProperty('--glow-x', x + '%');
        footer.style.setProperty('--glow-y', y + '%');
    }

    // Event-Listener für PC (Mausbewegung)
    footer.addEventListener('mousemove', moveLight);

    // Event-Listener für Handys (Finger bewegen)
    footer.addEventListener('touchmove', moveLight, { passive: true });
}
