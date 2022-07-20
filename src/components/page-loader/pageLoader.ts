import Block from '../../core/Block';
import './pageLoader.css';

export class PageLoader extends Block {
    static componentName = 'PageLoader';

    render(): string {
        return `
            <div class="overlay">
                <div class="load">
                    Loading...
                </div>
            </div>
        `;
    }
}
