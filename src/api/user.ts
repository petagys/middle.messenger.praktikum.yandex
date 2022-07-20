import httpController from '../utils/httpController';
import { UserDTO } from './types';

export type Password = {
    oldPassword?: string,
    newPassword?: string,
    confirm?: string,
}

export const userAPI = {
    password: (data: Password): Promise<unknown> => {
        return httpController.put('user/password', data);
    },
    profile: (data: UserDTO): Promise<unknown> => {
        return httpController.put('user/profile', data);
    },
    search: (data: {login: string}): Promise<unknown> => {
        return httpController.post('user/search', data);
    },
};
