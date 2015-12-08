var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

function createGrid(w, h, initial) {
    return Array.from(
        new Array(w),
        x => Array.from(new Array(h), x => initial)
    );
}

function applyToSquare(grid, topLeftCorner, bottomRightCorner, f) {
    for (var i = topLeftCorner.x; i <= bottomRightCorner.x; i++) {
        for (var j = topLeftCorner.y; j <= bottomRightCorner.y; j++) {
            grid[j][i] = f(grid[j][i]);
        }
    }
}

function prettyPrint(grid) {
    return grid.map(line => line.map(Number).join('')).join('\n');
}

function parseCoordinate(s) {
    var parts = s.split(',').map(Number);

    return { x: parts[0], y: parts[1] };
}

var actions = {
    'turn on': (value) => value + 1,
    'turn off': (value) => Math.max(value - 1, 0),
    'toggle': (value) => value + 2
};

function parseCommand(s) {
    var match = s.match(/(\D+)\s+(\d+,\d+)\D+(\d+,\d+)/);

    if (!match) {
        return null;
    }

    return {
        action: actions[match[1]],
        topLeftCorner: parseCoordinate(match[2]),
        bottomRightCorner: parseCoordinate(match[3])
    }
}

var lights = createGrid(1000, 1000, 0);

input.split('\n').map(parseCommand).forEach(function(command) {
    applyToSquare(
        lights,
        command.topLeftCorner,
        command.bottomRightCorner,
        command.action
    );
});

var totalBrightness = lights.reduce(function(sum, line) {
    return sum + line.reduce((sum, light) => sum + light, 0);
}, 0);

console.log(totalBrightness);
