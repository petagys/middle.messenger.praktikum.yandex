import Block from '../../core/Block';
import paData from '../../data/paData.json';

import '../../css/pa.css';
import { validateValue } from '../../helpers/validator';
import { withStore } from '../../utils/withStore';
import { Router, Store } from '../../core';
import { withRouter } from '../../utils/withRouter';
import { changeProfile } from '../../services/user';
import { logout } from '../../services/auth';
import { UserDTO } from '../../api/types';
import { transformUserBack } from '../../utils/apiTransformers';

type ProfileProps = {
    router: Router,
    store: Store<AppState>,
    onClick?: () => void,
    logout?: () => void
}

class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super({
            ...props,
            onClick: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[type="text"]')!;
                const result: Record<string, string> = {};
                const errors: { [key: string]: string } = {};
                inputs.forEach(input => {
                    const { name, value } = input;
                    result[name] = value;
                    const errorText: string = validateValue(name, value);
                    if (errorText !== '') {
                        errors[name] = errorText;
                    }
                });
                const keys = Object.keys(errors);
                if (!keys.length) {
                    this.props.store.dispatch(changeProfile, result);
                } else {
                    keys.forEach(key => {
                        this.refs[key].refs.error.setProps({ error: errors[key] });
                    });
                }
                console.log(result);// eslint-disable-line no-console
            },
            logout: () => this.props.store.dispatch(logout),
        });
    }

    render() {
        const {
            user, pageLoading, loginFormError, isLoading,
        } = this.props.store.getState();

        if (pageLoading) {
            return '{{{PageLoader}}}';
        }
        if (!user) {
            return `
        <div>
            <div class="outer">
                User isn't authorized!!
            </div>
        </div>
        `;
        }
        const transformedUser: UserDTO = transformUserBack(user as User);

        return `
        <div>
            <div class="outer">
                <div class="circle"
                ${transformedUser.avatar
        ? `style="background-image: url(${process.env.API_ENDPOINT}/resources/${transformedUser.avatar})"` : ''}>
                    <div class="circle__text">
                        <label for="avatar">Change avatar</label>
                        {{{Avatar}}}
                    </div>
                </div>
                <div class="info">@${transformedUser.login}</div>
                <div class="info">${transformedUser.first_name} ${transformedUser.second_name}</div>
                <div class="info">${transformedUser.email}</div>
                <div class="info">${transformedUser.phone}</div>
                <div class="info">${transformedUser.display_name ? transformedUser.display_name : ''}</div>
                ${
    paData.pa.map(({ label, inputType, inputName }: Record<string, string>) => {
        return `
    {{{ProfileElement
        label="${label}"
        inputType="${inputType}"
        inputName="${inputName}"
        ref="${inputName}"
        value="${transformedUser[inputName] || ''}"
        validation="${inputName}" }}}
    `;
    }).join('')
}

                <div class="error-block">
                    ${loginFormError || ''}
                </div>
                <div class="saveBlock">
                    ${isLoading ? '{{{Loader}}}' : '{{{Button text="Change profile data" onClick=onClick}}}'}
                </div>
                <div class="infoBlock left">
                    {{{Link text="Change password" link="/change-pass"}}}
                </div>
                <div class="infoBlock left exit">
                    {{{Logout text="Logout" onClick=logout}}}
                </div>
            </div>
            {{{Back}}}
        </div>
        `;
    }
}

export default withRouter(withStore(Profile));
