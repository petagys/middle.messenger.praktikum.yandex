import Block from '../../core/Block';
import paData from '../../data/paData.json';
import arrowBack from '../../images/arrow_left.svg';

import '../../css/pa.css';

interface ProfileProps { };

export class Profile extends Block {
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
            }
        })
    }

    render() {
        console.log(arrowBack)
        return `
        <div>
            <div class="outer">
                <div class="circle">
                    <div class="circle__text">
                        <label for="avatar">Change avatar</label>
                        <input type="file" name="avatar" id="avatar">
                    </div>
                </div>
                ${paData.pa.map(({ label, inputType, inputName, value }: Record<string, string>) =>
            `{{{ProfileElement label="${label}" inputType="${inputType}" inputName="${inputName}" value="${value}" disabled="disabled"}}}`).join('')}

                <div class="saveBlock">
                    {{{Button text="Save" onClick=onClick}}}
                </div> 
            </div>
            <div class="return">
                <a href="chat.hbs">
                    <img class="icon" src="${arrowBack}" />
                </a>
            </div>
        </div>
        `
    }
}