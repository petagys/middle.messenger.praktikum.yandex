import { userAPI } from '../api/user';
import { UserDTO } from '../api/types';
import { Dispatch } from '../core';
import { apiHasError, transformUser } from '../utils';

export const changePass = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserDTO,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const response: any = await userAPI.password(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, loginFormError: '' });
    window.router.go('/pa');
};

export const changeProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserDTO,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const response: any = await userAPI.profile(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, loginFormError: '', user: transformUser(response as UserDTO) });
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: FormData,
) => {
    dispatch({ isLoading: true, loginFormError: '' });
    const response: any = await userAPI.avatar(action);

    if (apiHasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }
    dispatch({ isLoading: false, loginFormError: '', user: transformUser(response as UserDTO) });
};
