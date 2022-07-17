export const defaultState: AppState = {
    appIsInited: false,
    isLoading: false,
    pageLoading: false,
    loadChat: false,
    isLoadingChats: false,
    openModal: false,
    screen: null,
    loginFormError: null,
    user: null,
    chats: [],
    searchResult: [],
    activeChat: {
        title: '',
        token: '',
        users: [],
        id: null,
    },
};
