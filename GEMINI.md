# Gemini's Web Dev Guide

Hello! This file is our guide to building your website. It's been updated to reflect our progress so far.

## The Core Trio

A website is primarily built with three languages:

1.  **HTML (HyperText Markup Language):** This is the skeleton of your site. It defines the structure and content.
2.  **CSS (Cascading Style Sheets):** This styles your HTML content, handling colors, fonts, layout, and backgrounds.
3.  **JavaScript (JS):** This makes your site interactive, which we have now successfully implemented!

## Your Project Files

*   `index.html`: The main page of your site. It now contains the structure for our card fan.
*   `style.css`: Where all the visual rules and animations for the site are defined.
*   `script.js`: Our new JavaScript file that handles the complex, dynamic hover interactions for the cards.
*   `assets/`: This folder contains your images, including the background and 5 different card backs (`card_back_1.png` through `card_back_5.png`).
*   `pages/`: This folder contains the content for your different pages (`about.html`, `home.html`, etc.).

## Our Progress So Far

### 1. Single-Page Application (SPA) & Routing

Your website now functions as a Single-Page Application. This means the page content is loaded dynamically without a full page refresh, creating a faster and smoother user experience.

*   **Core Structure:** `index.html` is the single entry point for your users. It contains the header, the navigation (the card fan), and a main content area (`<main id="page-content">`).
*   **Page Content:** The actual content for the different sections of your site is stored in separate files within the `pages/` directory (e.g., `pages/home.html`, `pages/about.html`).
*   **JavaScript-driven Routing:** `script.js` handles the routing. When you click a card, it:
    1.  Prevents the default link behavior.
    2.  Updates the URL in the browser with a hash (e.g., `.../index.html#home`).
    3.  Uses the `fetch` API to get the content of the corresponding HTML file from the `pages/` directory.
    4.  Injects the loaded content into the `<main id="page-content">` element.
    5.  Manages the browser's history, so the back and forward buttons work as expected.

### 2. The Dynamic Card Fan

We've built a beautiful and complex interactive card fan at the bottom of the page that acts as the site's primary navigation. Here’s a breakdown of how it all works.

*   **HTML Structure (`index.html`):** Your `index.html` file contains a `.card-container` which holds five `.card` divs. Each card has a `data-page` attribute that tells the JavaScript which page to load. We also added a temporary `is-animating` class to the `<body>` tag, which is crucial for making sure our animations run correctly on page load.

*   **CSS Styling & Animation (`style.css`):** Your `style.css` file has evolved significantly and now includes several advanced features:
    *   **The Card Fan Layout:** We are using CSS variables (`--i` and `--angle`) to position each of the 5 cards in a symmetrical fan. Each card's rotation is calculated automatically.
    *   **Initial "Fan-Out" Animation:** When the page loads, the cards perform a "fan-out" animation. The `is-animating` class on the body prevents hover effects from breaking the layout while this initial animation is in progress.
    *   **3D Hover Effects:** To create a smooth "pop-out" effect, we've given the `.card-container` a `perspective`. When you hover a card, `transform: translateZ()` moves it towards you in 3D space.
    *   **Transparency:** To help focus the user's attention, non-hovered cards become slightly transparent.

*   **JavaScript for Dynamic Interaction (`script.js`):** To achieve the complex effect where sibling cards react differently based on which card is hovered, we introduced JavaScript. Here’s a high-level look at what it does:
    *   **Listens for Hovers:** The script adds `mouseenter` and `mouseleave` event listeners to each card.
    *   **Calculates Dynamically:** When you hover over a card, the script instantly calculates the distance from that card to every other card in the fan.
    *   **Sets CSS Variables:** Based on those calculations, it sets two new CSS variables on each sibling card: `--push-angle` and `--push-y`.
    *   **Distance-Based Effect:** The values for these variables are inversely proportional to the distance from the hovered card. This creates the dynamic effect where closer cards move and rotate *more*, and cards further away move *less*.

## Next Steps

Now that the core SPA functionality and navigation are in place, we can focus on content! We could now consider:

*   **Building out the content** for the `home.html`, `about.html`, and `vblog.html` pages.
*   **Flipping the Cards:** We could add a "click" event that flips a card over to reveal content on the other side.
*   **Further refining the animations** or adding new interactive elements.

Let me know what you'd like to work on next!
