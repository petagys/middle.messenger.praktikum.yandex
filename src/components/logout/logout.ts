import { Router, Store } from '../../core';
import Block from '../../core/Block';
import { logout } from '../../services/auth';
import { withStore } from '../../utils';
import { withRouter } from '../../utils/withRouter';

import './logout.css';

interface LogoutProps {
    router: Router,
    store: Store<AppState>,
    onClick: () => void
}

class Logout extends Block {
    static componentName = 'Logout';

    constructor({ router, store }: LogoutProps) {
        super({
            router,
            store,
            events: {
                click: () => {
                    store.dispatch(logout);
                },
            },
        });
    }

    render(): string {
        return `
            <span class="exit">Log out</span>
        `;
    }
}

export default withStore(withRouter(Logout));
