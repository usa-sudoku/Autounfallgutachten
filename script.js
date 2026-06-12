/* ==========================================================================
   1. MENÜ-STEUERUNG (SIDE-MENU & HAMBURGER)
   ========================================================================== */
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

if (menuIcon && sideMenu) {
    menuIcon.addEventListener('click', () => {
        if (sideMenu.style.right === '0px') {
            sideMenu.style.right = '-250px';
        } else {
            sideMenu.style.right = '0px';
        }
    });

    // Schließt das Menü, wenn man außerhalb klickt
    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
            sideMenu.style.right = '-250px';
        }
    });
}


/* ==========================================================================
   2. REPARIERTER LACKEFFEKT (FLÜSSIGER GLANZ-REFLEX FÜR DEN FOOTER)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Performance-Optimierung: Berechnet den Effekt nur, wenn der Footer im Bild ist
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
        });
    }, { threshold: 0.05 });

    observer.observe(footer);

    function handleLackReflektion(e) {
        if (!isFooterVisible) return; // Schont den Akku auf Mobilgeräten

        const rect = footer.getBoundingClientRect();
        
        // Finger- oder Maus-Koordinaten abfangen
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Position des Lichtpunkts in Prozent (0% bis 100%)
        const xPercent = ((clientX - rect.left) / rect.width) * 100;
        const yPercent = ((clientY - rect.top) / rect.height) * 100;

        // Berechnung für die organische Streckung zu den Außenrändern hin
        const footerCenter = rect.left + (rect.width / 2);
        const distanceFromCenter = clientX - footerCenter; 
        const maxPossibleDistance = rect.width / 2;
        const relativeDistance = Math.min(Math.abs(distanceFromCenter) / maxPossibleDistance, 1);

        // Die Lichtbreite verändert sich jetzt geschmeidig von 300px (Mitte) bis 600px (Rand)
        const currentGlowWidth = 300 + (relativeDistance * 300);

        // Werte live an die CSS-Variablen übergeben
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', currentGlowWidth + 'px');
    }

    // Events für Desktop (Maus) und Mobile (Touch) registrieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
