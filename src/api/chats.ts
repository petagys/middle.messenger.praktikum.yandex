import httpController from '../utils/httpController';

type addingChat = {
    title: string
};

export type userChat = {
    users: Array<number>,
    chatId: number,
};

export const chatsAPI = {
    get: ():Promise<unknown> => {
        return httpController.get('chats');
    },
    add: (data: addingChat): Promise<unknown> => {
        return httpController.post('chats', data);
    },
    getUsers: (id: number): Promise<unknown> => {
        return httpController.get(`chats/${String(id)}/users`);
    },
    getToken: (id: number): Promise<unknown> => {
        return httpController.post(`chats/token/${String(id)}`);
    },
    addUser: (data: userChat): Promise<unknown> => {
        return httpController.put('chats/users', data);
    },
    deleteUser: (data: userChat): Promise<unknown> => {
        return httpController.delete('chats/users', data);
    },
};
