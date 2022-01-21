
const Types = {
    a: 2,
    b: 1,
    //c: "C",
};

function test(times) {

    const keys     = Object.keys(Types);
    let keyIndex   = 0;

    let retVals = [];

    for (let i = 0; i < times; i++) {

        const type = keys[keyIndex];
        keyIndex = (keyIndex + 1) % keys.length;

        let keysPushed = 0;
        while (keysPushed < Types[type] && i < times) {

            retVals.push(type);
            keysPushed++;
            i++;

            console.log(`KEY IND: ${keyIndex} I: ${i} KEYS PUSHED: ${keysPushed}`);
        }
        console.log(i);
    }

    return retVals;

}

function testTwo(times) {



}

console.log(test(5));

function gcd(...nums) {
    // Recursively calls self while dividing 'x' and while 'y' !== 0
    const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
    return [...nums].reduce((a, b) => _gcd(a, b));
}

function divideObjectByGCD(obj) {
    const divisor = gcd(...Object.values(obj));
    for (const key in obj) {
        obj[key] /= divisor
    }
}
