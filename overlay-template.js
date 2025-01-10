// ==UserScript==
// @name         Community Overlay Template
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Basis-Template für Community Overlays mit Drag & Drop und Event-Isolation
// @author       YourName
// @match        https://www.diesiedleronline.de/de/spielen
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
                <div class="content-section">
                    <h3>Bereich 1</h3>
                    <div class="section-content">
                        <p>Inhalt für Bereich 1</p>
                    </div>
                </div>
                <div class="content-section">
                    <h3>Bereich 2</h3>
                    <div class="section-content">
                        <p>Inhalt für Bereich 2</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const css = `
        #community-overlay {
            position: fixed;
            top: 50px;
            right: 50px;
            width: 300px;
            background: rgba(32, 34, 37, 0.95);
            border: 1px solid #40444b;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            color: #dcddde;
            font-family: Arial, sans-serif;
            z-index: 9999;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            touch-action: none;
        }

        #overlay-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #2f3136;
            border-bottom: 1px solid #40444b;
            border-radius: 8px 8px 0 0;
            cursor: move;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .overlay-title {
            font-weight: bold;
            color: #ffffff;
        }

        .overlay-version {
            font-size: 0.8em;
            color: #72767d;
        }

        .header-right {
            display: flex;
            gap: 4px;
        }

        .header-right button {
            background: none;
            border: none;
            color: #72767d;
            cursor: pointer;
            padding: 2px 6px;
            font-size: 14px;
            border-radius: 3px;
        }

        .header-right button:hover {
            background: #40444b;
            color: #ffffff;
        }

        #overlay-content {
            padding: 12px;
            max-height: 500px;
            overflow-y: auto;
        }

        .content-section {
            background: rgba(47, 49, 54, 0.6);
            border-radius: 5px;
            margin-bottom: 8px;
            padding: 8px;
        }

        .content-section h3 {
            margin: 0 0 8px 0;
            font-size: 14px;
            color: #ffffff;
        }

        .section-content {
            font-size: 13px;
            color: #b9bbbe;
        }

        #overlay-content::-webkit-scrollbar {
            width: 8px;
        }

        #overlay-content::-webkit-scrollbar-track {
            background: #2f3136;
        }

        #overlay-content::-webkit-scrollbar-thumb {
            background: #202225;
            border-radius: 4px;
        }

        #overlay-content::-webkit-scrollbar-thumb:hover {
            background: #40444b;
        }
    `;

    function initializeOverlay() {
        // Style einfügen
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        document.head.appendChild(styleElement);

        // HTML einfügen
        const overlayContainer = document.createElement('div');
        overlayContainer.innerHTML = html;
        document.body.appendChild(overlayContainer);

        // Elemente und Status
        const overlay = document.getElementById('community-overlay');
        const header = document.getElementById('overlay-header');
        const minimizeBtn = document.getElementById('overlay-minimize');
        const closeBtn = document.getElementById('overlay-close');
        const content = document.getElementById('overlay-content');

        // Grundlegende Event-Prevention-Funktion
        function preventEventBubbling(e) {
            e.stopPropagation();
            e.preventDefault();
        }

        // deine funktionen nur hier damit sie isoliert bleiben!
        // ... 
        // Ende dein Code

        // Overlay Position Status
        let isDragging = false;
        let currentX = parseInt(localStorage.getItem('overlayX') || '0');
        let currentY = parseInt(localStorage.getItem('overlayY') || '0');
        let initialX;
        let initialY;

        // Initial position setzen
        overlay.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

        // Drag Start
        function startDragging(e) {
            preventEventBubbling(e);

            if (e.target === header || e.target.closest('#overlay-header')) {
                isDragging = true;
                initialX = e.clientX - currentX;
                initialY = e.clientY - currentY;
            }
        }

        // Dragging
        function drag(e) {
            if (isDragging) {
                preventEventBubbling(e);

                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                overlay.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }
        }

        // Drag Ende
        function stopDragging(e) {
            if (isDragging) {
                preventEventBubbling(e);
                isDragging = false;

                // Position speichern
                localStorage.setItem('overlayX', currentX.toString());
                localStorage.setItem('overlayY', currentY.toString());
            }
        }

        // Event Listener für Drag & Drop
        header.addEventListener('mousedown', startDragging, { passive: false });
        document.addEventListener('mousemove', drag, { passive: false });
        document.addEventListener('mouseup', stopDragging, { passive: false });

        // Minimieren-Funktion
        let isMinimized = false;
        minimizeBtn.addEventListener('click', (e) => {
            preventEventBubbling(e);
            isMinimized = !isMinimized;
            content.style.display = isMinimized ? 'none' : 'block';
            minimizeBtn.textContent = isMinimized ? '□' : '_';
        });

        // Schließen-Funktion
        closeBtn.addEventListener('click', (e) => {
            preventEventBubbling(e);
            overlay.remove();
        });

        // Prevent all default behaviors
        overlay.addEventListener('mousedown', preventEventBubbling, { passive: false });
        overlay.addEventListener('click', preventEventBubbling, { passive: false });
        overlay.addEventListener('dblclick', preventEventBubbling, { passive: false });
        overlay.addEventListener('contextmenu', preventEventBubbling, { passive: false });
        overlay.addEventListener('wheel', preventEventBubbling, { passive: false });
        overlay.addEventListener('touchstart', preventEventBubbling, { passive: false });
        overlay.addEventListener('touchmove', preventEventBubbling, { passive: false });
        overlay.addEventListener('touchend', preventEventBubbling, { passive: false });

        // Prevent text selection
        overlay.addEventListener('selectstart', preventEventBubbling, { passive: false });

        // Prevent dragging of elements
        overlay.addEventListener('dragstart', preventEventBubbling, { passive: false });
    }

    // Overlay starten
    initializeOverlay();
})();
