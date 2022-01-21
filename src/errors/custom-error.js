
/**
 * Used as a base class for creating custom error types
 * @type {Error}
 */
export default
class CustomError extends Error {

    /**
     * @param {String} message  The debug message to print
     */
    constructor(message: String) {
        super(message);
        this.name = this.constructor.name;
    }

}
