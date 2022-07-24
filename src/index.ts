import {
    registerComponent, Store, Router, renderDOM,
} from './core';
import './app.css';

import * as components from './components';
import { defaultState } from './store';
import { getScreenComponent } from './utils/screenList';
import { initApp } from './services/initApp';
import { DEBUG } from './helpers/consts';
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

    // store.on('changed', (prevState, nextState) => {
    //     if (DEBUG) {
    //         // eslint-disable-next-line no-console
    //         console.log(
    //             '%cstore updated',
    //             'background: #222; color: #bada55',
    //             nextState,
    //         );
    //     }
    //     if (prevState.screen !== nextState.screen) {
    //         const Page = getScreenComponent(nextState.screen);
    //         renderDOM(new Page({}));
    //     }
    // });
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
