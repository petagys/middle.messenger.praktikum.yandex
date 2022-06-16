import Block from '../../core/Block';
import { Validator, validateValue } from '../../helpers/validator';
import './controlled-input.css';

interface ControlledInputProps {
    validation?: Validator
    onBlur?: () => void,
    onFocus?: () => void
}

export class ControlledInput extends Block {
    constructor({ validation, onBlur, onFocus, ...props }: ControlledInputProps) {
        super({
            ...props,
            onBlur: onBlur ? onBlur : (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value: string = input.value;
                if (validation) {
                    const errorText = validateValue(validation, value);
                    this.refs.error.setProps({ error: errorText });
                }
            }
            ,
            onFocus: onFocus ? onFocus : () => {
                if (validation) {
                    this.refs.error.setProps({ error: '' });
                }
            }
        });
    }

    render(): string {
        return `
            <div class="login__box">
            {{{Input name=name type=type onFocus=onFocus onInput=onInput onBlur=onBlur}}}
            <label for="${this.props.name}">{{label}}</label>
            {{{Error ref='error'}}}
            </div>
        `
    }

}