import { SPECIAL_CARD_VALUES, NO_ESTIMATION } from '../model/cardSpecs';
import { computeMedian } from './consensusCalculation';


describe('Happy Day', () => {
    test('compute median from single-num array - with 2', () => {
        expect(computeMedian([2])).toBe(2);
    })
    test('compute median from single-num array - with 0', () => {
        expect(computeMedian([0])).toBe(0);
    })
    test('compute median from 2-sized array of zeros only', () => {
        expect(computeMedian([0, 0])).toBe(0);
    })
    test('compute median from 2-sized array w/ different values', () => {
        expect(computeMedian([1, 4])).toBe(4);
    })
    test('compute median from array of length 3', () => {
        expect(computeMedian([100, 2, 1])).toBe(2);
    })
    test('compute median from array of length 4 #1', () => {
        expect(computeMedian([100, 100, 2, 1])).toBe(100);
    })
    test('compute median from array of length 4 #2', () => {
        expect(computeMedian([100, 2, 2, 1])).toBe(2);
    })
    test('compute median from array of length 5 - with a 0', () => {
        expect(computeMedian([100, 2, 0, 2, 1])).toBe(2);
    })
    test('compute median from array of length 10 - with a 0', () => {
        expect(computeMedian([100, 2, 0, 2, 1, 3, 8, 21, 3, 3])).toBe(3);
    })
    test('compute median from array with shrug (to be ignored)', () => {
        expect(computeMedian([2, SPECIAL_CARD_VALUES.SHRUG.value, 4])).toBe(4);
    })
    test('compute median from array with break (to be ignored)', () => {
        expect(computeMedian([2, SPECIAL_CARD_VALUES.BREAK.value, 4])).toBe(4);
    })
    test('compute median from array with no-estimation (to be ignored)', () => {
        expect(computeMedian([2, NO_ESTIMATION, 4])).toBe(4);
    })
});

describe('Invalid input', () => {
    test('empty array', () => {
        expect(() => computeMedian([])).toThrowError('Estimations must be a non-empty array of ints: ');
    })
    test('not-an-int', () => {
        expect(() => computeMedian([2, "I'm not an int"])).toThrowError("Estimations must be a non-empty array of ints: 2,I'm not an int");
    })
});

describe('Real world examples', () => {
    test('shrug and values 1, 1, 2, 3, 3', () => {
        expect(computeMedian([SPECIAL_CARD_VALUES.SHRUG.value, 1, 1, 2, 3, 3])).toBe(2);
    })
    test('shrug and values 2, 2, 3, 3, 3', () => {
        expect(computeMedian([SPECIAL_CARD_VALUES.SHRUG.value, 2, 2, 3, 3, 3])).toBe(3);
    })
});

