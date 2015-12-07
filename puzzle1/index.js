var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var firstBasementPosition = -1;

var floor = input.split('').map(function(char) {
    if (char === '(') {
        return 1;
    }
    if (char === ')') {
        return -1;
    }
}).reduce(function(sum, floor, index) {
    var result = sum + floor;

    if (result === -1 && firstBasementPosition === -1) {
        firstBasementPosition = index + 1;
    }

    return result;
}, 0);

console.log(floor, firstBasementPosition);
