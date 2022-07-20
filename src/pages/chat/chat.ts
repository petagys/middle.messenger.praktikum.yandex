/* eslint-disable camelcase */
import Block from '../../core/Block';

import './chat.css';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';
import { addChat, getChats } from '../../services/chats';
import { Store } from '../../core';

type ChatProps = {
    store: Store<AppState>
}

class ChatPage extends Block {
    constructor(props: ChatProps) {
        super(props);

        this.setProps({
            addChat: () => {
                // eslint-disable-next-line no-alert
                const newName: string = prompt('Enter name of new chat:', '') || '';
                if (newName) {
                    this.props.store.dispatch(addChat, { title: newName });
                }
            },
        });
    }

    componentDidMount(props: any): void {
        this.props.store.dispatch(getChats);
    }

    render() {
        const {
            user, pageLoading, chats, isLoadingChats,
        } = this.props.store.getState();

        if (pageLoading) {
            return '{{{PageLoader}}}';
        }

        if (!user) {
            return `
        <div>
            <div class="outer">
                User isn't authorized!!!
            </div>
        </div>
        `;
        }

        return `
        <div>
            <div class="main">
                <div class="block__chats">
                    <div class="searchProfileBlock">
                        <div class="block__link-profile">
                            {{{Link text="Profile >" link="/pa"}}}
                        </div>
                        <div class="addBlock">
                            {{{Button text="Add chat" onClick=addChat}}}
                        </div>
                        <div class="block__search">
                            <input class="searchInput" placeholder="Search..." name="search" type="text" />
                        </div>
                        <div class="block__list">
                            ${isLoadingChats ? 'loading' : chats.map(({
        title, last_message, unread_count, dateText = '', id, // eslint-disable-next-line
                            }: Record<string, string | number>) => {
        let mes = 'No messages yet';
        if (last_message) {
            const forbiddenSymbols:RegExp = /['"&]/g;
            mes = last_message.content.replace(forbiddenSymbols, '');
        }
        return `
                                    {{{ChatElement title="${title}"
                                        id=${id}
                                        text="${mes}"
                                        notifications=${unread_count}
                                        dateText="${dateText}"}}}
                                    `;
    }).join('')}
                        </div>
                    </div>
                </div>
                {{{ActiveChat}}}
                {{{Modal}}}
            </div>
        </div>
        `;
    }
}

export default withRouter(withStore(ChatPage));
