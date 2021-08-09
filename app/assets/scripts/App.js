import '../styles/styles.css';
import MobileNav from './modules/MobileNav';
import RevealOnScroll from './modules/RevealOnScroll';

new MobileNav();

new RevealOnScroll(document.querySelectorAll('.testimonial'), 75, 'reveal-item');
new RevealOnScroll(document.querySelectorAll('.services__inner'), 65, 'reveal-item');
new RevealOnScroll(document.querySelectorAll('.services__overlay-content'), 75, 'reveal-item');
new RevealOnScroll(document.querySelectorAll('.gallery__image'), 65, 'scale-in-item');


if (module.hot) {
    module.hot.accept();
}