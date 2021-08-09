import '../styles/styles.css';
import MobileNav from './modules/MobileNav';
import RevealOnScroll from './modules/RevealOnScroll';

new MobileNav();

new RevealOnScroll(document.querySelectorAll('.testimonial'), 75);
new RevealOnScroll(document.querySelectorAll('.services__inner'), 75);
new RevealOnScroll(document.querySelectorAll('.services__overlay-content'), 75);


if (module.hot) {
    module.hot.accept();
}