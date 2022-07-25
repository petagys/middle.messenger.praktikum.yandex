import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

export async function initApp(dispatch: Dispatch<AppState>) {
    try {
        dispatch({ pageLoading: true });
        const response = await authAPI.me();
        const { pathname } = window.location;
        const unAuthLinks = ['/', '/login', '/registration'];

        if (apiHasError(response)) {
            dispatch({ pageLoading: false });
            if (!unAuthLinks.includes(pathname)) {
                dispatch({ loginFormError: "User isn't authorized!" });
                window.router.go('/');
            }
            return;
        }

        dispatch({ user: transformUser(response as UserDTO), pageLoading: false });

        if (unAuthLinks.includes(pathname)){
            window.router.go('/chats') 
        }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });
    }
}
