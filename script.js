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
   2. REPARIERTER HIGH-GLOSS LACKEFFEKT (SCROLL-GLOW)
   ========================================================================== */
window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const rect = footer.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    
    // Sobald der Footer unten ins Bild rutscht
    if (rect.top < viewHeight && rect.bottom > 0) {
        
        // NEUE FORMEL: Berechnet den exakten Weg von "Auftauchen" bis "Ganz oben"
        const totalWay = viewHeight + rect.height;
        const currentWay = viewHeight - rect.top;
        const scrolledFraction = currentWay / totalWay;
        
        // Viel größere Bewegungsradien, damit das Licht nicht festklebt:
        // X wandert jetzt großzügig von links nach rechts (0% bis 100%)
        const glowX = scrolledFraction * 100;
        
        // Y startet viel tiefer und wandert nach unten weg (-10% bis 80%)
        const glowY = -10 + (scrolledFraction * 90);
        
        // Werte live ins CSS übergeben
        footer.style.setProperty('--glow-x', glowX + '%');
        footer.style.setProperty('--glow-y', glowY + '%');
    }
});
