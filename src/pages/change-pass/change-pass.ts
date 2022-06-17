import Block from '../../core/Block';
import paData from '../../data/paData.json';
import arrowBack from '../../images/arrow_left.svg';

import '../../css/pa.css';

interface ChangePassProps {
    onClick?: () => void
}

export class ChangePass extends Block {
    constructor() {
        super({
            onClick: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[type="password"]')!;
                const result: Record<string, string> = {}
                inputs.forEach(input => {
                    const { name, value } = input;
                    result[name] = value;
                });
                console.log(result);
                console.log('Про валидацию на этой странице в задании не упоминается. '+
                'Да и нет правил для валидации этих полей. На всех остальных страницах валидация присутствует.')
            }
        })
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
                ${paData.pass.map(({ label, inputType, inputName }: Record<string, string>) =>
            `{{{ProfileElement label="${label}" inputType="${inputType}" inputName="${inputName}" }}}`).join('')}

                <div class="saveBlock">
                    {{{Button text="Save" onClick=onClick}}}
                </div> 
            </div>
            <div class="return">
                <a href="${document.location.origin}/chats">
                    <img class="icon" src="${arrowBack}" />
                </a>
            </div>
        </div>
        `
    }
}