import httpController from '../utils/httpController';
import { UserDTO } from './types';

export const authAPI = {
    login: (data: Record<string, unknown>) => {
        return httpController.post('auth/signin', data);
    },

    me: () => httpController.get('auth/user'),

    logout: () => httpController.post('auth/logout'),

    registration: (data: UserDTO) => httpController.post('auth/signup', data),
};
