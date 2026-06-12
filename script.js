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

        // Schließt das Menü automatisch, wenn man irgendwo außerhalb klickt
        document.addEventListener('click', (event) => {
            if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
                menuIcon.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       2. AKKORDEON-STEUERUNG (STARTSEITE & SEO-BOX)
       ========================================================================== */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const icon = this.querySelector('span');
            
            // Falls das angeklickte Akkordeon bereits offen ist -> Schließen
            if (currentItem.classList.contains('active')) {
                currentItem.classList.remove('active');
                content.style.maxHeight = null;
                if (icon) icon.textContent = '+';
            } 
            // Falls es geschlossen ist -> Öffnen
            else {
                // HINWEIS: Wenn du möchtest, dass sich andere offene Akkordeons automatisch 
                // schließen, sobald man ein neues öffnet, entferne einfach die '//' vor den nächsten 5 Zeilen:
                // document.querySelectorAll('.accordion-item').forEach(item => {
                //     item.classList.remove('active');
                //     item.querySelector('.accordion-content').style.maxHeight = null;
                //     if (item.querySelector('.accordion-trigger span')) item.querySelector('.accordion-trigger span').textContent = '+';
                // });

                currentItem.classList.add('active');
                // Berechnet die exakte Höhe des Inhalts dynamisch für eine flüssige CSS-Animation
                content.style.maxHeight = content.scrollHeight + "px";
                // Macht aus dem Plus ein Minus (das CSS dreht es zusätzlich und färbt es rot)
                if (icon) icon.textContent = '-';
            }
        });
    });

});
