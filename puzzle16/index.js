var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

function parseCommand(s) {
    var match = s.match(/Sue (\d+): (.+)/);

    return {
        index: match[1],
        items: match[2].split(/,\s+/).reduce(function(obj, s) {
            var parts = s.split(/:\s+/);

            obj[parts[0]] = Number(parts[1]);

            return obj;
        }, {})
    };
}

var targetAuntItems = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

var EQUAL = (a, b) => a === b;

var GREATER_THAN = (a, b) => a < b;

var FEWER_THAN = (a, b) => a > b;

var specialComparator = {
    trees: GREATER_THAN,
    cats:  GREATER_THAN,

    pomeranians: FEWER_THAN,
    goldfish:    FEWER_THAN
};

var aunts = input.split('\n').map(parseCommand);

var targetAunt = aunts.find(function(aunt) {
    return Object.keys(aunt.items).every(function(key) {
        var comparator = specialComparator[key] || EQUAL;

        return comparator(targetAuntItems[key], aunt.items[key]);
    });
});

console.log(targetAunt.index);
