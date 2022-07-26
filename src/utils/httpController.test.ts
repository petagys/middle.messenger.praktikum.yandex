import httpController from './httpController';

describe('HTTPController', () => {
    test('Get user request', () => {
        httpController.get('auth/signin', { login: 'petagys', password: 'Qq123456' })
            .then((response) => {
                expect(response).toEqual('Ok');
            });
    });
});
