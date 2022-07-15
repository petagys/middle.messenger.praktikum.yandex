import Block from '../../core/Block';

import '../../css/login-page.css';
import { validateValue, Validator } from '../../helpers/validator';
import { login } from '../../services/auth';
import { withStore } from '../../utils';

class LoginPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            onLogin: () => {
                const loginInput: HTMLInputElement = this.element?.querySelector('input[name="login"]')!;
                const passwordInput: HTMLInputElement = this.element?.querySelector('input[name="password"]')!;
                const result: { [key: string | Validator]: string } = {
                    login: loginInput.value,
                    password: passwordInput.value,
                };
                let isError = false;

                const loginValidate: string = validateValue(loginInput.name, loginInput.value);
                const passwordValidate: string = validateValue(passwordInput.name, passwordInput.value);

                if (loginValidate !== '') {
                    isError = true;
                    this.refs.login.refs.error.setProps({ error: loginValidate });
                }
                if (passwordValidate !== '') {
                    isError = true;
                    this.refs.password.refs.error.setProps({ error: passwordValidate });
                }
                console.log(result);// eslint-disable-line no-console
                if (!isError) {
                    this.props.store.dispatch(login, result);
                }
            },
        });
    }

    render() {
        const { pageLoading, loginFormError, isLoading } = this.props.store.getState();

        if (pageLoading) {
            return '{{{PageLoader}}}';
        }
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
                <div class="error-block">
                    ${loginFormError || ''}
                </div>
                <div>
                    ${isLoading ? '{{{Loader}}}' : '{{{Button text="Enter" onClick=onLogin}}}'}
                </div>
                <div class="block__link">
                    <a href="${document.location.origin}/registration">Create account</a>
                </div>
                </div>
            </div>
        </div>
        `;
    }
}

export default withStore(LoginPage);
