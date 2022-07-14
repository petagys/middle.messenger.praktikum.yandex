import Block from '../../core/Block';

import '../../css/login-page.css';
import { validateValue, Validator } from '../../helpers/validator';
import { registration } from '../../services/auth';
import { withRouter, withStore } from '../../utils';

class RegPage extends Block {
    constructor(props: any) {
        super({
            ...props,
            onSignUp: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[name]')!;

                const errors: { [key: string]: string } = {};
                const result: { [key: string]: string } = {};
                inputs.forEach(input => {
                    const { name, value } = input;
                    result[name] = value;
                    const errorText: string = validateValue(name, value);
                    if (errorText !== '') {
                        errors[name] = errorText;
                    }
                });
                const keys = Object.keys(errors);
                if (keys.length) {
                    keys.forEach(key => {
                        this.refs[key].refs.error.setProps({ error: errors[key] });
                    });
                } else {
                    this.props.store.dispatch(registration, result);
                }
                // eslint-disable-next-line
                console.log(result);
            },
        });
    }

    render() {
        const loginError = this.props.store.getState().loginFormError;
        const loading = this.props.store.getState().isLoading;
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
                </div>
                <div class="error-block">
                    ${loginError || ''}
                </div>

                <div>
                     ${loading ? '<div class="lds-dual-ring"></div>'
        : '{{{Button text="Create profile" onClick=onSignUp}}}'}
                </div>
                <div class="block__link">
                    <a href="${document.location.origin}/chats">Enter</a>
                </div>
            </div>
        </div>
        `;
    }
}

export default withRouter(withStore(RegPage));
