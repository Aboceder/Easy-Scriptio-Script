// ==UserScript==
// @name         celebrate
// @description  celebration on Send Message
// @run-at       main, chat
// @reactive     true
// @version      0.1.1
// @homepageURL  https://github.com/Aboceder/Easy-Scriptio-Script
// @author       bopomofo
// ==/UserScript==

(function () {
    'use strict';

    const ENTER_KEY_CODE = 13;
    const CONFETTI_URL = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    let confettiLoaded = false;

    function loadConfetti() {
        return new Promise((resolve, reject) => {
            if (typeof confetti === 'function') {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = CONFETTI_URL;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function celebrateWithConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            console.error('Confetti function not available');
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            if (confettiLoaded) {
                celebrateWithConfetti();
            } else {
                loadConfetti()
                    .then(() => {
                        confettiLoaded = true;
                        celebrateWithConfetti();
                    })
                    .catch(error => {
                        console.error('Failed to load confetti script:', error);
                    });
            }
        }
    }

    // 使用事件委托来处理键盘事件
    document.addEventListener('keydown', handleKeyDown, false);

    // 预加载 confetti 脚本
    loadConfetti()
        .then(() => {
            confettiLoaded = true;
            console.log('Confetti script loaded successfully');
        })
        .catch(error => {
            console.warn('Failed to preload confetti script:', error);
        });
})();
