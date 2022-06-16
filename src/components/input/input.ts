import Block from '../../core/Block';

interface InputProps {
    type: 'text' | 'password' | 'email',
    name: string,
    disabled?: boolean,
    onBlur?: () => void,
    onFocus?: () => void,
    onInput?: () => void
}

export class Input extends Block {
    constructor({ disabled, onBlur, onFocus, onInput, ...props }: InputProps) {
        super({
            ...props,
            disabled: disabled !== undefined ? disabled : false,
            events: {
                blur: onBlur,
                focus: onFocus,
                input: onInput
            }
        });
    }

    render(): string {
        return `
            <input type="{{type}}" name="{{name}}" disabled="{{disabled}}">
        `
    }

}