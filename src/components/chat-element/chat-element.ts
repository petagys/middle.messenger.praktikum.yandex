import Block from '../../core/Block';
import './chat-element.css';

interface ChatElementProps {
    text: string,
    title: string,
    dateText: string,
    notifications: number,
}

export class ChatElement extends Block {
    static get blockName():string {
        return 'ChatElement';
    }

    render(): string {
        return `
            <div class="chat">
                <div class="chat__avatar"></div>
                <div class="chat__message">
                    <div class="chat__name">{{title}}</div>
                    <div class="chat__text ellipsis">
                        <span class="chat__text-inner">
                            {{text}}
                        </span>
                    </div>
                </div>
                <div class="chat__info">
                    <div class="chat__timedate">{{dateText}}</div>
                    <div class="chat__notification">{{notifications}}</div>
                </div>
            </div>
        `;
    }
}
