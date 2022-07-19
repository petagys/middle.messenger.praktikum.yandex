import { Router, Store } from '../../core';
import Block from '../../core/Block';
import { withStore } from '../../utils';
import { withRouter } from '../../utils/withRouter';

import './logout.css';

interface LogoutProps {
    router: Router,
    text: string,
    store: Store<AppState>,
    onClick: () => void
}

class Logout extends Block {
    static componentName = 'Logout';

    constructor({
        text, router, store, onClick,
    }: LogoutProps) {
        super({
            text,
            router,
            store,
            events: {
                click: onClick,
            },
        });
    }

    render(): string {
        return `
            <span>${this.props.text}</span>
        `;
    }
}

export default withStore(withRouter(Logout));
