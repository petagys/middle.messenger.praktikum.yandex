import Block from '../../core/Block';
import './btn.css';

interface ButtonProps {
    text: string,
    onClick: () => void
}

export class Button extends Block {
    constructor({ text, onClick }: ButtonProps) {
        super({ text, events: { click: onClick } });
    }

    static get blockName():string {
        return 'Button';
    }

    render(): string {
        return `<div>
            <button class="btn" type="button">{{text}}</button>
            <div>
        `;
    }
}
