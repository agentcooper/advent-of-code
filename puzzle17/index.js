'use strict';

var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

function buildKey(arr) {
    return Array.from(arr).sort((a, b) => a - b).join('-');
}

function count(total, sizes) {
    var unique = {};

    var uniqueByLength = {};

    var minimumLength = Infinity;

    function startWith(total, sizes, used) {
        if (total === 0) {
            var key = buildKey(used);

            if (!unique[key]) {
                unique[key] = 1;

                uniqueByLength[used.length] = uniqueByLength[used.length] || 0;
                uniqueByLength[used.length]++;

                minimumLength = Math.min(minimumLength, used.length);
            }

            return;
        }

        if (total <= 0 || sizes.length === 0) {
            return;
        }

        sizes.forEach(function(size, index) {
            startWith(
                total - size.value,
                sizes.filter(function(size, i) {
                    return size.value <= (total - size.value) && i !== index;
                }),
                used.concat(size.index)
            );
        });
    }

    startWith(total, sizes, []);

    return {
        uniqueWays: Object.keys(unique).length,
        minimum: uniqueByLength[minimumLength]
    };
}

var sizes = input.split('\n').map(function(value, index) {
    return { index: index, value: Number(value) };
});

const total = 150;

var result = count(total, sizes);

console.log(result.uniqueWays, result.minimum);
