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

// Schließt das Menü beim Klick außerhalb
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
        sideMenu.style.right = '-250px';
    }
});


/* ==========================================================================
   2. HIGH-GLOSS LACKEFFEKT (SCROLL-GLOW FÜR DEN FOOTER)
   ========================================================================== */
window.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    const rect = footer.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    
    // Sobald die Oberkante des Footers im Bildschirm auftaucht
    if (rect.top < viewHeight && rect.bottom > 0) {
        
        // Berechnet den Scroll-Fortschritt im Footer (Wert zwischen 0 und 1)
        const scrolledFraction = (viewHeight - rect.top) / (viewHeight + rect.height);
        
        // Berechnungen für den studioartigen Lichtbalken im Klarlack:
        // X wandert von links nach rechts (von 10% bis 70%)
        const glowX = 10 + (scrolledFraction * 60);
        
        // Y wandert von weit oben nach unten in die Fläche hinein (-40% bis 30%)
        const glowY = -40 + (scrolledFraction * 70);
        
        // Schreibt die berechneten Prozentwerte live als CSS-Variablen in den Footer
        footer.style.setProperty('--glow-x', glowX + '%');
        footer.style.setProperty('--glow-y', glowY + '%');
    }
});
