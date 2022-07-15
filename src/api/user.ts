import httpController from '../utils/httpController';
import { UserDTO } from './types';

export const userAPI = {
    password: (data: Record<string, unknown>) => {
        return httpController.put('user/password', data);
    },
    profile: (data: Record<string, unknown>) => {
        return httpController.put('user/profile', data);
    },
    avatar: (data: FormData) => {
        return httpController.put('user/avatar', data, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryZcZSeWOWVoQzVFBz',
            },
        });
    },
};
