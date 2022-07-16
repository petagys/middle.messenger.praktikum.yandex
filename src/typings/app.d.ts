declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export type AppState = {
        appIsInited: boolean;
        screen: Screens | null;
        isLoading: boolean;
        pageLoading: boolean;
        isLoadingChats: boolean;
        loginFormError: string | null;
        user: User | null;
    };

    export type User = {
        id: number;
        login: string;
        firstName: string;
        secondName: string;
        displayName: string;
        avatar: string;
        phone: string;
        email: string;
    };

    export type Chat = {
        id: number,
        title: string,
        avatar: string,
        unread_count: number,
        last_message: {
            user: User,
            time: string,
            content: string
        }
}

declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svg';

export { };
