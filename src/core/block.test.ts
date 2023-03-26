import Block from './Block';

jest.mock('nanoid', () => {
    return {
        nanoid: (num: number) => Math.floor(Math.random() * num),
    };
});

describe('Block', () => {
    class Test extends Block<{ data: string }> {
        render() {
            return `<div>${this.props.data}</div>`;
        }
    }

    const data = 'check test';
    const testBlock = new Test({ data });

    test('should receive props', () => {
        expect(testBlock.props.data).toEqual(data);
    });

    test('should return block string', () => {
        expect(testBlock.render()).toEqual(`<div>${data}</div>`);
    });
});
