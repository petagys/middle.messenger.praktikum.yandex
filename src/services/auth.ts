import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { defaultState } from '../store';
import { transformUser, apiHasError } from '../utils';

type LoginPayload = {
  login: string;
  password: string;
};

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: LoginPayload,
) => {
    dispatch({ isLoading: true, loginFormError: '' });

    const response = await authAPI.login(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseUser = await authAPI.me();

    dispatch({ loginFormError: null });

    if (apiHasError(responseUser)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseUser as UserDTO), isLoading: false, loginFormError: '' });

    window.router.go('/chats');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });

    const response = await authAPI.logout();
    if (apiHasError(response)) {
        dispatch({ isLoading: false });
        return;
    }

    dispatch(defaultState);

    window.router.go('/');
};

export const registration = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserDTO,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const response: any = await authAPI.registration(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ user: { ...action, id: response.id } as UserDTO, isLoading: false, loginFormError: '' });
    window.router.go('/chats');
};
