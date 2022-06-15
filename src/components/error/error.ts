import Block from '../../core/Block';
import './error.css';

interface ErrorProps {
    error: string,
}

export class Error extends Block {
    render(): string {
        return `
            <div class="error">{{#if error}}{{error}}{{/if}}</div>
        `
    }

}