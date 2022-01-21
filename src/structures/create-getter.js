
/**
 * [obj description]
 * @param {Object} obj  -
 * @param {String} name -
 * @param {any}   value -
 */
export default
function CreateGetter(obj: Object, name: String, value) {
    Object.defineProperty(obj, name, { get: () => { return value; } });
}
