import httpController from '../utils/httpController';

export const chatsAPI = {
    get: () => {
        return httpController.get('chats');
    },
    add: (data: Record<string, unknown>) => {
        return httpController.post('chats', data);
    },
    getUsers: (id: number) => {
        return httpController.get(`chats/${String(id)}/users`);
    },
    getToken: (id: number) => {
        return httpController.post(`chats/token/${String(id)}`);
    },
    addUser: (data: Record<string, unknown>) => {
        return httpController.put('chats/users', data);
    },
    deleteUser: (data: Record<string, unknown>) => {
        return httpController.delete('chats/users', data);
    },
};
