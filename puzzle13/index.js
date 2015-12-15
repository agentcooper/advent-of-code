var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

function parseCommand(s) {
    var match = s.match(/(\w+)\swould\s(gain|lose)\s(\d+).+to\s(\w+)/);

    return {
        a: match[1],
        b: match[4],
        happiness: Number(match[2] === 'gain' ? match[3] : -match[3]) 
    };
}

function permutate(arr) {
    if (arr.length === 1) {
        return [arr];
    }

    return arr.reduce(function(acc, item, index) {
        var without = arr.slice(0, index).concat(arr.slice(index + 1));

        return permutate(without).map(arr => [item].concat(arr)).concat(acc);
    }, []);
}

function checkHappiness(a, b, happinessPairs) {
    if (a === 'Me' || b === 'Me') {
        return 0;
    }

    return happinessPairs[a][b];
}

function totalTableHappiness(table, happinessPairs) {
    return table.reduce(function(sum, name, index, arr) {
        var leftIndex = index - 1 < 0 ? (arr.length - 1) : index - 1,
            rightIndex = (index + 1 > arr.length - 1) ? 0 : index + 1;

        return sum + (
            checkHappiness(name, arr[leftIndex], happinessPairs) +
            checkHappiness(name, arr[rightIndex], happinessPairs)
        );
    }, 0);
}

var commands = input.split('\n').map(parseCommand);

var happinessPairs = commands.reduce(function(state, command) {
    state[command.a] = state[command.a] || {};

    state[command.a][command.b] = command.happiness;

    return state;
}, {});

var people = commands.reduce(function(state, command) {
    return Object.assign(state, {
        [command.a]: true,
        [command.b]: true
    });
}, {});

var table = Object.keys(people).concat('Me');

var options = permutate(table).map(function(table) {
    return totalTableHappiness(table, happinessPairs);
});

options.sort(function(a, b) {
    return b - a;
});

console.log(options[0]);
