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
2. AKKORDEON-STEUERUNG & DYNAMISCHE FLOATING BUTTONS (Geprüfte Logik)
========================================================================== */
const accButtons = document.querySelectorAll('.acc-header-btn');
const floatingNotruf = document.getElementById('floating-notruf');
const floatingGutachterGroup = document.getElementById('floating-gutachter-group');

accButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const panel = this.nextElementSibling;
        const icon = this.querySelector('.acc-icon');
        const dataType = this.getAttribute('data-type');
        
        // Prüfen, ob das angeklickte Panel bereits offen ist
        const isAlreadyOpen = panel && panel.style.display === "block";

        // 1. SCHRITT: Erstmal ALLE Panels schließen und alle Icons auf "+" zurücksetzen
        accButtons.forEach(otherBtn => {
            const otherPanel = otherBtn.nextElementSibling;
            const otherIcon = otherBtn.querySelector('.acc-icon');
            if (otherPanel) {
                otherPanel.style.display = "none";
            }
            if (otherIcon) {
                otherIcon.textContent = "+";
            }
        });
        
        // 2. SCHRITT: Beide Floating-Button-Gruppen komplett ausblenden (Klasse entfernen)
        if (floatingNotruf) {
            floatingNotruf.classList.remove('active');
        }
        if (floatingGutachterGroup) {
            floatingGutachterGroup.classList.remove('active');
        }

        // 3. SCHRITT: Wenn das Panel vorher ZU war, öffnen wir es jetzt und zeigen die passenden Buttons
        if (!isAlreadyOpen && panel) {
            panel.style.display = "block";
            if (icon) {
                icon.textContent = "−"; // Ändert das Icon zu einem echten Minuszeichen
            }

            // Aktivierung anhand des data-type Attributs des Buttons
            if (dataType === 'erste-hilfe' && floatingNotruf) {
                floatingNotruf.classList.add('active');
            } else if (dataType === 'gutachten' && floatingGutachterGroup) { 
                // KORREKTUR: 'gutachten' statt 'gutachter', passend zur index.html!
                floatingGutachterGroup.classList.add('active');
            }
        }
    });
});
