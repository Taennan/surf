
import { range, enumerate } from "./iterables";

import { DisallowedConstructionError } from "errors/code-errors";

/**
 * Static storage class for array manipulation methods
 * All methods contained here are non-destructive
 */
export default
class Dealer {

    /**
     * Takes a 1D array and takes slices of specified length to turn into a 2D array
     * [], Number -> [[]...]
     * @param  {Array} array - [description]
     * @param  {Number} step  - [description]
     * @return {Array} - [description]
     */
    static step(array: [], step: Number): [] {
        let arr = [];
        for (const i of range(array.length)) {
            if (i === 0 && step === 2) arr.push(array.slice(0, 2));
            else if (i % step === 0)   arr.push(array.slice(i, i + step));
        }
        return arr;
    }

    /**
     * Returns both halves of a 1D array
     * Quite like a person cutting a deck of cards
     * [] -> [[], []]
     * @param {Array} array -
     * @param {Boolean} biasFirstHalf -
     * @returns {Array[]}
     */
    static cut(array: [], biasFirstHalf: Boolean=true): [] {
        const halfway = Math.floor(array.length / 2);

        let first  = array.slice(0, halfway);
        let second = array.slice(halfway, array.length);

        if (second.length > first.length && biasFirstHalf) first.push(second.shift());

        return [first, second];
    }

    /**
     * Accepts a single array and returns multiple arrays containing items from the inputted array.
     * Quite like a person dealig out a deck of cards.
     * Does the opposite of 'undeal()'
     * ([...], [Number...]) -> [[], [], []]
     * @param  {Array}    array -
     * @param  {Number[]} ratio -
     * @return {Array[]}
     */
    static deal(array, ratios) {

        /**
         // NOTE: DO NOT fiddle with ANYTHING here for no reason. The code is very delicate
         */

        let arr2D = ratios.map(() => []);

        let ratioTotal = Math.sum(...ratios);
        let totals = [];
        for (const i of range(ratios.length)) {
            let sliceTotal = Math.sum(...ratios.slice(0, i + 1));
            totals.push(sliceTotal);
        }

        for (const [item, ind] of enumerate(array)) {
            for (const [total, i] of enumerate(totals)) {

                const mod = ind % ratioTotal;
                if (mod < total) {
                    arr2D[i].push(item);
                    break;
                }

            }

        }

        return arr2D;
    }


    /**
     * Accepts multiple arrays and concat's them according to the ratio specified.
     * Quite like a person placing cards back in a deck after dealing
     * Does the opposite of 'deal()'
     * [[], [], [], ...], [2, 1, 2, ...] -> [2:1:2]
     * @param  {Array[]}       arrays - [description]
     * @param  {Array[Number]} ratio  - [description]

     * @throws {Error}
     * @return {Array} - [description]
     */
    static undeal(arrays, ratios) {
        // Sanity checks
        if (arrays.length !== ratios.length) throw new Error("Expected both arrays inputted to 'undeal()' static method to have the same length");

        let arr3D = [];
        let longestArrLength = 0;

        for (const i of range(arrays.length)) {
            const split = Dealer.step(arrays[i], ratios[i]);
            const length = split.length;

            if (length > longestArrLength) {
                longestArrLength = length;
            }

            arr3D.push(split);
        }

        let arr1D = [];
        for (const i of range(longestArrLength)) {
            for (const arr2D of arr3D) {

                if (i < arr2D.length) {
                    arr1D.push(arr2D[i]);
                }

            }
        }

        return arr1D.reduce( (x, y) => x.concat(y));
    }

    /**
     * Stops this class from being constructed
     * @throws {DisallowedConstructionError}
     */
    constructor() {
        throw new DisallowedConstructionError(this);
    }

}
