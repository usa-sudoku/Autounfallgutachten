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
   2. CANDY-LACK EFFECT (ADAPTIVE KANTEN-SCHMIEGUNG & VERZERRUNG)
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
        
        // Koordinaten für Maus oder Touch abfangen
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Position des Fingers relativ im Footer (0 bis 1)
        const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const relY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

        // Umrechnung in Prozent für die CSS-Position
        const xPercent = relX * 100;
        const yPercent = relY * 100;

        // --- MATHEMATISCHER ABSTAND ZU DEN RAND-BIEGUNGEN ---
        // Berechnet, wie nah wir am linken/rechten Rand (X) und oberen/unteren Rand (Y) sind.
        // Wert ist 0 in der Mitte und geht hoch gegen 1, je näher man der Kante kommt.
        const edgeFactorX = Math.abs(relX - 0.5) * 2; 
        const edgeFactorY = Math.abs(relY - 0.5) * 2; 

        // --- DER SPÄTE EFFEKT-EINSTIEG (SCHALEN-LOGIK) ---
        // Erst ab 70% des Weges zum Rand hin (0.7) reagiert das Licht und verformt sich steil.
        const threshold = 0.7;
        const intensityX = edgeFactorX > threshold ? (edgeFactorX - threshold) / (1 - threshold) : 0;
        const intensityY = edgeFactorY > threshold ? (edgeFactorY - threshold) / (1 - threshold) : 0;

        // --- DYNAMISCHE STRÄNKUNG & STAUCHUNG BERECHNEN ---
        // Basisgröße im flachen Zentrum: 140px mal 140px (Runder Studiopunkt)
        let glowWidth = 140;
        let glowHeight = 140;
        let rotation = 0;

        // Wenn wir uns der Ober- oder Unterkante nähern -> Licht extrem in die Breite ziehen
        if (intensityY > 0) {
            glowWidth += intensityY * 510;    // Zieht sich bis zu 650px in die Breite
            glowHeight -= intensityY * 60;    // Staucht sich flach auf 80px zusammen
        }

        // Wenn wir uns den Seitenwänden nähern -> Licht extrem in die Höhe ziehen
        if (intensityX > 0) {
            glowHeight += intensityX * 260;   // Zieht sich bis zu 400px in die Höhe
            glowWidth -= intensityX * 60;     // Staucht sich schmal auf 80px zusammen
        }

        // --- ECK-KOLLISION & ROTATION ---
        // Wenn sich X- und Y-Verzerrung in den Ecken treffen, lassen wir den Lichtblitz 
        // elegant mit dem Winkel der Schalen-Ecke rotieren (Tangenten-Illusion).
        if (intensityX > 0 && intensityY > 0) {
            const angleX = relX > 0.5 ? 1 : -1;
            const angleY = relY > 0.5 ? 1 : -1;
            // Rotiert den Lichtfleck in den Ecken um ca. 45 Grad mit
            rotation = angleX * angleY * (intensityX * intensityY) * 45;
        }

        // --- ÜBERGABE AN DAS CSS ---
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', glowWidth + 'px');
        footer.style.setProperty('--glow-height', glowHeight + 'px');
        footer.style.setProperty('transform', `translate(-50%, -50%) rotate(${rotation}deg)`);
    }

    // Event-Listener aktivieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
