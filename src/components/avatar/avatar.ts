import { Router, Store } from '../../core';
import Block from '../../core/Block';
import { logout } from '../../services/auth';
import { changeAvatar } from '../../services/user';
import { withStore } from '../../utils';
import httpController from '../../utils/httpController';

import './avatar.css';

interface AvatarProps {
    router: Router,
    store: Store<AppState>,
    onChange?: () => void
}

class Avatar extends Block {
    static componentName = 'Avatar';

    constructor({ router, store }: AvatarProps) {
        super({
            router,
            store,
            events: {
                change: (e:Event) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append('avatar', e.target!.files[0]);
                    this.props.store.dispatch(changeAvatar, formData);
                },
            },
        });
    }

    render(): string {
        return `
            <input accept="image/*" type="file" name="avatar" id="avatar">
        `;
    }
}

export default withStore(Avatar);
