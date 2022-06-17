import Block from '../../core/Block';

interface InputProps {
    type: 'text' | 'password' | 'email',
    name: string,
    disabled?: string,
    value?: string,
    onBlur?: () => void,
    onFocus?: () => void,
    onInput?: () => void
}

export class Input extends Block {
    constructor({
        onBlur, onFocus, onInput, ...props
    }: InputProps) {
        super({
            ...props,
            events: {
                blur: onBlur,
                focus: onFocus,
                input: onInput,
            },
        });
    }

    static get blockName() {
        return 'Input';
    }

    render(): string {
        return `
            <input type="{{type}}" name="{{name}}" />
        `;
    }
}
