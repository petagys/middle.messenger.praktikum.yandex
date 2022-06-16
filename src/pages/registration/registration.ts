import Block from '../../core/Block';

import '../../css/login-page.css';
import { validateValue, Validator } from '../../helpers/validator';

interface RegPageProps {
    onConfirmBlur: () => void
}
export class RegPage extends Block {
    constructor() {
        super({
            onConfirmBlur: () => {
                this.onConfirmBlur()
            },
            onConfirmFocus: () => {
                this.setConfirm();
            },
            onSignUp: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[name]')!;

                const errors: { [key: string]: string } = {};
                const result: {[key: string]: string} = {};
                inputs.forEach(input => {
                    const {name, value} = input;
                    result[name] = value;
                    if(name !== 'confirm_password'){
                        const errorText:string = validateValue(name, value);
                    if(errorText !== ''){
                        errors[name] = errorText;
                    }
                    } else {
                        this.onConfirmBlur();
                    }
                });

                Object.keys(errors).forEach(key => {
                    this.refs[key].refs.error.setProps({ error: errors[key] });
                })
            }
        })
    }

    onConfirmBlur(): void {
        const pass: string = (<HTMLInputElement>this.element?.querySelector('input[name="password"]'))!.value;
        const confirm: string = (<HTMLInputElement>this.element?.querySelector('input[name="confirm_password"]'))!.value;
        if (pass !== confirm || confirm === '') {
            this.setConfirm('Passwords do not match!');
        } else {
            this.setConfirm();
        }
    }

    setConfirm(text:string = ''):void{
        this.refs.confirm_password.refs.error.setProps({error: text});
    }

    render() {
        return `
        <div class="block__outer">
            <div class="block__enter">
                <h2>Sign Up</h2>
                <div class="block__inputs-signUp">
                <div class="block__login">
                    {{{ControlledInput
                        name="first_name"
                        type="text"
                        label="Name"
                        ref="first_name"
                        validation="${Validator.first_name}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="second_name"
                        type="text"
                        label="Surname"
                        ref="second_name"
                        validation="${Validator.second_name}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="login"
                        type="text"
                        label="Login"
                        ref="login"
                        validation="${Validator.login}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="email"
                        type="text"
                        label="E-mail"
                        ref="email"
                        validation="${Validator.email}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="phone"
                        type="text"
                        label="Phone"
                        ref="phone"
                        validation="${Validator.phone}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="password"
                        label="Password"
                        ref="password"
                        type="password"
                        validation="${Validator.password}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="confirm_password"
                        label="Confirm password"
                        ref="confirm_password"
                        type="password"
                        onBlur=onConfirmBlur
                        onFocus=onConfirmFocus
                    }}}
                </div>
                </div>

                <div>
                    {{{Button text="Create profile" onClick=onSignUp}}}
                </div>
                <div class="block__link">
                    <a href="${document.location.origin}/chats">Enter</a>
                </div>
            </div>
        </div>
        `
    }
}