declare global {
    interface Window {
        Telegram: {
            WebApp: {
                // Основные методы
                initData: string;
                initDataUnsafe: TelegramWebAppInitData;
                version: string;
                platform: string;

                // Внешний вид
                colorScheme: 'light' | 'dark';
                themeParams: Record<string, string>;
                headerColor: string;
                backgroundColor: string;

                // Состояние
                isExpanded: boolean;
                viewportHeight: number;
                isClosingConfirmationEnabled: boolean;

                // Методы
                ready: () => void;
                expand: () => void;
                close: () => void;
                showPopup: (params: PopupParams) => void;
                showAlert: (message: string, callback?: () => void) => void;
                showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
                enableClosingConfirmation: () => void;
                disableClosingConfirmation: () => void;

                // Кнопки
                MainButton: MainButton;
                BackButton: BackButton;
            };
        };
    }

    interface TelegramWebAppInitData {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
        };
    }

    interface PopupParams {
        title?: string;
        message: string;
        buttons?: PopupButton[];
    }

    interface PopupButton {
        id?: string;
        type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
        text: string;
    }

    interface MainButton {
        text: string;
        color: string;
        textColor: string;
        isVisible: boolean;
        isActive: boolean;
        show: () => void;
        hide: () => void;
        setText: (text: string) => void;
        onClick: (callback: () => void) => void;
        showProgress: () => void;
        hideProgress: () => void;
        setParams: (params: MainButtonParams) => void;
    }

    interface MainButtonParams {
        color?: string;
        text_color?: string;
    }

    interface BackButton {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    }
}
