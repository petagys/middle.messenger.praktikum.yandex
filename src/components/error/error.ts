import Block from '../../core/Block';
import './error.css';

export class Error extends Block {
    static componentName = 'Error';

    render(): string {
        return `
            <div class="error">{{#if error}}{{error}}{{/if}}</div>
        `;
    }
}
