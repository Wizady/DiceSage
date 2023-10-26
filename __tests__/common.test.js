const toggleMenu = require('../common.js');
document.body.innerHTML = `<div id="menuItems" style="display: none;"></div>`;

describe('toggleMenu', () => {
    test('should display menu if it is hidden', () => {
        // GIVEN
        const menu = document.getElementById('menuItems');
        menu.style.display = 'none';

        // WHEN
        toggleMenu();

        // THEN
        expect(menu.style.display).toBe('block');
    });

    test('should hide menu if it is displayed', () => {
        // GIVEN
        const menu = document.getElementById('menuItems');
        menu.style.display = 'block';

        // WHEN
        toggleMenu();

        // THEN
        expect(menu.style.display).toBe('none');
    });
});