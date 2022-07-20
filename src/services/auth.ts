import { authAPI, LoginPayload } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { defaultState } from '../store';
import { transformUser, apiHasError } from '../utils';

export const login = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: LoginPayload,
) => {
    dispatch({ isLoading: true, loginFormError: '' });

    let response: EmptyResponse;

    try {
        response = await authAPI.login(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    let responseUser: unknown | User | ResponseError;

    try {
        responseUser = await authAPI.me();
    } catch (err) {
        responseUser = { reason: 'Ошибка!' };
    }

    dispatch({ loginFormError: null });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as unknown as UserDTO), isLoading: false, loginFormError: '' });

    window.router.go('/chats');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });

    let response: unknown | string | ResponseError;

    try {
        response = await authAPI.logout();
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }

    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    dispatch({ ...defaultState });

    window.router.go('/');
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: UserDTO,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    let response: ResponseError | {id: number} | unknown;

    try {
        response = await authAPI.registration(action);
    } catch (err) {
        response = { reason: 'Ошибка!' };
    }
    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ user: { ...action, id: response.id } as UserDTO, isLoading: false, loginFormError: '' });
    window.router.go('/chats');
};
