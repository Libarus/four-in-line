import { useEffect, useState } from 'react';
import { WebApp } from '@twa-dev/sdk';

export const useTelegramWebApp = () => {
    const [webApp, setWebApp] = useState<WebApp | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.expand();
            setWebApp(tg);
        }
    }, []);

    return webApp;
};

export const WebAppProvider = ({ children }: { children: React.ReactNode }) => {
    const webApp = useTelegramWebApp();

    useEffect(() => {
        if (webApp) {
            webApp.ready();
        }
    }, [webApp]);

    return <>{children}</>;
};
