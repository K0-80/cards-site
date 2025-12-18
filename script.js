document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const body = document.body;

    if (!cardContainer || cards.length === 0) {
        return;
    }

    // hover effects-

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
                
                pushAngle = (20 / effectiveDistance) * (otherIndex < hoveredIndex ? -1 : 1);
                pushY = (50 / effectiveDistance);
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

    // animation and interactions
    cards.forEach((card, cardIndex) => {
        card.addEventListener('mouseenter', () => {
            if (body.classList.contains('is-animating')) return;
            applyHoverEffects(cardIndex);
        });

        card.addEventListener('mouseleave', () => {
            resetHoverEffects();
            card.classList.remove('card--pressed');
        });

        card.addEventListener('mousedown', () => {
            if (body.classList.contains('is-animating')) return;

            const page = card.dataset.page;
            if (page) {
                const path = `#${page}`;
                if (window.location.hash === path) {
                    return; 
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

    // routing & page loading
    const pageContent = document.getElementById('page-content');

    async function loadPage(page) {
        if (!page) return;
        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                pageContent.innerHTML = `<p>Coudnt load page, status: ${response.status}</p>`;
                return;
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
                pageContent.innerHTML = doc.body.innerHTML;
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


        } catch (error) {
            console.error('Failed to load page:', error);
            pageContent.innerHTML = '<p>mmmm... seems like something broke :/</p>';
        }
    }

    function initialLoad() {
        const initialPage = window.location.hash.substring(1) || 'home';
        loadPage(initialPage);
    }

    // animations
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
    initialLoad(); 

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function renderStars() {
        const container = document.getElementById('star-background');
        if (!container) return;
        
        container.innerHTML = '';

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const config = {
            starCount: 100,
            minOpacity: 0,
            maxOpacity: 0.6,
            maxGlow: 5,
            baseScale: 1.2,
        };

        const starSprites = [
            '0px 0px',    
            '-16px 0px', 
            '0px -16px',  
            '-16px -16px'
        ];
        
        const scale = config.baseScale / (window.devicePixelRatio || 1);

        for (let i = 0; i < config.starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const x = Math.round(Math.random() * containerWidth);
            const y = Math.round(Math.random() * containerHeight);
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            const randomSprite = starSprites[Math.floor(Math.random() * starSprites.length)];
            star.style.backgroundPosition = randomSprite;
            
            let transform = `translateZ(0) scale(${scale})`;
            if (Math.random() < 0.5) {
                transform += ' scaleX(-1)';
            }
            star.style.transform = transform;

            const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
            const blinkOpacity = Math.max(config.minOpacity, opacity * 0.5);                  
            star.style.setProperty('--initial-opacity', opacity);                             
            star.style.setProperty('--blink-opacity', blinkOpacity);                          
                                                                                        
            const duration = Math.random() * 5 + 5;                       
            const delay = Math.random() * 5;                                   
            star.style.setProperty('--blink-duration', `${duration}s`);                       
            star.style.setProperty('--blink-delay', `${delay}s`);

            if (opacity > config.minOpacity) {
                const glowSize = (opacity - config.minOpacity) / (config.maxOpacity - config.minOpacity) * config.maxGlow;
                star.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${opacity}))`;
            }

            container.appendChild(star);
        }
    }
    
    const debouncedRenderStars = debounce(renderStars, 10);
    window.addEventListener('resize', debouncedRenderStars);
    renderStars();
});
