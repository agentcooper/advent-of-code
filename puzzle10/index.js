function generate(input) {
    var digits = Array.from(input);

    var grouped = digits.reduce(function(acc, digit, index) {
        if (acc.length > 0 && digit === acc[acc.length - 1].digit) {
            acc[acc.length - 1].length += 1;
            return acc;
        }

        acc.push({
            digit: digit,
            length: 1
        });

        return acc;
    }, []);

    return grouped.map(function(group) {
        return String(group.length) + String(group.digit);
    }).join('');
}

var input = '1113122113';

for (var i = 1; i <= 50; i++) {
    input = generate(input);
}

console.log(input.length);
