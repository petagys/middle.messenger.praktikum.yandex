import Block from '../../core/Block';
import { Validator, validateValue } from '../../helpers/validator';

import './profile-element.css';

interface ProfileElementProps {
    validation?: Validator,
    inputType?: string,
    inputName?: string,
    disabled?: string,
    value?: string,
    onBlur?: () => void,
    onFocus?: () => void
}

export class ProfileElement extends Block {
    constructor({ validation, onBlur, onFocus, ...props }: ProfileElementProps) {
        super({
            ...props,
            onBlur: onBlur ? onBlur : (e: FocusEvent) => {
                if (validation) {
                    const input = e.target as HTMLInputElement;
                    const value: string = input.value;
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
            <div class="infoBlock">
               <span class="infoBlock__label">
                   {{label}}
               </span>
               {{{Input type=inputType name=inputName disabled=disabled value=value }}}
            </div>
        `
    }

}