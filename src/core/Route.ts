import { Block, renderDOM } from '.';
import { BlockClass } from './Block';

type props = Record<string, any>;

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

export default class Route<P = any> {
    #pathname: string;

    #blockClass: BlockClass<P>;

    #block: Block | null = null;

    #props: props;

    #isPrefixId: boolean | undefined;

    constructor(pathname: string, view: BlockClass<P>, props: props) {
        this.#isPrefixId = pathname.includes(':id');
        this.#pathname = pathname.replace('/:id', '');
        this.#blockClass = view;
        this.#props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }

    leave() {
        if (this.#block) {
            this.#block.hide();
        }
    }

    match(pathname: string) {
        if (this.#isPrefixId) {
            pathname = pathname.replace(/\/\d+/, '');
        }
        return isEqual(pathname, this.#pathname);
    }

    #prefixHandler() {
        const id = Number(window.location.pathname.replace(/[a-zA-Z/]+/, ''));
        return { id };
    }

    render() {
        const { id } = this.#prefixHandler();

        if (!this.#block) {
            this.#block = new this.#blockClass({ ...this.#props, idPath: id });
            renderDOM(this.#block);
            return;
        }

        this.#block.setProps({ idPath: id });
        renderDOM(this.#block);
        this.#block.show();
    }
}
