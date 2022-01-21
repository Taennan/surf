
function range(length, start=0, step=1) {
    let arr = [];
    for (let i = start; i < length; i += step) {
        arr.unshift(i);
    }
    return arr.reverse();
}

class ArraySplit {

    /**
     * ([...], [2,1,2]) -> [[], [], []]
     * @param  {Array} array               [description]
     * @param  {Array[Number]} ratio               [description]
     * @return {Array[]}       [description]

     // OPTIMIZE: 
     */
    static deal(array, ratios) {
        if (ratios.length === 0) return [];

        let arr2D = ratios.map( () => [] );

        let valuesPushed = 0;
        while (valuesPushed < array.length) {

            for (let i = 0; i < ratios.length; i++) {
                const ratio = ratios[i];
                for (let _ = 0; _ < ratio; _++) {

                    if (valuesPushed < array.length) {

                        const value = array[valuesPushed];
                        arr2D[i].push(value);
                        valuesPushed++;

                    } else {
                        return arr2D;
                    }

                }
            }

        }

        return arr2D;
    }

    /**
     * [[], [], [], ...], [2, 1, 2, ...] -> [2:1:2]
     * @param  {Array[]}       arrays - [description]
     * @param  {Array[Number]} ratio  - [description]
     * @return {Array} - [description]
     */
    static undeal(arrays, ratios) {

        let arr3D = [];
        let longestArrLength = 0;

        for (const i of range(arrays.length)) {
            const split = ArraySplit.step(arrays[i], ratios[i]);
            const length = split.length;

            if (length > longestArrLength) longestArrLength = length;

            arr3D.push(split);
        }

        let arr1D = [];
        for (const i of range(longestArrLength)) {
            for (const arr2D of arr3D) {
                if (i < arr2D.length) arr1D.push(arr2D[i]);
            }
        }

        return arr1D.reduce( (x, y) => x.concat(y));
    }

    /**
     * [], Number -> [[]...]
     * @param  {[type]} array - [description]
     * @param  {[type]} step  - [description]
     * @return {[type]} - [description]
     */
    static step(array, step) {
        let arr = [];
        for (const i of range(array.length)) {
            if (i === 0 && step === 2) arr.push(array.slice(0, 2));
            else if (i % step === 0)   arr.push(array.slice(i, i + step));
        }
        return arr;
    }

    /**
     * Returns both halves of a 1D array
     * Quite like a person cutting a deck of cards
     * @param {Array} array -
     * @param {Boolean} biasFirstHalf -
     * @returns {Array[]}
     */
    static cut(array, biasFirstHalf=true) {
        const halfway = Math.floor(array.length / 2);

        let first  = array.slice(0, halfway);
        let second = array.slice(halfway, array.length);

        if (second.length > first.length && biasFirstHalf) first.push(second.shift());

        return [first, second];
    }

}

console.log("\nITERATOR SHUFFLER TESTING\n");

console.log("Basic method examples");
console.log("STEP");
console.log(ArraySplit.step(range(9), 2));
console.log("CUT");
console.log(ArraySplit.cut([0,1,2,3,4,5,6]));
console.log("DEAL");
console.log(ArraySplit.deal([0,1,2,3,4,5,6,7,8,9], [2,1,0]));
console.log("UNDEAL");
console.log(ArraySplit.undeal([[0,1,2], [4,5], [6,7,8]], [2,1,0]));

console.log("\nComparing CUT and DEAL to show that they are NOT the same thing");
const testArr = [0,1,2,3,4,5,6];
console.log("TEST ARR:");
console.log(testArr);
console.log("DEAL (Alternates)");
console.log(ArraySplit.deal(testArr, [1,1]));
console.log("CUT (Splits)");
console.log(ArraySplit.cut(testArr));

console.log();
