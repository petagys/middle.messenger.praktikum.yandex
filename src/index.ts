import { Block, renderDOM, registerComponent, BlockConstructable } from './core';
import LoginPage from './pages/login-page';
import RegPage from './pages/registration';
import ChatPage from './pages/chat';
import Page404 from './pages/404';
import Page500 from './pages/500';
import changePass from './pages/change-pass';
import Profile from './pages/profile';
import './app.css';

import Button from './components/button';
import Input from './components/input';
import Error from './components/error';
import ControlledInput from './components/controlled-input';
import ChatElement from './components/chat-element';
import ProfileElement from './components/profile-element';


const components: BlockConstructable[] = [
    Button,
    Input,
    Error,
    ControlledInput,
    ChatElement,
    ProfileElement
];
console.log(components)
components.forEach((Component) => registerComponent(Component));

// const currentLocation: string = document.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
    // let app = {};

    // switch(currentLocation) {
    //     case: 
    // }

    renderDOM(new Profile({}));
});