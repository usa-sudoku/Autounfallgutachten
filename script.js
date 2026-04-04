const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

menuIcon.addEventListener('click', () => {
    if (sideMenu.style.right === '0px') {
        sideMenu.style.right = '-250px';
    } else {
        sideMenu.style.right = '0px';
    }
});

// Schließt das Menü beim Klick außerhalb
document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
        sideMenu.style.right = '-250px';
    }
});
