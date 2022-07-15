import Block from '../../core/Block';
import chatList from '../../data/chatList.json';
import attache from '../../images/attache.svg';
import arrowRight from '../../images/arrow_right.svg';
import menu from '../../images/menu.svg';

import './chat.css';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';

class ChatPage extends Block {
    componentDidMount() {
        if (!this.props.store.getState().user) {
            // this.props.router.go('/');
        }
    }

    render() {
        console.log(this.props);
        const { user, pageLoading } = this.props.store.getState();

        if (pageLoading) {
            return '{{{PageLoader}}}';
        }

        if (!user) {
            return `
        <div>
            <div class="outer">
                User isn't authorized!
            </div>
        </div>
        `;
        }

        return `
        <div class="main">
            <div class="block__chats">
                <div class="searchProfileBlock">
                    <div class="block__link-profile">
                        <a href="${document.location.origin}/pa" class="greyLink">Profile ></a>
                    </div>
                    <div class="block__search">
                        <input class="searchInput" placeholder="Search..." name="search" type="text" />
                    </div>
                    <div class="block__list">
                        ${chatList.map(({
        title, text, notifications, dateText, // eslint-disable-next-line
    }: Record<string, string | number>) => `{{{ChatElement title="${title}" text="${text}" notifications="${notifications}" dateText="${dateText}"}}}`).join('')}
                    </div>
                </div>
            </div>
            <div class="block__personalChat">
                <div class="flexBlock chatHeader">
                    <div class="flexBlock">
                        <div class="chat__avatar"></div>
                        <span class="chat__name">Дмитрий Виноградов</span>
                    </div>
                    <img class="icon" src="${menu}" alt="menu" />
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
        </div>
        `;
    }
}

export default withRouter(withStore(ChatPage));
