import httpController from '../utils/httpController';
import { UserDTO } from './types';

export type LoginPayload = {
    login: string;
    password: string;
};

export const authAPI = {
    login: (data: LoginPayload):Promise<unknown> => {
        return httpController.post('auth/signin', data);
    },

    me: ():Promise<unknown> => httpController.get('auth/user'),

    logout: ():Promise<unknown> => httpController.post('auth/logout'),

    registration: (data: UserDTO):Promise<unknown> => httpController.post('auth/signup', data),
};
