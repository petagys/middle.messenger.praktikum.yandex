/* eslint-disable no-console */
import { Dispatch } from '../core';
import { apiHasError, transformUser } from '../utils';
import { userChat, chatsAPI } from '../api/chats';
import { ChatDTO, UserDTO } from '../api/types';

let socket: null|WebSocket = null;

const initSocket = (userId: number, actionId: number, token: string):void => {
    if (socket !== null) {
        socket.close();
    }
    socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${actionId}/${token}`);
};

const getMessages = (data: string) => {
    const newData: Array<Message> | Message = JSON.parse(data);
    if (Array.isArray(newData)) {
        return newData;
    }
    return [newData, ...window.store.getState().activeChat.messages];
};

export const getChats = async (
    dispatch: Dispatch<AppState>,
) => {
    dispatch({ isLoadingChats: true });
    let response: unknown | ResponseError | Chat[];
    try {
        response = await chatsAPI.get();
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoadingChats: false });
        return;
    }
    dispatch({ isLoadingChats: false, chats: response });
};

export const addChat = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: ChatDTO,
) => {
    let response: EmptyResponse;
    try {
        response = await chatsAPI.add(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }
    if (apiHasError(response)) {
        // eslint-disable-next-line no-alert
        alert(response.reason);
        return;
    }
    dispatch(getChats);
};

export const getChatInfo = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: {
        id: number,
        title: string,
    },
) => {
    dispatch({
        loadChat: true,
        activeChat: {
            title: action.title,
            id: action.id,
            messages: [],
            users: [],
            token: '',
        },
    });

    let response: {token: string} | ResponseError;
    try {
        response = await chatsAPI.getToken(action.id);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        // eslint-disable-next-line no-alert
        alert(response.reason);
        dispatch({ loadChat: true });
        return;
    }

    let responseUsers: ResponseError | User[];
    try {
        responseUsers = await chatsAPI.getUsers(action.id);
    } catch (err) {
        responseUsers = { reason: 'Ошибка!' };
    }

    if (apiHasError(responseUsers)) {
        // eslint-disable-next-line no-alert
        alert(responseUsers.reason);
        dispatch({ loadChat: true });
        return;
    }

    const newActiveChat = {
        title: action.title,
        id: action.id,
        messages: [],
        token: response.token,
        users: responseUsers.map((user: User) => transformUser(user) as unknown as UserDTO),
    };

    dispatch({
        activeChat: {
            ...newActiveChat,
        },
        loadChat: false,
    });

    initSocket(state!.user!.id, action.id, response.token);
    if (socket !== null) {
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket!.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));
        });

        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            console.log('Получены данные', event.data);
            dispatch({
                activeChat: {
                    ...newActiveChat,
                    messages: getMessages(event.data),
                },
            });
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    }
};

export const sendMessage = async (
    _dispatch: Dispatch<AppState>,
    _state: AppState,
    action: string,
) => {
    socket!.send(JSON.stringify({
        content: action,
        type: 'message',
    }));
};

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: {
        user: UserDTO,
        chatId: number
    },
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const body: userChat = {
        users: [
            action.user.id,
        ],
        chatId: action.chatId,
    };
    let response: EmptyResponse;
    try {
        response = await chatsAPI.addUser(body);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({
        isLoading: false,
        loginFormError: '',
        activeChat: {
            ...state.activeChat,
            users: [...state.activeChat.users, action.user],
        },
    });
};

export const deleteUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: {
        user: UserDTO,
        chatId: number
    },
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const body: userChat = {
        users: [
            action.user.id,
        ],
        chatId: action.chatId,
    };
    let response: EmptyResponse;
    try {
        response = await chatsAPI.deleteUser(body);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({
        isLoading: false,
        loginFormError: '',
        activeChat: {
            ...state.activeChat,
            users: state.activeChat.users.filter(user => user.id !== action.user.id),
        },
    });
};
