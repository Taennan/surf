
Number.isEven = function(x) {
    return x % 2 === 0;
}

Number.isNegative = function(x) {
    return x < 0;
}

Number.random = function(lowerBound: Number, upperBound: Number): Number {
    return Math.floor(Math.random() * upperBound) + lowerBound;
}
