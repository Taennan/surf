
import CustomError from "./custom-error";

/**
 * Thrown when an object that was not allowed to be constructed was constructed
 * @extends {Error}
 */
export
class DisallowedConstructionError extends CustomError {

    /**
     * @param {any} obj  The object which attempted to be constructed
     */
    constructor(obj: any) {
        super(`Object '${obj.constructor.name}' cannot be constructed`);
    }

}

/**
 * Thrown when a method was called that was supposed to be overridden in a subclass
 * @extends {CustomError}
 */
export
class NonOverriddenMethodError extends CustomError {

    /**
     * @param {Function} method -
     * @param {Object?}  obj    -
     */
    constructor(method: Function, obj: Object) {
        super(`Called method ${method.name} from Object ${obj.constructor.name} which was supposed to be overridden`);
    }
}


/**
 * Thrown when no images are available in the ResourceIndex of specified name
 * @extends {CustomError}
 */
export
class InvalidResourceNameError extends CustomError {

    /**
     * @param {String} resourceName - The name of the image resource that was attempted to be fetched
     */
    constructor(resourceName: String) {
        super(`No source sets for images of name '${resourceName}'`);
    }
}

/**
 * Thrown when there are not any resources returned from the ResourceIndex
 * @extends {CustomError}
 */
export
class EmptyResourceSetError extends CustomError {

    /**
     * @param {String} resourceName - The name of the image resource that was attempted to be fetched
     * @param {Number} lowestIndex  - The indexed from which the resource array was sliced
     */
    constructor(resourceName: String, lowestIndex: Number) {
        super(`Not enough resources in resource set of name ${resourceName}. Attempted to get resources from index ${lowestIndex}`);
    }
}
