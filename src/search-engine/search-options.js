
import CardType from "components/cards/card-types";

import { zip } from "structures/iterables";
import { divideObjectByGCD } from "structures/math-functions";

import { DisallowedConstructionError } from "errors/code-errors";

/**
 * Static storage for values used to configure results shown from a search query.
 * This class is for static storage puroses only, it must not be constructed
 */
export default
class SearchOptions {

    /**
     *
     */
    static get Filters() {
        return Object.assign(
            { hybrid: "hybrid" },
            Object.fromEntries(zip(CardType.Surf.all(), CardType.Surf.all()))
        );
    }

    /**
     * Determines whether images, videos, web pages or all  of the former are searched by the Surf Engine
     * @type {String}
     */
    static searchFilter: String = SearchOptions.Filters.hybrid;

    /**
     * The ratio of results of each type which will be shown on the grid if the hybrid filter is selected.
     * The number values here must always be Integers
     * @type {Object}

     * @property web   -
     * @property image -
     * @property video - This one is not actually used
     */
    static filterRatio = Object.fromEntries(zip(CardType.Surf.all(), [2,1,0]));

    /**
     * [setFilterRatio description]
     * @param {Object} filterObj - The object to replace the last SearchOptions.filterRatio object.
                                   MUST have matching keys with the previous object and have values which are all integers
     * @throws {RangeError | Error}
     */
    static setFilterRatio(filterObj: Object) {

        // Sanity checks
        for (const [key, val] in Object.entries(filterObj)) {
            const allowedValues = Object.keys(CardType.Surf);
            if (!allowedValues.includes(key)) throw new RangeError(`Expected one of ${allowedValues} for setFilterRatio() static method, got ${key}`);
            if (!Number.isEven(val))          throw new Error(`Got float ${val} as one of the argument values for setFilterRatio(), expected an integer`);
        }

        // Sets the values of static property to those passed as args
        Object.assign(SearchOptions.filterRatio, filterObj)
        // Divides each value of the filterRatio object with their GCD to get them as small as possible
        const divObj = divideObjectByGCD(SearchOptions.filterRatio);
        Object.assign(SearchOptions.filterRatio, divObj);
    }

    /**
     * Stops this class from being constructed
     * @throws {DisallowedConstructionError}
     */
    constructor() {
        throw new DisallowedConstructionError(this);
    }

}
