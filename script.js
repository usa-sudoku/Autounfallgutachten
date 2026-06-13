/* ==========================================================================
1. MENÜ-STEUERUNG (SIDE-MENU & HAMBURGER) - Für alle Seiten
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
2. AKKORDEON-STEUERUNG & DYNAMISCHE STICKY-BUTTONS
========================================================================== */
const accButtons = document.querySelectorAll('.acc-header-btn');
const stickyNotruf = document.getElementById('sticky-notruf');
const stickyGutachter = document.getElementById('sticky-gutachter');

accButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const panel = this.nextElementSibling;
        const icon = this.querySelector('.acc-icon');
        const dataType = this.getAttribute('data-type');
        
        // Prüfen, ob das aktuell angeklickte Panel bereits offen ist
        const isAlreadyOpen = panel.style.display === "block";

        // 1. ZUERST ALLE PANELS SCHLIESSEN & ALLE BUTTONS AUSBLENDEN (One-Accordion-Logik)
        accButtons.forEach(otherBtn => {
            const otherPanel = otherBtn.nextElementSibling;
            const otherIcon = otherBtn.querySelector('.acc-icon');
            if (otherPanel) otherPanel.style.display = "none";
            if (otherIcon) otherIcon.textContent = "+";
        });
        
        if (stickyNotruf) stickyNotruf.classList.remove('active');
        if (stickyGutachter) stickyGutachter.classList.remove('active');

        // 2. WENN ES NICHT SCHON OFFEN WAR, JETZT DAS ANGEKLICKTE ÖFFNEN
        if (!isAlreadyOpen) {
            panel.style.display = "block";
            if (icon) icon.textContent = "−";

            // 3. JE NACH BEREICH DEN PASSENDEN STICKY-BUTTON EINBLENDEN
            if (dataType === 'erste-hilfe' && stickyNotruf) {
                stickyNotruf.classList.add('active');
            } else if (dataType === 'gutachter' && stickyGutachter) {
                stickyGutachter.classList.add('active');
            }
        }
        // Wenn es bereits offen war, bleibt es jetzt geschlossen -> Der Nutzer sieht wieder die reine Übersicht!
    });
});
