var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var vowels = 'aeiou'.split('');

var badStrings = ['ab', 'cd', 'pq', 'xy'];

function isNice1(s) {
    var letters = s.split('');

    var vowelsCount = letters
        .filter(letter => vowels.indexOf(letter) !== -1)
        .length;

    var hasTwiceInARow = letters.some(function(letter, index, arr) {
        return index >= 1 && arr[index - 1] === letter;
    });

    var hasBadStrings = badStrings.some(badString => s.includes(badString));

    return !hasBadStrings && vowelsCount >= 3 && hasTwiceInARow;
}

function isNice2(s) {
    var letters = s.split('');

    var hasTwiceWithoutOverlapping = letters.some(function(letter, index, arr) {
        var searchPair = arr[index] + arr[index + 1];

        var indexSearchPair = s.lastIndexOf(searchPair);

        return indexSearchPair !== -1 && indexSearchPair > index + 1;
    });

    var hasOneBetween = letters.some(function(letter, index, arr) {
        return arr[index - 1] === arr[index + 1];
    });

    return hasTwiceWithoutOverlapping && hasOneBetween;
}

function count(f) {
    return input.split('\n').reduce(function(count, s) {
        return count + (f(s) ? 1 : 0);
    }, 0);
}

console.log(count(isNice1), count(isNice2));
