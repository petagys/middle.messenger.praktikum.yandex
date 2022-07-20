import { Router } from '../../core';
import Block from '../../core/Block';
import arrowBack from '../../images/arrow_left.svg';
import { withRouter } from '../../utils/withRouter';

import './back.css';

interface BackProps {
    router: Router,
    onClick: () => void
}

class Back extends Block {
    static componentName = 'Back';

    constructor({ router }: BackProps) {
        super({
            router,
            events: {
                click: () => {
                    router.back();
                },
            },
        });
    }

    render(): string {
        return `
            <div title="Go back" class="return">
                <img src="${arrowBack}" alt="arrow back" />
            </div>
        `;
    }
}

export default withRouter(Back);
