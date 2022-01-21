
/**
 * Returns the number of items within specified array wich match the spicefied predicate
 * @param  {Array} array - The array to iterate over
 * @param  {Function} predicate - Each item is passed as an arg to this to determine whether it satisfies the condition or not
 * @return {Number}           [description]
 */
Array.totalMatching = function(array: Array, predicate: Function): Number {
    let total = 0;
    for (const item of array) {
        if (predicate(item)) total++;
    }
    return total;
}
