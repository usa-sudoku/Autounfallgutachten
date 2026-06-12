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
   2. CANDY-LACK EFFECT (GEOMETRISCHE ECKEN-BRECHUNG & SICHEL-SCHNITT)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Performance-Schutzschild: Rechnet nur, wenn der Footer sichtbar ist
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterVisible = entry.isIntersecting;
        });
    }, { threshold: 0.01 });

    observer.observe(footer);

    function handleLackReflektion(e) {
        if (!isFooterVisible) return; 

        const rect = footer.getBoundingClientRect();
        
        // Touch- oder Maus-Koordinaten auslesen
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Relative Position im Footer (0 bis 1)
        const relX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const relY = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

        // Prozentuale Position für das CSS
        const xPercent = relX * 100;
        const yPercent = relY * 100;

        // --- HARDWARE-PHYSIK: ABSTAND ZU DEN RANDLINIEN (0 bis 1) ---
        const edgeFactorX = Math.abs(relX - 0.5) * 2; 
        const edgeFactorY = Math.abs(relY - 0.5) * 2; 

        // Exponentieller Knick: Licht bleibt im Zentrum ruhig, bricht an Kanten extrem aus
        const intensityX = Math.pow(edgeFactorX, 4);
        const intensityY = Math.pow(edgeFactorY, 4);

        // --- BASIS-GEOMETRIE IM FLACHEN ZENTRUM (Der scharfe Studio-Kern) ---
        let glowWidth = 110;
        let glowHeight = 110;
        
        // Corner-Radius: Startet bei 50% (absolut kreisrund im Zentrum)
        let borderRadius = 50; 

        // --- DIE LOGO-ECKEN-TRANSFORMATION ---
        // Wenn sich die Intensitäten in den Ecken kreuzen, ziehen wir das Licht
        // zu einem rechtwinkligen Keil zusammen, statt es als Kreis verpuffen zu lassen.
        
        if (intensityX > 0.4 && intensityY > 0.4) {
            // EXTREM-ECKE: Der Lichtblitz kollidiert mit der eckigen Schale
            glowWidth = 240;
            glowHeight = 240;
            
            // Radiale Rundung wird vernichtet! Das Licht wird physikalisch eckig.
            borderRadius = Math.max(0, 50 - (intensityX * intensityY * 50)); 
        } else {
            // Normale Kanten-Stauchung (Flachwalzen zu messerscharfen Lichtlinien)
            if (intensityY > intensityX) {
                glowWidth += intensityY * 580;  // Explodiert in der Breite
                glowHeight -= intensityY * 85;  // Presst sich extrem flach (bis zu 25px)
            } else if (intensityX > intensityY) {
                glowHeight += intensityX * 320; // Zieht sich extrem in die Länge
                glowWidth -= intensityX * 85;   // Schrumpft zu einem schmalen Strich zusammen
            }
        }

        // --- ERMITTLUNG DER AKTUELLEN QUANDRANTEN (Für den perfekten Ecken-Schnitt) ---
        // Das CSS muss wissen, in welche Richtung die Lichtecke zeigen soll.
        const quadX = relX > 0.5 ? 100 : 0;
        const quadY = relY > 0.5 ? 100 : 0;

        // --- ÜBERGABE DER GEOMETRIE-WERTE AN DAS CSS ---
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', glowWidth + 'px');
        footer.style.setProperty('--glow-height', glowHeight + 'px');
        footer.style.setProperty('--glow-radius', borderRadius + '%');
        
        // Richtungs-Variablen für das eckige Abschneiden im CSS
        footer.style.setProperty('--quad-x', quadX + '%');
        footer.style.setProperty('--quad-y', quadY + '%');
        
        // Ecken-Intensität mischen (0 = rund im Zentrum, 1 = knallharte Lichtecke)
        footer.style.setProperty('--corner-mix', (intensityX * intensityY));
    }

    // Event-Listener registrieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
