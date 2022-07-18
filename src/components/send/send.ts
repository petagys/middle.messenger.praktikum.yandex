import { Block } from '../../core';
import './send.css';

import arrowRight from '../../images/arrow_right.svg';

interface SendProps {
    onClick?: () => {},
}

export class Send extends Block {
    static componentName = 'Send';

    constructor({ onClick }: SendProps) {
        super({
            events: { click: onClick },
        });
    }

    render() {
        return `
            <img class="icon__send" src="${arrowRight}" alt="send" />
        `;
    }
}
