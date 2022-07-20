import { Block, Store } from '../../core';
import { deleteUser } from '../../services/chats';
import { withStore } from '../../utils';
import './deleteUser.css';

interface DeleteUserProps {
    onClick: () => void,
    text: string,
    index: number,
    store: Store<AppState>
}

class DeleteUser extends Block {
    static componentName = 'DeleteUser';

    constructor({ onClick, ...props }: DeleteUserProps) {
        super({
            ...props,
            events: {
                click: () => {
                    const { activeChat: { id, users } } = this.props.store.getState();
                    this.props.store.dispatch(deleteUser, { user: users[props.index], chatId: id });
                },
            },
        });
    }

    render() {
        const { text } = this.props;
        return `
            '<span class="del">{{{Logout text="${text}"}}}</span>'
        `;
    }
}

export default withStore(DeleteUser);
