
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
   2. REPARIERTER MULDEN-LACKEFFEKT (BERECHNUNG ZUR FOOTER-MITTE)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Der Performance-Türsteher: Trackt nur, wenn der Footer sichtbar ist
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
        });
    }, { threshold: 0.05 });

    observer.observe(footer);

    function handleLackReflektion(e) {
        if (!isFooterVisible) return; // Akku-Schonung

        const rect = footer.getBoundingClientRect();
        
        // Finger- oder Maus-Koordinaten holen
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // 1. Position des Lichts im Footer berechnen (0% bis 100%) für top/left
        const xPercent = ((clientX - rect.left) / rect.width) * 100;
        const yPercent = ((clientY - rect.top) / rect.height) * 100;

        // 2. KORREKTUR: Mathematische Verzerrung relativ zur FOOTER-MITTE
        const footerCenter = rect.left + (rect.width / 2); // Der exakte Mittelpunkt des Footers
        const distanceFromCenter = clientX - footerCenter; // Abstand in Pixeln (negativ oder positiv)
        
        // Wir wandeln den Pixel-Abstand in einen relativen Wert zwischen 0 (Mitte) und 1 (ganz am Rand) um
        const maxPossibleDistance = rect.width / 2;
        const relativeDistance = Math.min(Math.abs(distanceFromCenter) / maxPossibleDistance, 1);

        // Lichtbreite steuern: In der Footer-Mitte schmal (220px), an den Footer-Rändern breit gestreckt (580px)
        const currentGlowWidth = 220 + (relativeDistance * 360);

        // Werte live an das CSS übergeben
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', currentGlowWidth + 'px');
    }

    // Lauscht auf dem gesamten Fenster für flüssige Annäherung
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}

