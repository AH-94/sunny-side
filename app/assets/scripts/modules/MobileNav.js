
class MobileNav {
    constructor() {
        this.hamburgerIcon = document.querySelector('.site-header__hamburger');
        this.menuContent = document.querySelector('.site-header__menu-content');
        this.events();
    }

    events() {
        this.hamburgerIcon.addEventListener('click', () => this.toggleMenu());
        document.addEventListener('keyup', e => this.closeMenu(e));
    }

    toggleMenu() {
        this.menuContent.classList.toggle('site-header__menu-content--visible');
        this.hamburgerIcon.classList.toggle('site-header__hamburger--close-x');
    }

    closeMenu(e) {
        if (e.keyCode == 27) {
            this.menuContent.classList.remove('site-header__menu-content--visible');
            this.hamburgerIcon.classList.remove('site-header__hamburger--close-x');
        }
        }
}


export default MobileNav;