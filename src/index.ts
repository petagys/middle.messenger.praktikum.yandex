import {
    registerComponent, Store, Router,
} from './core';
import './app.css';

import * as components from './components';
import { defaultState } from './store';
import { initApp } from './services/initApp';
import {
    ChangePass, Chat, LoginPage, Page404, Page500, Profile, Registration,
} from './pages';

Object.values(components).forEach((Component: any) => registerComponent(Component));

declare global {
    interface Window {
        store: Store<AppState>;
        router: Router;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new Router();

    window.router = router;
    window.store = store;

    /**
   * Инициализируем роутер
   */
    router
        .use('/', LoginPage, {})
        .use('/login', LoginPage, {})
        .use('/change-pass', ChangePass, {})
        .use('/pa', Profile, {})
        .use('/error', Page500, {})
        .use('/registration', Registration, {})
        .use('/chats', Chat, {})
        .use('*', Page404, {})
        .start();

    /**
     * Загружаем данные для приложения
     */
    setTimeout(() => {
        store.dispatch(initApp);
    }, 100);
});
