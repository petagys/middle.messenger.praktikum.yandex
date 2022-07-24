import Block from '../../core/Block';
import './btn.css';

interface ButtonProps {
    text: string,
    onClick: () => void
}

export class Button extends Block {
    static componentName = 'Button';

    constructor({ text, onClick }: ButtonProps) {
        super({ text, events: { click: onClick } });
    }

    render(): string {
        return `
            <div>
                <button class="btn" type="button">{{text}}</button>
            <div>
        `;
    }
}
