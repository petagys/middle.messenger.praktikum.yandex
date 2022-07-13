import Block from '../../core/Block';
import paData from '../../data/paData.json';

import '../../css/pa.css';

export class ChangePass extends Block {
    constructor() {
        super({
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

    render() {
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
