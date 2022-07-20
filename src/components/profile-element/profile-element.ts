import Block from '../../core/Block';
import { Validator, validateValue } from '../../helpers/validator';

import './profile-element.css';

interface ProfileElementProps {
    validation?: Validator | string,
    inputType?: string,
    inputName?: string,
    disabled?: string,
    value?: string,
    error?: string,
    onBlur?: () => void,
    onFocus?: () => void
}

export class ProfileElement extends Block {
    constructor({
        validation, onBlur, onFocus, ...props
    }: ProfileElementProps) {
        super({
            ...props,
            onBlur: onBlur || ((e: FocusEvent) => {
                if (validation) {
                    const input = e.target as HTMLInputElement;
                    const { value } = input;
                    const errorText = validateValue(validation, value);
                    this.refs.error.setProps({ error: errorText });
                }
            }),
            onFocus: onFocus || (() => {
                if (validation) {
                    this.refs.error.setProps({ error: '' });
                }
            }),
        });
    }

    static componentName = 'ProfileElement';

    render(): string {
        return `
            <div class="infoBlock">
               <span class="infoBlock__label">
                   {{label}}
               </span>
               <div class="errorInputBlock">
               <div class="errorText">{{{Error ref='error'}}}</div>
                {{{Input type=inputType name=inputName onBlur=onBlur onFocus=onFocus value=value }}}
               </div>
            </div>
        `;
    }
}
