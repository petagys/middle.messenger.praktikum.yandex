import Block from '../../core/Block';

import '../../css/login-page.css';
import { Validator } from '../../helpers/validator';

interface LoginPageProps { }

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        super({
            ...props,
            onInput: () => console.log('input'),
            onFocus: () => console.log('focus'),
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
                        onFocus=onFocus
                        onInput=onInput
                        onBlur=onBlur
                        validation="${Validator.login}" 
                    }}}
                </div>
                <div class="block__login">
                    {{{ControlledInput
                        name="password"
                        label="Password"
                        type="password"
                        onFocus=onFocus
                        onInput=onInput
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