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

## Our Progress So Far: The Dynamic Card Fan

We've built a beautiful and complex interactive card fan at the bottom of the page. Here’s a breakdown of how it all works.

### 1. HTML Structure (`index.html`)

Your `index.html` file now contains a `.card-container` which holds five `.card` divs. We also added a temporary `is-animating` class to the `<body>` tag, which is crucial for making sure our animations run correctly on page load.

### 2. CSS Styling & Animation (`style.css`)

Your `style.css` file has evolved significantly and now includes several advanced features:

*   **The Card Fan Layout:** We are using CSS variables (`--i` and `--angle`) to position each of the 5 cards in a symmetrical fan. Each card's rotation is calculated automatically.
*   **Initial "Fan-Out" Animation:**
    *   When the page loads, the cards perform a "fan-out" animation, starting from a single point on the left and smoothly moving to their final positions.
    *   We use `@keyframes fanOut` to define this motion and `animation-delay` on each card to create the sequential effect.
    *   The `is-animating` class on the body is used to prevent hover effects from firing and breaking the layout while this initial animation is in progress.
*   **3D Hover Effects:**
    *   To create a smooth "pop-out" effect without the sudden jump of `z-index`, we've given the `.card-container` a `perspective`.
    *   When you hover a card, we use `transform: translateZ()` to move it towards you in 3D space. This is a `transform` property, so it animates smoothly with the `transition` we've set.
*   **Transparency:** To help focus the user's attention, non-hovered cards become slightly transparent.

### 3. JavaScript for Dynamic Interaction (`script.js`)

To achieve the complex effect where sibling cards react differently based on which card is hovered, we introduced JavaScript. Here’s a high-level look at what it does:

*   **Listens for Hovers:** The script adds `mouseenter` and `mouseleave` event listeners to each card.
*   **Calculates Dynamically:** When you hover over a card, the script instantly calculates the distance from that card to every other card in the fan.
*   **Sets CSS Variables:** Based on those calculations, it sets two new CSS variables on each sibling card:
    *   `--push-angle`: An extra rotation amount.
    *   `--push-y`: A vertical movement amount.
*   **Distance-Based Effect:** The values for these variables are inversely proportional to the distance from the hovered card. This creates the dynamic effect where closer cards move and rotate *more*, and cards further away move *less*.
*   **Robust Reset:** The script is carefully written to reset all these dynamic styles when the mouse leaves a card, fixing the bug where cards would get "stuck".

## Next Steps

We have a complete and polished interactive element on the page. We could now consider:

*   **Adding content "behind" the cards:** The main page area is still empty. We could design a portfolio, gallery, or "About Me" section there.
*   **Flipping the Cards:** We could add a "click" event that flips a card over to reveal content on the other side.
*   **Further refining the animations** or adding new interactive elements.

Let me know what you'd like to work on next!