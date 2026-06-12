/* ==========================================================================
1. MENÜ-STEUERUNG (SIDE-MENU & HAMBURGER) - Für alle Seiten
========================================================================== */
const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

if (menuIcon && sideMenu) {
    // Öffnen und Schließen bei Klick auf das Hamburger-Icon
    menuIcon.addEventListener('click', () => {
        if (sideMenu.style.right === '0px') {
            sideMenu.style.right = '-250px';
        } else {
            sideMenu.style.right = '0px';
        }
    });

    // Schließen des Menüs, wenn man irgendwo außerhalb hinklickt
    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
            sideMenu.style.right = '-250px';
        }
    });
}

/* ==========================================================================
2. AKKORDEON-STEUERUNG - Speziell für die Startseite
========================================================================== */
// Findet alle Akkordeon-Buttons in deiner index.html
const accButtons = document.querySelectorAll('.acc-header-btn');

accButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const panel = this.nextElementSibling;
        const icon = this.querySelector('.acc-icon');
        
        // Prüfen, ob das Panel gerade sichtbar (block) oder unsichtbar (none) ist
        if (panel.style.display === "block") {
            panel.style.display = "none";
            if (icon) icon.textContent = "+";
        } else {
            panel.style.display = "block";
            if (icon) icon.textContent = "−";
        }
    });
});
