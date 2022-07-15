import Block from '../../core/Block';
import paData from '../../data/paData.json';

import '../../css/pa.css';
import { withStore } from '../../utils/withStore';
import { withRouter } from '../../utils/withRouter';
import { Router, Store } from '../../core';
import { changePass } from '../../services/user';
import { validateValue } from '../../helpers/validator';

type ChangePassProps = {
    router: Router,
    store: Store<AppState>,
    onClick: () => void
}

class ChangePass extends Block<ChangePassProps> {
    constructor(props: ChangePassProps) {
        super({
            ...props,
            onClick: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[type="password"]')!;
                const result: Record<string, string> = {};
                inputs.forEach(input => {
                    const { name, value } = input;
                    result[name] = value;
                });

                const errorNewPass: string = validateValue('password', result.newPassword);
                if (errorNewPass !== '') {
                    this.props.store.dispatch({ loginFormError: `New ${errorNewPass}` });
                } else {
                    this.props.store.dispatch(changePass, result);
                }

                console.log(result);// eslint-disable-line
            },
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
        /* eslint-disable-next-line max-len */
    paData.pass.map(({ label, inputType, inputName }: Record<string, string>) => `{{{ProfileElement label="${label}" inputType="${inputType}" inputName="${inputName}" }}}`).join('')
}

                <div class="error-block">
                    ${loginFormError || ''}
                </div>
                <div class="saveBlock">
                    ${isLoading ? '{{{Loader}}}' : '{{{Button text="Save" onClick=onClick}}}'}
                </div>
            </div>
            {{{Back}}}
        </div>
        `;
    }
}

export default withRouter(withStore(ChangePass));
