/// <reference path="./types/telegram-webapp.d.ts" />

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './components/app';

function initTelegramApp() {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

// Проверяем, загружен ли Telegram WebApp
// if (window.Telegram?.WebApp) {
//     window.Telegram.WebApp.ready();
//     initTelegramApp();
// } else {
//     // Режим разработки вне Telegram
//     initTelegramApp();
// }


initTelegramApp();