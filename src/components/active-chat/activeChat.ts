/* eslint-disable camelcase */
import { Block, Store } from '../../core';
import { withStore } from '../../utils';
import './activeChat.css';

import attache from '../../images/attache.svg';
import { sendMessage } from '../../services/chats';

interface ActiveChatProps {
    openModal: () => {},
    openClick: () => {},
    store: Store<AppState>
}
class ActiveChat extends Block {
    static componentName = 'ActiveChat';

    constructor(props: ActiveChatProps) {
        super(props);
        this.setProps({
            openModal: () => this.props.store.dispatch({ openModal: true }),
            onClick: () => {
                const message: HTMLInputElement = this.element?.querySelector('input[name="message"]')!;
                if (message.value !== '') {
                    const forbiddenSymbols: RegExp = /[<>&]/g;
                    this.props.store.dispatch(sendMessage, message.value.replace(forbiddenSymbols, (symbol: string) => {
                        return `&#${symbol.charCodeAt(0)};`;
                    }));
                }
            },
        });
    }

    render() {
        const { activeChat: { title, messages }, loadChat, user } = this.props.store.getState();

        if (loadChat) {
            return `<div class="loadOut">
                <div class="loadIn">Loading...</div>
            </div>`;
        }

        return `
        <div class="block__personalChat">
            <div class="flexBlock chatHeader">
                <div class="flexBlock">
                    <div class="chat__avatar"></div>
                    <span class="chat__name">${title}</span>
                </div>
                <div>
                    ${title && '{{{UserModal onClick=openModal}}}'}
                </div>
            </div>
            <div class="chatArea">
                ${messages.map((mes: Message) => `
                    <div class="messageLine ${mes.user_id === user.id ? 'myMes' : ''}">
                        <div class="message">
                            ${mes.content}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="flexBlock chatFooter">
                ${title ? `<img class="icon__attachment" src="${attache}" alt="attache" />
                {{{MessageInput onChange=onChange}}}
                {{{Send onClick=onClick}}}` : ''}
            </div>
        </div>
        `;
    }
}

export default withStore(ActiveChat);
