import Block from '../../core/Block';

import '../../css/error.css';

export class Page500 extends Block {
    render() {
        return `
            <div class="outer">
                <h1>5** статус ошибки!</h1>
                <h2>Ошибка на стороне сервера</h2>
                <h3>Кто-то в этом месяце не получит зарплату...</h3>
            </div>
        `;
    }
}
