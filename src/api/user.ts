import httpController from '../utils/httpController';

export const userAPI = {
    password: (data: Record<string, unknown>) => {
        return httpController.put('user/password', data);
    },
    profile: (data: Record<string, unknown>) => {
        return httpController.put('user/profile', data);
    },
    search: (data: Record<string, unknown>) => {
        return httpController.post('user/search', data);
    },
    // avatar: (data: FormData) => {
    //     return httpController.put('user/profile/avatar', data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryZcZSeWOWVoQzVFBz',
    //         },
    //     });
    // },
};
