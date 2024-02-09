
import { SPECIAL_CARD_VALUES, NO_ESTIMATION } from "../model/cardSpecs";


/**
 * Returns the median for the given estimations.
 * 
 * Ignores `SPECIAL_CARD_VALUES.BREAK.value`, `SPECIAL_CARD_VALUES.SHRUG.value` and `NO_ESTIMATION`.
 * 
 * @param {Int8Array} estimations non-empty array of estimations
 * @returns median (middle value of all asc sorted values)
 * @throws Error if input isn't a non-empty array of ints
 */
export function computeMedian(estimations) {
    validateInput(estimations);

    let filtered =
        estimations.filter(e => e !== SPECIAL_CARD_VALUES.BREAK.value
            && e !== SPECIAL_CARD_VALUES.SHRUG.value
            && e !== NO_ESTIMATION);

    filtered.sort((a, b) => a - b);

    const length = filtered.length;

    let middleIndex = Math.floor(length / 2);

    return filtered[middleIndex];
}

function validateInput(estimations) {
    const errMsg = "Estimations must be a non-empty array of ints: " + estimations;

    if (!Array.isArray(estimations) || estimations.length < 1) {
        throw new Error(errMsg);
    }

    const hasNonInts = estimations.filter(e => !Number.isInteger(e)).length > 0;
    if (hasNonInts) {
        throw new Error(errMsg);
    }
}

