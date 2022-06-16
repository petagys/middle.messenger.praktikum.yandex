import Block from '../../core/Block';
import chatList from '../../data/chatList.json';
import attache from '../../images/attache.svg';
import arrow_right from '../../images/arrow_right.svg';
import menu from '../../images/menu.svg';

import './chat.css';

interface ChatPageProps { }

export class ChatPage extends Block {

    render() {
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
                        ${chatList.map(({ title, text, notifications, dateText }: Record<string, string | number>) =>
            `{{{ChatElement title="${title}" text="${text}" notifications="${notifications}" dateText="${dateText}"}}}`).join('')}
                    </div>
                </div>
            </div>
            <div class="block__personalChat">
                <div class="flexBlock chatHeader">
                    <div class="flexBlock">
                        <div class="chat__avatar"></div>
                        <span class="chat__name">Дмитрий Виноградов</span>
                    </div>
                    <img class="icon" src="${menu}" />
                </div>
                <div class="chatArea">

                </div>
                <div class="flexBlock chatFooter">
                    <img class="icon__attachment" src="${attache}" />
                    <input
                        class="messageField"
                        type="text"
                        name="message"
                        placeholder="Message" />
                    <img class="icon__send" src="${arrow_right}" />
                </div>
            </div>
        </div>
        `
    }
}