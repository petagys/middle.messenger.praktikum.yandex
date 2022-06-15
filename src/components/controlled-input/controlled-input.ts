import Block from '../../core/Block';
import { Validator, validateValue } from '../../helpers/validator';
import './controlled-input.css';

interface ControlledInputProps {
    validation?: Validator
    // onBlur: () => void,
    // onFocus: () => void
}

export class ControlledInput extends Block {
    constructor({ validation, ...props }: ControlledInputProps) {
        super({
            ...props,
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                console.log(validation)
                if (validation) {
                    const errorText = validateValue(validation, value);
                    this.refs.error.setProps({ error: errorText });
                }

                console.log(this.props.name, value, validateValue(this.props.name, value));
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