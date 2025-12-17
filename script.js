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

    function wobbleCard(card) {
        const wobbleAmount = [6, -5, 3, -2, 1, 0];
        const wobbleDuration = 100; 

        wobbleAmount.forEach((amount, index) => {
            setTimeout(() => {
                card.style.setProperty('--wobble-rotate', `${amount}deg`);
            }, index * wobbleDuration);
        });
    }

    // --- Event Listeners & Animation Handling ---
    cards.forEach((card, cardIndex) => {
        card.addEventListener('mouseenter', () => {
            if (body.classList.contains('is-animating')) return;
            applyHoverEffects(cardIndex);
        });

        // Combined mouseleave event
        card.addEventListener('mouseleave', () => {
            resetHoverEffects();
            card.classList.remove('card--pressed');
        });

        // Add mousedown and mouseup listeners for shrink effect
        card.addEventListener('mousedown', () => {
            if (body.classList.contains('is-animating')) return;

            // Check if this click will cause a wobble. If so, don't apply the press effect.
            const page = card.dataset.page;
            if (page) {
                const path = `#${page}`;
                if (window.location.hash === path) {
                    return; // This will be a wobble, so we skip the press-down.
                }
            }
            card.classList.add('card--pressed');
        });

        card.addEventListener('mouseup', () => {
            card.classList.remove('card--pressed');
        });

        card.addEventListener('click', (e) => {
            if (body.classList.contains('is-animating')) return;

            const page = card.dataset.page;
            if (page) {
                e.preventDefault();
                const path = `#${page}`;
                if (window.location.hash !== path) {
                    history.pushState({ page }, '', path);
                    loadPage(page);
                } else {
                    wobbleCard(card);
                }
            }
        });
    });

    // --- SPA Routing Logic ---
    const pageContent = document.getElementById('page-content');

    async function loadPage(page) {
        if (!page) return;
        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                pageContent.innerHTML = `<p>Error: Could not load page. Status: ${response.status}</p>`;
                return;
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
                pageContent.innerHTML = doc.body.innerHTML;
                // Re-run scripts if any, though it's better to have global scripts
                const scripts = doc.body.querySelectorAll('script');
                scripts.forEach(s => {
                    const newScript = document.createElement('script');
                    if (s.src) {
                        newScript.src = s.src;
                    } else {
                        newScript.textContent = s.textContent;
                    }
                    document.body.appendChild(newScript).parentNode.removeChild(newScript);
                });
                pageContent.style.opacity = 1;


        } catch (error) {
            console.error('Failed to load page:', error);
            pageContent.innerHTML = '<p>An error occurred while loading the content.</p>';
        }
    }
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || window.location.hash.substring(1) || 'home';
        loadPage(page);
    });

    // Handle initial page load
    function initialLoad() {
        const initialPage = window.location.hash.substring(1) || 'home';
        loadPage(initialPage);
        // Ensure the correct state is in history
        history.replaceState({ page: initialPage }, '', `#${initialPage}`);
    }

    // --- Animation Handling ---
    setTimeout(() => {
        body.classList.remove('is-animating');
        const currentlyHovered = document.querySelector('.card:hover');
        if (currentlyHovered) {
            const hoveredIndex = Array.from(cards).indexOf(currentlyHovered);
            if (hoveredIndex !== -1) {
                applyHoverEffects(hoveredIndex);
            }
        }
        initialLoad(); // Load content after intro animation
    }, 1200);
});
