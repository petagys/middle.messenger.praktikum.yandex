import { Block, Router, Store } from '../../core';
import { withStore } from '../../utils';
import menu from '../../images/menu.svg';

interface UserModalProps {
    router: Router,
    store: Store<AppState>,
    onClick: () => void
}

class UserModal extends Block {
    static componentName = 'UserModal';

    constructor({ router, store }: UserModalProps) {
        super({
            router,
            store,
            events: {
                click: () => this.props.store.dispatch({ openModal: true }),
            },
        });
    }

    render() {
        return `
            <img class="icon" src="${menu}" alt="menu" />
        `;
    }
}

export default withStore(UserModal);
