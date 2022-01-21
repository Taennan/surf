
/**
 * Equivalent of Pythons' range() function
 * @type {Function}

 * @param {Number} length -
 * @param {Number?} start -
 * @param {Number?} step  -

 * @returns {Number[]}
 */
export
function range(length: Number, start: Number=0, step: Number=1): Number[] {
    let arr = [];
    for (let i = start; i < length; i += step) {
        arr.push(i);
    }
    return arr;
}

/**
 * [arr1 description]
 * @type {[type]}
 */
export
function zip(arr1: Array, arr2: Array): Array[any[]] {

    let arr = [];
    for (const i of range(arr1.length)) {
        arr.push([arr1[i], arr2[i]]);
    }
    return arr;
}

/**
 * [array description]
 * @returns {Array<any[], Number[]>}
 */
export
function enumerate(array: Array): Array<Array, Number[]> {
    return zip(array, range(array.length));
}
