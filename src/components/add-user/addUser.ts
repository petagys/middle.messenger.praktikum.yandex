import { UserDTO } from '../../api/types';
import { Block, Store } from '../../core';
import { addUser, deleteUser } from '../../services/chats';
import { withStore } from '../../utils';
import './addUser.css';

interface AddUserProps{
    onClick: () => void,
    text: string,
    index: number,
    store: Store<AppState>
}

class AddUser extends Block {
    static componentName = 'AddUser';

    constructor({ onClick, ...props }: AddUserProps) {
        super({
            ...props,
            events: {
                click: () => {
                    const { searchResult, activeChat: { id, users } } = this.props.store.getState();

                    if (props.text === 'Delete') {
                        this.props.store.dispatch(deleteUser, { user: users[props.index], chatId: id });
                    } else {
                        this.props.store.dispatch(addUser, { user: searchResult[props.index], chatId: id });
                    }
                    console.log(searchResult[props.index], id);
                },
            },
        });
    }

    render() {
        const { text } = this.props;
        return `
            '<span class="${text === 'Delete' ? 'del' : 'add'}">{{{Logout text="${text}"}}}</span>'
        `;
    }
}

export default withStore(AddUser);
