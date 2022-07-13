import Block from '../../core/Block';
import paData from '../../data/paData.json';

import '../../css/pa.css';
import { validateValue } from '../../helpers/validator';
import { withStore } from '../../utils/withStore';
import { Router, Store } from '../../core';
import { withRouter } from '../../utils/withRouter';

type ProfileProps = {
    router: Router,
    store: Store<AppState>,
    onClick?: () => void
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
                Object.keys(errors).forEach(key => {
                    this.refs[key].refs.error.setProps({ error: errors[key] });
                });
                console.log(result);// eslint-disable-line no-console
            },
        });
    }

    componentDidMount() {
        if (!this.props.store.getState().user) {
            this.props.router.go('/');
        }
    }

    render() {
        if (!this.props.store.getState().user) {
            return `
        <div>
            <div class="outer">
                User isn't authorized!
            </div>
        </div>
        `;
        }

        return `
        <div>
            <div class="outer">
                <div class="circle">
                    <div class="circle__text">
                        <label for="avatar">Change avatar</label>
                        <input type="file" name="avatar" id="avatar">
                    </div>
                </div>
                ${
    // eslint-disable-next-line max-len
    paData.pa.map(({ label, inputType, inputName }: Record<string, string>) => `{{{ProfileElement label="${label}" inputType="${inputType}" inputName="${inputName}" ref="${inputName}" validation="${inputName}" }}}`).join('')
}

                <div class="saveBlock">
                    {{{Button text="Change profile data" onClick=onClick}}}
                </div>
                <div class="infoBlock left">
                    <a href="${document.location.origin}/change-pass">Change password</a>
                </div>
                <div class="infoBlock left">
                    <a href="${document.location.origin}/login" class="exit">Log out</a>
                </div>
            </div>
            {{{Back}}}
        </div>
        `;
    }
}

export default withRouter(withStore(Profile));
