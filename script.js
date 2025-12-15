document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const body = document.body;

    if (!cardContainer || cards.length === 0) {
        return;
    }

    // --- Disabling Hover Effects During Initial Animation ---
    // The longest animation is 0.67s duration + 0.5s delay = 1.17s
    // We'll remove the class after 1200ms (1.2s) to be safe.
    setTimeout(() => {
        body.classList.remove('is-animating');
    }, 1200);


    // --- Dynamic Hover Effects ---
    const BASE_PUSH_ANGLE = 15; // deg
    const BASE_PUSH_Y = 100;     // px

    cards.forEach((card, hoveredIndex) => {
        card.addEventListener('mouseenter', () => {
            // Do not apply hover effects if the initial animation is still running
            if (body.classList.contains('is-animating')) {
                return;
            }

            cards.forEach((otherCard, otherIndex) => {
                let pushAngle = 0;
                let pushY = 0;
                
                if (otherIndex === hoveredIndex) {
                    // The card being hovered should not be pushed
                    pushAngle = 0;
                    pushY = 0;
                } else {
                    const distance = Math.abs(hoveredIndex - otherIndex);
                    const effectiveDistance = Math.max(1, distance); 
                    
                    pushAngle = (BASE_PUSH_ANGLE / effectiveDistance) * (otherIndex < hoveredIndex ? -1 : 1);
                    pushY = (BASE_PUSH_Y / effectiveDistance);
                }
                otherCard.style.setProperty('--push-angle', `${pushAngle}deg`);
                otherCard.style.setProperty('--push-y', `${pushY}px`);
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset all cards' push properties when leaving any card
            cards.forEach(c => {
                c.style.removeProperty('--push-angle');
                c.style.removeProperty('--push-y');
            });
        });
    });
});
