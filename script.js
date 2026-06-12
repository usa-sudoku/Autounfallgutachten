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

        document.addEventListener('click', (event) => {
            if (!sideMenu.contains(event.target) && !menuIcon.contains(event.target)) {
                menuIcon.classList.remove('active');
                sideMenu.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       2. KORRIGIERTE AKKORDEON-STEUERUNG
       ========================================================================== */
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            
            // Wir prüfen NUR noch, ob die Klasse 'active' gesetzt ist
            if (currentItem.classList.contains('active')) {
                currentItem.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});
