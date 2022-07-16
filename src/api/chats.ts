import httpController from '../utils/httpController';

export const chatsAPI = {
    get: () => {
        return httpController.get('chats');
    },
};
