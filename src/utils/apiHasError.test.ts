import { hasError } from './apiHasError';

jest.mock('nanoid', () => {
    return {
        nanoid: (num: number) => Math.floor(Math.random() * num),
    };
});

describe('apiHasError', () => {
    test('Should be error text', () => {
        const response = {
            reason: 'Some error',
        };

        expect(hasError(response)).toEqual(response.reason);
    });
});
