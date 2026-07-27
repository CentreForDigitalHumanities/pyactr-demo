import { getExample, exampleID } from "./examplelist";

describe('exampleID', () => {
    it('strips the file extension', () => {
        expect(exampleID({ name: 'Test', filename: 'test.py'})).toBe('test');
        expect(exampleID({ name: 'Test', filename: 'my.test.py'})).toBe('my.test');
    });
});

describe('exampleFromID', () => {
    const examples = [
        { name: 'Test 1', filename: 'test_1.py' },
        { name: 'Test 2', filename: 'test_2.py' },
    ];

    it('finds examples by filename', () => {
        expect(getExample(examples, 'test_1')).toEqual(examples[0]);
        expect(getExample(examples, 'test_2')).toEqual(examples[1]);
    });

    it('returns undefined with no match', () => {
        expect(getExample(examples, 'does_not_exist')).toBeUndefined();
    });
});
