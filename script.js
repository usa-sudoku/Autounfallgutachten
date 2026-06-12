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
   2. REPARIERTER LACKEFFEKT (DYNAMISCHE STRECKUNG & STAUCHUNG IN X + Y)
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

        // --- HORIZONTALE BERECHNUNG (Links nach Rechts) ---
        const footerCenterX = rect.left + (rect.width / 2);
        const distanceX = clientX - footerCenterX; 
        const maxDistanceX = rect.width / 2;
        const relativeDistanceX = Math.min(Math.abs(distanceX) / maxDistanceX, 1);

        // --- VERTIKALE BERECHNUNG (Oben nach Unten) ---
        const footerCenterY = rect.top + (rect.height / 2);
        const distanceY = clientY - footerCenterY;
        const maxDistanceY = rect.height / 2;
        const relativeDistanceY = Math.min(Math.abs(distanceY) / maxDistanceY, 1);

        // --- DYNAMISCHE STRECKUNG & STAUCHUNG ---
        // Breite: Wird breiter an den Rändern links/rechts (+300px) UND breiter am oberen Rand (+100px)
        const currentGlowWidth = 300 + (relativeDistanceX * 300) + (yPercent < 50 ? (1 - yPercent / 50) * 100 : 0);
        
        // Höhe: Staucht sich in der vertikalen Mitte (ca. 140px) und streckt sich am oberen/unteren Rand (bis zu 280px)
        const currentGlowHeight = 140 + (relativeDistanceY * 140);

        // Werte live an die CSS-Variablen übergeben
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', currentGlowWidth + 'px');
        footer.style.setProperty('--glow-height', currentGlowHeight + 'px');
    }

    // Events für Desktop (Maus) und Mobile (Touch) registrieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
