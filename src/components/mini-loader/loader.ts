import Block from '../../core/Block';

import './loader.css';

export class Loader extends Block {
    static componentName = 'Loader';

    render(): string {
        return `
            <div class="lds-dual-ring"></div>
        `;
    }
}
