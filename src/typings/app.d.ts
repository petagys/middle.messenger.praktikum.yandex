import { type } from 'os';
import { UserDTO } from '../api/types';

declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];
    export type AppState = {
        appIsInited: boolean;
        screen: Screens | null;
        isLoading: boolean;
        pageLoading: boolean;
        loginFormError: string | null;
        user: User | null;
        chats: Array<Chat>;
        isLoadingChats: boolean;
        loadChat: boolean;
        openModal: boolean;
        activeChat: ActiveChat;
        searchResult: Array<User>
    };

    export type ActiveChat = {
        token: string;
        users: Array<User|UserDTO>;
        title: string;
        id: number|null;
        messages: Array<Message>
    };

    export type User = {
        id: number;
        login: string;
        first_name: string;
        second_name: string;
        display_name: string;
        avatar: string;
        phone: string;
        email: string;
    };

    export type Chat = {
        id: number;
        title: string;
        avatar: string;
        unread_count: number;
        last_message: null | Message;
    };

    export type Message = {
        id: number;
        time: string;
        content: string;
        user_id?: number;
        chat_id?: number;
        type?: string;
        user?: User;
        is_read?: boolean;
        file?: null;
    };

    export type ResponseError = {
        reason: string;
    };

    export type EmptyResponse = ResponseError | string | unknown;
}

declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svg';

export { };
