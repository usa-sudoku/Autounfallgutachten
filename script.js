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
   2. CANDY-LACK EFFECT (MESSERSCHARFE ECKEN-BRECHUNG NACH LOGO-VORBILD)
   ========================================================================== */
const footer = document.querySelector('footer');

if (footer) {
    let isFooterVisible = false;

    // Performance-Schutzschild: Rechnet nur, wenn der Footer im Bild ist (Perfekt für Google)
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
        let borderRadius = '50%'; // Kreisrund im Zentrum

        // --- DIE LOGO-ECKEN-TRANSFORMATION (HART UND RECHTWINKLIG) ---
        // Sobald wir uns einer der vier Ecken nähern (Schwelle bei 0.35), 
        // vernichten wir die Rundung komplett, damit kein runder "Pfannkuchen" entsteht.
        if (intensityX > 0.35 && intensityY > 0.35) {
            // Das Licht wird vergrößert, damit der Clip-Path genug Futter zum Schneiden hat
            glowWidth = 240;
            glowHeight = 240;
            
            // DIE RETTUNG: Radius eiskalt auf Null! Das Licht wird physikalisch absolut eckig.
            borderRadius = '0%'; 
        } else {
            // Normale Kanten-Stauchung (Flachwalzen zu messerscharfen Lichtlinien an den Seiten)
            if (intensityY > intensityX) {
                glowWidth += intensityY * 580;  // Breite explodiert parallel zur Kante
                glowHeight -= intensityY * 85;  // Höhe presst sich flach (bis zu 25px)
            } else if (intensityX > intensityY) {
                glowHeight += intensityX * 320; // Zieht sich vertikal lang
                glowWidth -= intensityX * 85;   // Schrumpft auf hauchdünne Linie zusammen
            }
            // Im reinen Kantenbetrieb bleibt das Licht an den Enden geschmeidig abgerundet
            borderRadius = '50%'; 
        }

        // --- ERMITTLUNG DER QUADRANTEN (Für den perfekten Ecken-Schnitt) ---
        // Das CSS muss wissen, in welches Eck-Dreieck das Licht gepresst werden soll.
        const quadX = relX > 0.5 ? 100 : 0;
        const quadY = relY > 0.5 ? 100 : 0;

        // --- ÜBERGABE DER GEOMETRIE-WERTE AN DAS CSS ---
        footer.style.setProperty('--glow-x', xPercent + '%');
        footer.style.setProperty('--glow-y', yPercent + '%');
        footer.style.setProperty('--glow-width', glowWidth + 'px');
        footer.style.setProperty('--glow-height', glowHeight + 'px');
        footer.style.setProperty('--glow-radius', borderRadius);
        
        // Richtungs-Variablen für das eckige Abschneiden im CSS via clip-path
        footer.style.setProperty('--quad-x', quadX + '%');
        footer.style.setProperty('--quad-y', quadY + '%');
        
        // Ecken-Intensität mischen (0 = rund im Zentrum, 1 = knallharte Lichtecke)
        footer.style.setProperty('--corner-mix', (intensityX * intensityY));
    }

    // Event-Listener registrieren
    window.addEventListener('mousemove', handleLackReflektion);
    window.addEventListener('touchmove', handleLackReflektion, { passive: true });
}
