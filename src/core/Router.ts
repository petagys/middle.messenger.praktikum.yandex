/* eslint-disable max-classes-per-file */
import { BlockClass } from '../core/Block';
import Route from './Route';

type props = Record<string, any>;

export default class Router {
    static __instance: Router;

    #routers: Array<Route> = [];

    #history: History = window.history;

    #currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            // eslint-disable-next-line no-constructor-return
            return Router.__instance;
        }

        Router.__instance = this;
    }

    use<P>(pathname: string, block: BlockClass<P>, props: props = {}) {
        const route = new Route(pathname, block, props);

        this.#routers.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.#currentRoute && this.#currentRoute !== route) {
            this.#currentRoute.leave();
        }

        this.#currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.#history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.#history.back();
    }

    forward() {
        this.#history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        const router = this.#routers.find(route => route.match(pathname));
        return router || this.#routers.find(route => route.match('*'));
    }

    getRoutes(): Array<Route> {
        return this.#routers;
    }
}
