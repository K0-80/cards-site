document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const body = document.body;

    if (!cardContainer || cards.length === 0) {
        return;
    }

    // --- Dynamic Hover Effects ---
    const BASE_PUSH_ANGLE = 20; // deg
    const BASE_PUSH_Y = 50;     // px

    function applyHoverEffects(hoveredIndex) {
        cards.forEach((otherCard, otherIndex) => {
            let pushAngle = 0;
            let pushY = 0;
            
            if (otherIndex === hoveredIndex) {
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
    }

    function resetHoverEffects() {
        cards.forEach(c => {
            c.style.removeProperty('--push-angle');
            c.style.removeProperty('--push-y');
        });
    }

    // --- Event Listeners & Animation Handling ---
    cards.forEach((card, cardIndex) => {
        card.addEventListener('mouseenter', () => {
            if (body.classList.contains('is-animating')) return;
            applyHoverEffects(cardIndex);
        });

        card.addEventListener('mouseleave', () => {
            resetHoverEffects();
        });

        card.addEventListener('mousedown', () => {
            if (body.classList.contains('is-animating')) return;

            if (cardIndex === 1) { // About card
                window.location.href = 'about.html';
            } else if (cardIndex === 2) { // Home card
                window.location.href = 'index.html';
            }
        });
    });


    setTimeout(() => {
        body.classList.remove('is-animating');
        const currentlyHovered = document.querySelector('.card:hover');
        if (currentlyHovered) {
            const hoveredIndex = Array.from(cards).indexOf(currentlyHovered);
            if (hoveredIndex !== -1) {
                applyHoverEffects(hoveredIndex);
            }
        }
    }, 1200);
});
