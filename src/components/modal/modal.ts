import { Block } from '../../core';
import { searchUser } from '../../services/user';
import { withStore } from '../../utils';
import './modal.css';

interface modalProps {
    close: () => void
}

class Modal extends Block {
    static componentName = 'Modal';

    constructor(props: modalProps) {
        super(props);
        this.setProps({
            close: () => this.props.store.dispatch({ openModal: false }),
            search: () => {
                const loginInput: HTMLInputElement = this.element?.querySelector('input[name="searchLogin"]')!;
                if (loginInput.value !== '') {
                    this.props.store.dispatch(searchUser, { login: loginInput.value });
                } else {
                    this.refs.searchLogin.refs.error.setProps({ error: 'Cannot be empty!' });
                }
            },
        });
    }

    render() {
        const {
            isLoading, openModal, activeChat: { users }, user: { id }, searchResult,
        } = this.props.store.getState();

        if (!openModal) {
            return '<span></span>';
        }
        return `
            <div class="overlay">
                <div class="modal">
                    <div class="header">
                        Users
                    </div>
                    <div class="close">
                        {{{Logout text="Close" onClick=close}}}
                    </div>
                    <div class="header__2">
                        <div class="header__3">
                            <div class="head">Added users</div>
                            <div class="modalBody">
                                ${users.map((user:User, i: number) => `
                                <div class="userBlock">
                                    <span>${user.displayName || `${user.firstName} ${user.secondName}`}</span>
                                    ${user.id !== id ? `{{{AddUser text="Delete" index=${i}}}}` : ''}
                                </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="header__3">
                            <div class="head">New user</div>
                            <div class="modalBody">
                                <div class="searchControl">
                                    {{{ControlledInput
                                        name="searchLogin"
                                        label="login"
                                        ref="searchLogin"
                                    }}}
                                    ${isLoading ? '{{{Loader}}}' : '{{{Button text="Search" onClick=search}}}'}
                                </div>
                                ${searchResult.map((user: User, i:number) => `
                                <div class="userBlock">
                                    <span>${user.displayName || `${user.firstName} ${user.secondName}`}</span>
                                    ${user.id !== id
        ? `{{{AddUser text="Add" index=${i}}}}`
        : ''}
                                </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                <div>
            <div>
        `;
    }
}

export default withStore(Modal);
