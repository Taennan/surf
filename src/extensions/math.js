
/**
 * Calculates sum of all inputted numbers
 * @param {...Number} nums -
 * @returns {Number}
 */
Math.sum = function(...numbers: Number) {
    let sum = 0;
    for (const val of numbers) { sum += val; }
    return sum;
}


/**
 * Calculates Greatest Common Dvisor of the inputted numbers
 * @param {...Number} nums -
 * @returns {Number}
 */
Math.gcd = function(...nums: Number): Number {
    // Recursively calls self while dividing 'x' and while 'y' !== 0
    const _gcd = (x, y) => (!y ? x : Math.gcd(y, x % y));
    return [...nums].reduce((a, b) => _gcd(a, b));
}

/**
 * [obj description]
 * @param {Object<_, Number>} obj -
 * @returns {Object<_, Number>}
 */
Math.divideObjectByGCD = function(obj: Object): Object {
    const divisor = Math.gcd(...Object.values(obj.filterRatio));
    for (const key in obj.filterRatio) {
        obj.filterRatio[key] /= divisor
    }
}
