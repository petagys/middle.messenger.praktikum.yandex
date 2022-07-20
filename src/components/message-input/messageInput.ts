import { Block } from '../../core';
import './messageInput.css';

interface MessageInputProps {
    onChange?: () => {},
    value?: string;
}

export class MessageInput extends Block {
    static componentName = 'MessageInput';

    constructor({ onChange, value }: MessageInputProps) {
        super({
            value,
            events: { input: onChange },
        });
    }

    render() {
        return `
            <input
                class="messageField"
                type="text"
                name="message"
                placeholder="Message" />
        `;
    }
}
