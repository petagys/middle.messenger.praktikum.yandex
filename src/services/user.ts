import { Password, userAPI } from '../api/user';
import { UserDTO } from '../api/types';
import { Dispatch } from '../core';
import { apiHasError, transformUser } from '../utils';

export const changePass = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: Password,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    let response: EmptyResponse;
    try {
        response = await userAPI.password(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, loginFormError: '' });
    window.router.go('/pa');
};

export const changeProfile = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: UserDTO,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    let response: ResponseError | User;
    try {
        response = await userAPI.profile(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, loginFormError: '', user: transformUser(response as UserDTO) });
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: FormData,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const xhr = new XMLHttpRequest();// Почему то реализованный класс HTTPController корректно не отрабатывает :(
    xhr.open('PUT', `${process.env.API_ENDPOINT}/user/profile/avatar`);// Всегда пустой formData...
    xhr.withCredentials = true;
    xhr.send(action);
    xhr.onloadend = function () {
        const response = xhr.response === 'OK' ? xhr.response : JSON.parse(xhr.response);
        if (apiHasError(response)) {
            dispatch({ isLoading: false, loginFormError: response.reason });
            return;
        }
        dispatch({ isLoading: false, loginFormError: '', user: transformUser(response as UserDTO) });
    };

    xhr.onabort = () => {
        dispatch({ isLoading: false, loginFormError: 'Error!' });
    };
    xhr.onerror = () => {
        dispatch({ isLoading: false, loginFormError: 'Error!' });
    };
    xhr.ontimeout = () => {
        dispatch({ isLoading: false, loginFormError: 'Error!' });
    };
};

export const searchUser = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: { login: string },
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    let response: ResponseError | User[];

    try {
        response = await userAPI.search(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({
        isLoading: false,
        loginFormError: '',
        searchResult: response.map((user: UserDTO) => transformUser(user)),
    });
};
