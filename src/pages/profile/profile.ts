import Block from '../../core/Block';
import paData from '../../data/paData.json';
import arrowBack from '../../images/arrow_left.svg';

import '../../css/pa.css';

interface ProfileProps {
    onClick?: () => void
};

export class Profile extends Block {
    constructor() {
        super({
            onClick: () => {
                const inputs: NodeListOf<HTMLInputElement> = this.element?.querySelectorAll('input[disabled]')!;
                const result: Record<string, string> = {}
                inputs.forEach(input => {
                    const { name, value } = input;
                    result[name] = value;
                });
                console.log(result);
                console.log('Будет реализовано позже. Пока перебраывает на страницу регситрации. Переход произойдет через 5 секунд...')
                setTimeout(() => { window.location.href = `${document.location.origin}/registration` }, 5000);
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
                    {{{Button text="Change profile data" onClick=onClick}}}
                </div>
                <div class="infoBlock left">
                    <a href="${document.location.origin}/change-pass">Change password</a>
                </div>
                <div class="infoBlock left">
                    <a href="${document.location.origin}/login" class="exit">Log out</a>
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