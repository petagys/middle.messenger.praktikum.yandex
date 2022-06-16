import Block from '../../core/Block';
import err404 from '../../images/404.svg';

import '../../css/error.css';

export class Page404 extends Block {

    render() {
        return `
            <div class="outer">
                <img src="${err404}" />
                <h2>Страница не найдена</h2>
                <h3>Поворот не туда...</div>
            </div>
        `
    }
}