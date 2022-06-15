import { Block, renderDOM, registerComponent } from './core';
import LoginPage from './pages/login-page';
import './app.css';

const components = require('./components/**/index.ts') as { [key: string]: { default: typeof Block } };
console.log(components)
Object.values(components).forEach((component) => {
    registerComponent(component.default);
});

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new LoginPage({}));
});