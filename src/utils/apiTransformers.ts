import { UserDTO } from '../api/types';

export const transformUser = (data: UserDTO): User => {
    return {
        id: data.id,
        login: data.login,
        firstName: data.first_name,
        secondName: data.second_name,
        displayName: data.display_name,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
    };
};

export const transformUserBack = (data: User): UserDTO => {
    return {
        id: data.id,
        login: data.login,
        first_name: data.firstName,
        second_name: data.secondName,
        display_name: data.displayName,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
    };
};
