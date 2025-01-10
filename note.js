// ==UserScript==
// @name         Community Overlay Template
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Basis-Template für Community Overlays
// @author       YourName
// @match        https://www.example.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ===== HTML BEREICH =====
    const html = `
        <div id="community-overlay">
            <div id="overlay-header">
                <div class="header-left">
                    <span class="overlay-title">Community Overlay</span>
                    <span class="overlay-version">v1.0</span>
                </div>
                <div class="header-right">
                    <button id="overlay-minimize">_</button>
                    <button id="overlay-close">×</button>
                </div>
            </div>
            <div id="overlay-content">
                <!-- HIER KOMMT DEIN HTML CONTENT REIN -->
                <!-- Zum Beispiel: -->
                <div class="content-section">
                    <h3>Mein Feature</h3>
                    <div class="section-content">
                        <div id="meine-feature-container">
                            <!-- Deine HTML Elemente -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ===== CSS BEREICH =====
    const css = `
        /* Basis CSS bleibt bestehen */
        
        /* HIER KOMMT DEIN ZUSÄTZLICHES CSS REIN */
        /* Zum Beispiel: */
        #meine-feature-container {
            /* Dein CSS */
        }
    `;

    function initializeOverlay() {
        // Basis-Setup des Overlays
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);

        const overlayContainer = document.createElement('div');
        overlayContainer.innerHTML = html;
        document.body.appendChild(overlayContainer);

        // Basis-Elemente
        const overlay = document.getElementById('community-overlay');
        const header = document.getElementById('overlay-header');
        const minimizeBtn = document.getElementById('overlay-minimize');
        const closeBtn = document.getElementById('overlay-close');
        const content = document.getElementById('overlay-content');

        // Event-Prevention (NICHT ÄNDERN)
        function preventEventBubbling(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        // ===== HIER KOMMT DEIN CODE REIN =====
        // Ab hier kannst du deinen eigenen Code einfügen
        // Die Event-Isolation ist aktiv
        
        // Beispiel für eigene Funktionen:
        function meineFeatureFunktion() {
            // Dein Code
        }

        // Beispiel für eigene Event-Listener:
        document.getElementById('meine-feature-container')?.addEventListener('click', (e) => {
            preventEventBubbling(e); // Wichtig: Nutze diese Funktion bei deinen Events
            // Dein Event-Handler Code
        });

        // ===== ENDE DEINES CODES =====

        // Basis Event-Listener für Drag & Drop (NICHT ÄNDERN)
        let isDragging = false;
        let currentX = parseInt(localStorage.getItem('overlayX') || '0');
        let currentY = parseInt(localStorage.getItem('overlayY') || '0');
        let initialX;
        let initialY;

        overlay.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

        // Rest des Basis-Codes...
        // (Der Rest des Event-Handling Codes bleibt unverändert)
    }

    // Overlay starten
    initializeOverlay();
})();
