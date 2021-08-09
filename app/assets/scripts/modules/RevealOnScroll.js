

import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';


class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.hideInitially();
        this.scrollThrottle = throttle(this.runOnScroll, 200).bind(this);
        this.events();
        this.browserHeight = window.innerHeight;
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item');
            el.isRevealed = false;
        });

        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight;
        }, 333))
    }

    runOnScroll() {
        this.itemsToReveal.forEach(el => {
            
            if (el.isRevealed == false) {
                this.calculatePosition(el);
            }
        })
    }

    calculatePosition(el) {

        if (window.scrollY + this.browserHeight > el.offsetTop) {

            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;

            if (scrollPercent < this.thresholdPercent) {
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;

                if (el.isLastItem) {
                    window.removeEventListener('scroll', this.scrollThrottle);
                }
            }
        }
        
    }
}


export default RevealOnScroll;