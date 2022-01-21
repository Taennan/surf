
/**
 * Creates a new object using the keys of the inputted one and calls a function
   on each of it's values to determine the values of the new object
 * This method is non-destructive
 * @static

 * @param  {Object} obj - The old object to base the new oe off.
                        - DO NOT pass in the keys only as the values may be needed by the 'funcOrVal' param if it is a function
 * @param  {Function | any} funcOrVal - A raw value or a function to generate values for the new object

 * @return {Object}           [description]
 */
Object.fromKeysOf = function(obj: Object, funcOrVal: Function | any): Object {
    return Object.fromEntries(
        Object.entries(obj).map(
            ([k, v]) => {
                if (typeof func === "function") return [k, funcOrVal(v)]
                else                            return [k, funcOrVal]
            }
        )
    );
}
