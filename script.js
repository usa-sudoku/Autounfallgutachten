document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. HAMBURGER-MENÜ (FÜR DIE UNTERSEITEN)
       ========================================================================== */
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');

    if (menuIcon && sideMenu) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('active');
            sideMenu.classList.toggle('active');
        });

        // Schließt das Menü, wenn man außerhalb klickt
        document.addEventListener('click', (event) => {
            if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
                menuIcon.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       2. AKKORDEON-STEUERUNG (STARTSEITE & SEO)
       ========================================================================== */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            
            // Falls das geklickte Item schon aktiv ist -> Schließen
            if (currentItem.classList.contains('active')) {
                currentItem.classList.remove('active');
                content.style.maxHeight = null;
                // Plus-Zeichen zurückdrehen
                this.querySelector('span').textContent = '+';
            } 
            // Falls es geschlossen ist -> Öffnen
            else {
                // HINWEIS: Wenn du möchtest, dass sich andere Akkordeons automatisch 
                // schließen, wenn ein neues geöffnet wird, entferne einfach die '//' vor den nächsten 4 Zeilen:
                // document.querySelectorAll('.accordion-item').forEach(item => {
                //     item.classList.remove('active');
                //     item.querySelector('.accordion-content').style.maxHeight = null;
                //     item.querySelector('.accordion-trigger span').textContent = '+';
                // });

                currentItem.classList.add('active');
                // Berechnet die exakte Höhe des Inhalts für eine seidenweiche Animation
                content.style.maxHeight = content.scrollHeight + "px";
                // Macht das Plus zum 'x' (wird im CSS rot eingefärbt)
                this.querySelector('span').textContent = '+'; 
            }
        });
    });

});
