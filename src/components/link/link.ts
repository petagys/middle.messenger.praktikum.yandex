import { Block, Router } from '../../core';
import { withRouter } from '../../utils';

interface LinkProps {
    text: string,
    router: Router,
    link: string
}

class Link extends Block {
    public static componentName = 'Link';

    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => props.router.go(props.link),
            },
        });
    }

    render() {
        return `
            <a>{{text}}</a>
        `;
    }
}

export default withRouter(Link);
