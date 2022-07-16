import { UserDTO } from '../api/types';
import { Dispatch } from '../core';
import { apiHasError,  } from '../utils';
import { chatsAPI } from '../api/chats';

export const getChats = async (
    dispatch: Dispatch<AppState>,
) => {
    dispatch({ isLoadingChats: true });
    const response: any = await chatsAPI.get();

    if (apiHasError(response)) {
        dispatch({ isLoadingChats: false });
        return;
    }
    dispatch({ isLoadingChats: false });
};
