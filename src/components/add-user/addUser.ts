import { Block, Store } from '../../core';
import { addUser } from '../../services/chats';
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
                    const { searchResult, activeChat: { id } } = this.props.store.getState();
                    this.props.store.dispatch(addUser, { user: searchResult[props.index], chatId: id });
                },
            },
        });
    }

    render() {
        const { text } = this.props;
        return `
            '<span class="add">{{{Logout text="${text}"}}}</span>'
        `;
    }
}

export default withStore(AddUser);
