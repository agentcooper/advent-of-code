var chars = 'abcdefghijklmnopqrstuvwxyz';

function getNextLetter(char) {
    var index = chars.indexOf(char);

    return chars.charAt((index + 1) % chars.length);
}

function didWrap(letter) {
    return letter === 'z';
}

function increment(s) {
    var letters = Array.from(s);

    return letters.reduce(function(acc, letter, index, arr) {

        function updatePrevious(index) {
            if (index > 0 && didWrap(arr[index])) {
                acc[index - 1] = getNextLetter(arr[index - 1]);

                updatePrevious(index - 1);
            }
        }

        acc[index] = arr[index];

        if (index === arr.length - 1) {
            acc[index] = getNextLetter(letter);

            updatePrevious(index);
        }

        return acc;
    }, []).join('');
}

function checkThreeIncreasing(s) {
    for (var i = 0; i < s.length; i++) {
        if (i >= 2) {

            var a = s.charAt(i - 2),
                b = s.charAt(i - 1),
                c = s.charAt(i);

            if (
                increment(a) === b &&
                increment(b) === c &&
                !didWrap(a) &&
                !didWrap(b)
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkBadLetters(s) {
    return (
        s.indexOf('i') === -1 &&
        s.indexOf('o') === -1 &&
        s.indexOf('l') === -1
    );
}

function checkNonOverlappingPairs(s) {
    var grouped = Array.from(s).reduce(function(acc, letter, index) {
        if (acc.length > 0 && letter === acc[acc.length - 1][0]) {
            acc[acc.length - 1] = acc[acc.length - 1] + letter;
            return acc;
        }

        acc.push(letter);

        return acc;
    }, []);

    var count = grouped.reduce(function(count, group) {
        return count + (group.length > 1 ? 1 : 0);
    }, 0);

    return count >= 2;
}

var input = 'vzbxxyzz';

for (var i = 0; i < 1000000; i++) {
    input = increment(input);

    if (
        checkBadLetters(input) &&
        checkNonOverlappingPairs(input) &&
        checkThreeIncreasing(input)
    ) {
        console.log(input);
    }
}
