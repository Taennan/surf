
import CustomError from "./custom-error";

/**
 * Represents an error where an incorrect value was passed to as a React component's property
 * @type {Error}
 */
export
class InvalidPropertyValueError extends CustomError {

    /**
     * @param {React.Component} comp                The React component where the error occurred
     * @param {String}          prop                The name of the components' property whose value was invalid
     * @param {any}             value               The invalid value passed to the property
     * @param {Array}           [expectedVals=[]]   An optional list of the values that were expected by the property.
     */
    constructor(comp: React.Component, prop: String, value: any, expectedVals=[]) {

        let message = `Property '${prop}' of component '${comp.constructor.name}' passed an invalid value of '${value}'`;
        if (expectedVals.length > 0)
            message += `. Try '${expectedVals.join(", ")}' instead`

        super(message)
    }

}

/**
 * [UnkownCardTypeError description]
 * @extends {CustomError}
 */
export
class UnkownCardTypeError extends CustomError {

    /**
     * @param {[type]} json  [description]
     */
    constructor(json: JSON) {
        super(`Could not determine an appropriate card type for JSON ${json}`);
    }
}
