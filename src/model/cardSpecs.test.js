import { SPECIAL_CARD_VALUES, NO_ESTIMATION } from './cardSpecs';

describe('Check values', () => {
    test('No-estimation', () => {
        expect(NO_ESTIMATION).toBe(-1);
    })
    test('Shrug', () => {
        expect(SPECIAL_CARD_VALUES.SHRUG.value).toBe(-2);
    })
    test('Break', () => {
        expect(SPECIAL_CARD_VALUES.BREAK.value).toBe(-3);
    })
    test('Cut', () => {
        expect(SPECIAL_CARD_VALUES.CUT.value).toBe(100);
    })

});
