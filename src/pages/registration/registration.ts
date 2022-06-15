import Block from '../../core/Block';

import '../../css/login-page.css';

export class RegPage extends Block {
    render() {
        return `
        <div class="block__outer">
            <div class="block__enter">
                <h2>Sign Up</h2>
                <div class="block__inputs-signUp">
                <div class="block__login">
                    {{{Input name="first_name" label="Name" type="text"}}}
                </div>
                <div class="block__login">
                    {{{Input name="second_name" label="Surname" type="text"}}}
                </div>
                <div class="block__login">
                    {{{Input name="login" label="Login" type="text"}}}
                </div>
                <div class="block__login">
                    {{{Input name="email" label="E-mail" type="text"}}}
                </div>
                <div class="block__login">
                    {{{Input name="phone" label="Phone" type="text"}}}
                </div>
                <div class="block__login">
                    {{{Input name="password" label="Password" type="password"}}}
                </div>
                <div class="block__login">
                    {{{Input name="confirm_password" label="Confirm password" type="password"}}}
                </div>
                </div>

                <div>
                    {{{Button text="Create profile"}}}
                </div>
                <div class="block__link">
                    <a href="index.hbs">Enter</a>
                </div>
            </div>
        </div>
        `
    }
}