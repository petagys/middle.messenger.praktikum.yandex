import { authAPI } from '../api/auth';
import { UserDTO } from '../api/types';
import type { Dispatch } from '../core';
import { transformUser, apiHasError } from '../utils';

export async function initApp(dispatch: Dispatch<AppState>) {
    try {
        dispatch({ pageLoading: true });
        const response = await authAPI.me();

        if (apiHasError(response)) {
            dispatch({ pageLoading: false });
            return;
        }

        dispatch({ user: transformUser(response as UserDTO), pageLoading: false });
        // if (window.location.pathname === '/' || window.location.pathname === '/login') {
        //     window.router.go('/chats');
        // }
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appIsInited: true });
    }
}
