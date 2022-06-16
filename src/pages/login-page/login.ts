import Block from '../../core/Block';

import '../../css/login-page.css';
import { validateValue, Validator } from '../../helpers/validator';

interface LoginPageProps {
    onLogin: () => void
}

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        super({
            ...props,
            onLogin: () => {
                const loginInput: HTMLInputElement = this.element?.querySelector('input[name="login"]')!;
                const passwordInput: HTMLInputElement = this.element?.querySelector('input[name="password"]')!;
                const result: { [key: string | Validator]: string } = Object.assign({ [loginInput.name]: loginInput.value },
                    { [passwordInput.name]: passwordInput.value });
                
                const loginValidate: string = validateValue(loginInput.name, loginInput.value);
                const passwordValidate: string = validateValue(passwordInput.name, passwordInput.value);
                
                if (loginValidate !== '') {
                    this.refs.login.refs.error.setProps({ error: loginValidate })
                } 
                if (passwordValidate !== '') {
                    this.refs.password.refs.error.setProps({ error: passwordValidate });
                }
                    console.log(result)
                
            }
        })
    }
    render() {
        return `
        <div class="block__outer">
            <div class="block__enter">
                <h2>Log In</h2>
                <div class="block__login">
                    {{{ControlledInput
                        name="login"
                        label="Login"
                        type="text"
                        ref="login"
                        validation="${Validator.login}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="password"
                        label="Password"
                        type="password"
                        ref="password"
                        validation="${Validator.password}" 
                    }}}
                </div>
                <div>
                    {{{Button text="Enter" onClick=onLogin}}}
                </div>
                </div>
            </div>
        </div>
        `
    }
}