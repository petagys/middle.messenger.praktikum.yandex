import Block from '../../core/Block';
import { getChatInfo } from '../../services/chats';
import { withRouter, withStore } from '../../utils';
import './chat-element.css';

class ChatElement extends Block {
    static componentName = 'ChatElement';

    constructor(props: any) {
        super({
            ...props,
            events: {
                click: () => {
                    this.props.store.dispatch(getChatInfo, {
                        id: this.props.id,
                        title: this.props.title,
                    });
                },
            },
        });
    }

    render(): string {
        return `
            <div class="chat">
                <div class="chat__avatar"></div>
                <div class="chat__message">
                    <div class="chat__name">{{title}}</div>
                    <div class="chat__text ellipsis">
                        <span class="chat__text-inner">
                            ${this.props.text.replace(/[\u00A0-\u9999<>&]/g, (i) => {
        return `&#${i.charCodeAt(0)};`;
    })}
                        </span>
                    </div>
                </div>
                <div class="chat__info">
                    <div class="chat__timedate">{{dateText}}</div>
                    {{#if notifications}}<div class="chat__notification">{{notifications}}</div>{{/if}}
                </div>
            </div>
        `;
    }
}

export default withRouter(withStore(ChatElement));
