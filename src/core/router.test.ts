/* eslint-disable max-classes-per-file */
import Block from './Block';
import Router from './Router';

jest.mock('nanoid', () => {
    return {
        nanoid: (num: number) => Math.floor(Math.random() * num),
    };
});

describe('Router', () => {
    const router = new Router();

    test('Should be a singletone class', () => {
        const testRouter = new Router();
        expect(router).toEqual(testRouter);
    });

    test('Should update history of browser', () => {
        router.go('/pa');
        expect(window.history.length).toEqual(2);
    });

    test('Should Block use router', () => {
        class Login extends Block { }
        class Profile extends Block { }
        class Chats extends Block { }

        router
            .use('/login', Login)
            .use('/pa', Profile)
            .use('/chats', Chats);

        expect(router.getRoutes().length).toEqual(3);
    });
});
