
import CustomError from "./custom-error";

/**
 * Represents a error where the same search string is queried twice in succession
 * @type {CustomError}
 */
export
class RepeatedSearchError extends CustomError {

    /**
     * @param {String} searchString  the string which was passed as the search string
     */
    constructor(searchString) {
        super(`'${searchString}' has already been searched`);
    }

}
