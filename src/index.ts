import {
    Block, renderDOM, registerComponent, BlockConstructable,
} from './core';
import LoginPage from './pages/login-page';
import RegPage from './pages/registration';
import ChatPage from './pages/chat';
import Page404 from './pages/404';
import Page500 from './pages/500';
import ChangePass from './pages/change-pass';
import Profile from './pages/profile';
import './app.css';

import Button from './components/button';
import Input from './components/input';
import Error from './components/error';
import ControlledInput from './components/controlled-input';
import ChatElement from './components/chat-element';
import ProfileElement from './components/profile-element';

const components: BlockConstructable<any>[] = [
    Button,
    Input,
    Error,
    ControlledInput,
    ChatElement,
    ProfileElement,
];

components.forEach((Component) => registerComponent(Component, Component.blockName));

const currentLocation: string = document.location.pathname;

document.addEventListener('DOMContentLoaded', () => {
    let app = {} as Block;

    switch (currentLocation) {
        case '/login':
        case '/':
            app = new LoginPage();
            break;
        case '/registration':
            app = new RegPage();
            break;
        case '/chats':
            app = new ChatPage();
            break;
        case '/change-pass':
            app = new ChangePass();
            break;
        case '/error':
            app = new Page500();
            break;
        case '/pa':
            app = new Profile();
            break;
        default:
            app = new Page404();
            break;
    }

    console.log(currentLocation, app);
    renderDOM(app);
});
