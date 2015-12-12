var fs = require('fs');

var input = JSON.parse(fs.readFileSync('input.txt'));

const badString = 'red';

function count(sum, item, ignore) {
    if (Array.isArray(item)) {
        return item.reduce(count, sum);
    }

    if (typeof item === 'object') {
        var foundBadString = false;

        var objectSum = Object.keys(item).reduce(function(sum, key) {
            if (key === badString || item[key] === badString) {
                foundBadString = true;
            }

            return count(sum, item[key]);
        }, sum);

        return foundBadString ? sum : objectSum;
    }

    if (typeof item === 'number') {
        return sum + item;
    }

    return sum;
}

console.log(count(0, input));
