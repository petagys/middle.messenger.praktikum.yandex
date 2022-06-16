import Block from '../../core/Block';

import '../../css/pa.css';

export class ChangePass extends Block {

    render() {
        return `
            <div class="outer">
                <div class="circle">
                    <div class="circle__text">
                        <label for="avatar">Change avatar</label>
                        <input type="file" name="avatar" id="avatar">
                    </div>
                </div>
                {{#each paData.pass}} {{> profileElement label=this.label value=this.value inputType=this.inputType
                inputName=this.inputName}}
                {{/each}}

                <div class="saveBlock">
                    {{> button text="Save"}}
                </div> 
            </div>
            <div class="return">
                <a href="chat.hbs">
                    <img class="icon" src="../images/arrow_left.svg" />
                </a>
            </div>
        `
    }
}