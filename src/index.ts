import {
    registerComponent, Store, Router,
} from './core';
import './app.css';

import * as components from './components';
import { defaultState } from './store';
import { getScreenComponent, Screens } from './utils/screenList';

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

    store.on('changed', (prevState, nextState) => {
        if (process.env.DEBUG) {
            // eslint-disable-next-line no-console
            console.log(
                '%cstore updated',
                'background: #222; color: #bada55',
                nextState,
            );
        }
    });
    /**
   * Инициализируем роутер
   */
    router
        .use('/', getScreenComponent(Screens.LoginPage))
        .use('/login', getScreenComponent(Screens.LoginPage))
        .use('/change-pass', getScreenComponent(Screens.ChangePass))
        .use('/pa', getScreenComponent(Screens.Profile))
        .use('/error', getScreenComponent(Screens.Page500))
        .use('/registration', getScreenComponent(Screens.Registration))
        .use('/chats', getScreenComponent(Screens.Chat))
        .use('*', getScreenComponent(Screens.Page404))
        .start();

    /**
     * Загружаем данные для приложения
     */
    // store.dispatch(initApp);
});
