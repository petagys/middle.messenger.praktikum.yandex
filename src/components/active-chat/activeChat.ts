/* eslint-disable camelcase */
import { Block } from '../../core';
import { withRouter, withStore } from '../../utils';
import './activeChat.css';

import attache from '../../images/attache.svg';
import arrowRight from '../../images/arrow_right.svg';

class ActiveChat extends Block {
    static componentName = 'ActiveChat';

    constructor(props) {
        super(props);
        this.setProps({
            openModal: () => this.props.store.dispatch({ openModal: true }),
        });
    }

    render() {
        const { activeChat: { title }, loadChat } = this.props.store.getState();

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

            </div>
            <div class="flexBlock chatFooter">
                <img class="icon__attachment" src="${attache}" alt="attache" />
                <input
                    class="messageField"
                    type="text"
                    name="message"
                    placeholder="Message" />
                <img class="icon__send" src="${arrowRight}" alt="send" />
            </div>
        </div>
        `;
    }
}

export default withRouter(withStore(ActiveChat));
