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

    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
            sideMenu.style.right = '-250px';
        }
    });
}


/* ==========================================================================
   2. CANDY-LACK EFFECT (BRUTALE KANTEN-KOMPESSION NACH LOGO-VORBILD)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Performance-Optimierung via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
        });
    }, { threshold: 0.01 });

    observer.observe(footer);

    function handleLackReflektion(e) {
        if (!isFooterVisible) return; 

        const rect = footer.getBoundingClientRect();
        
        // Maus- oder Touch-Koordinaten abfangen
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Relative Position (0 bis 1)
        const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const relY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

        // Prozentuale Werte für das CSS
        const xPercent = relX * 100;
        const yPercent = relY * 100;

        // --- DIE ABSTANDS-PHYSIK (0 in der Mitte, 1 direkt an der Kante) ---
        const edgeFactorX = Math.abs(relX - 0.5) * 2; 
        const edgeFactorY = Math.abs(relY - 0.5) * 2; 

        // --- EXPONENTIELLE EFFEKT-KURVE (Für den plötzlichen Kanten-Knick) ---
        // Durch Math.pow(..., 3) reagiert das Licht im Zentrum fast gar nicht (bleibt rund)
        // und schießt erst in den letzten Millimetern vor dem Rand extrem steil ab.
        const intensityX = Math.pow(edgeFactorX, 3);
        const intensityY = Math.pow(edgeFactorY, 3);

        // --- LACK-GEOMETRIE: BASIS-ZUSTAND (Runder Studio-Blitz wie Pfeffermühlen-Kopf) ---
        // Im Zentrum klein, kompakt und extrem intensiv fokussiert
        let glowWidth = 90;
        let glowHeight = 90;
        let rotation = 0;

        // --- DIE LOGO-TRANSFORMATION (Radikale Stauchung zu Licht-Sicheln) ---
        
        // Annäherung an Ober- oder Unterkante (Horizontale Lichtlinie)
        if (intensityY > 0) {
            glowWidth += intensityY * 650;     // Breite explodiert auf bis zu 740px
            glowHeight -= intensityY * 72;     // HÖHE STAUCHT SICH RADIKAL AUF 18px RUNTER!
        }

        // Annäherung an die Seitenwände (Vertikale Lichtlinie)
        if (intensityX > 0) {
            glowHeight += intensityX * 350;    // Höhe zieht sich extrem lang
            glowWidth -= intensityX * 72;      // BREITE SCHRUMPFT AUF HAUCHDÜNNE 18px ZUSAMMEN!
        }

        // --- ECKTANGENTEN-ILLUSION (Perfekte Kurvenschmiegung) ---
        if (intensityX > 0 && intensityY > 0) {
            const angleX = relX > 0.5 ? 1 : -1;
            const angleY = relY > 0.5 ? 1 : -1;
            // Rotiert den hauchdünnen Lichtblitz exakt mit dem mathematischen Winkel der Schalen-Ecke
            rotation = angleX * angleY * (intensityX * intensityY) * 45;
        }

        // --- ÜBERGABE AN CSS-VARIABLEN ---
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', glowWidth + 'px');
        footer.style.setProperty('--glow-height', glowHeight + 'px');
        footer.style.setProperty('--glow-rotate', rotation + 'deg'); 
    }

    // Event-Listener aktivieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
