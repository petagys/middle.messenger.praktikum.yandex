import Block from '../../core/Block';
import paData from '../../data/paData.json';

import '../../css/pa.css';
import { withStore } from '../../utils/withStore';
import { withRouter } from '../../utils/withRouter';
import { Router, Store } from '../../core';

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
                console.log(result);// eslint-disable-line
                // eslint-disable-next-line
                console.log('Про валидацию на этой странице в задании не упоминается. '
                + 'Да и нет правил для валидации этих полей. На всех остальных страницах валидация присутствует.');
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
        /* eslint-disable-next-line max-len */
    paData.pass.map(({ label, inputType, inputName }: Record<string, string>) => `{{{ProfileElement label="${label}" inputType="${inputType}" inputName="${inputName}" }}}`).join('')
}

                <div class="saveBlock">
                    {{{Button text="Save" onClick=onClick}}}
                </div> 
            </div>
            {{{Back}}}
        </div>
        `;
    }
}

export default withRouter(withStore(ChangePass));
