import { Dispatch } from '../core';
import { apiHasError, transformUser } from '../utils';
import { chatsAPI } from '../api/chats';
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
        console.log(newData);
        return newData;
    }
    console.log([...window.store.getState().activeChat.messages, newData]);
    return [newData, ...window.store.getState().activeChat.messages];
};

export const getChats = async (
    dispatch: Dispatch<AppState>,
) => {
    dispatch({ isLoadingChats: true });
    const response: any = await chatsAPI.get();

    if (apiHasError(response)) {
        dispatch({ isLoadingChats: false });
        return;
    }
    dispatch({ isLoadingChats: false, chats: response });
};

export const addChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChatDTO,
) => {
    const response: any = await chatsAPI.add(action);
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

    const response: any = await chatsAPI.getToken(action.id);

    if (apiHasError(response)) {
        // eslint-disable-next-line no-alert
        alert(response.reason);
        dispatch({ loadChat: true });
        return;
    }

    const responseUsers: any = await chatsAPI.getUsers(action.id);

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
        users: responseUsers.map((user: UserDTO) => transformUser(user)),
    };

    dispatch({
        activeChat: {
            ...newActiveChat,
        },
        loadChat: false,
    });

    initSocket(state.user.id, action.id, response.token);
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
    dispatch: Dispatch<AppState>,
    state: AppState,
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
    action: Record<string, unknown>,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const body = {
        users: [
            action.user.id,
        ],
        chatId: action.chatId,
    };
    const response: any = await chatsAPI.addUser(body);

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
    action: Record<string, unknown>,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const body = {
        users: [
            action.user.id,
        ],
        chatId: action.chatId,
    };
    const response: any = await chatsAPI.deleteUser(body);

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
