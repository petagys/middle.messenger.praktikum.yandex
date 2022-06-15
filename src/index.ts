import { Block, renderDOM, registerComponent, BlockConstructable } from './core';
import LoginPage from './pages/login-page';
import RegPage from './pages/registration';
import './app.css';

import Button from './components/button';
import Input from './components/input';
import Error from './components/error';
import ControlledInput from './components/controlled-input';

const components: BlockConstructable<any>[] = [
    Button,
    Input,
    Error,
    ControlledInput
];
console.log(components)
components.forEach((Component) => registerComponent(Component));

// const currentLocation: string = document.location.pathname;

document.addEventListener("DOMContentLoaded", () => {
    // let app = {};

    // switch(currentLocation) {
    //     case: 
    // }

    renderDOM(new LoginPage({}));
});