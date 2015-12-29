var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var ON = '#';
var OFF = '.';

function getNeighbors(grid, x, y) {
    var result = [];

    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (i == x && j == y) {
                continue;
            }

            if (grid[i] && grid[i][j]) {
                result.push(grid[i][j]);
            }
        }
    }

    return result;
}

function updateGrid(oldGrid) {
    var gridSize = oldGrid.length;

    return oldGrid.map(function(line, j) {
        return line.map(function(light, i) {
            var neighbors = getNeighbors(oldGrid, j, i);

            if ((j === 0 || j === gridSize - 1) && (i === 0 || i === gridSize - 1)) {
                return ON;
            }

            var neighborsOn = neighbors.reduce(
                (sum, light) => sum + (light === ON ? 1 : 0), 0);

            if (light === ON) {
                return (neighborsOn === 2 || neighborsOn === 3) ? ON : OFF;
            }

            if (light === OFF) {
                return (neighborsOn === 3) ? ON : OFF;
            }
        });
    });
}

var steps = 100;

var grid = input.split('\n').map(line => line.split(''));

var finalGrid = grid;

for (var i = 0; i < steps; i++) {
    finalGrid = updateGrid(finalGrid);
}

var lightsOn = finalGrid.reduce(function(sum, line) {
    return sum + line.reduce((sum, light) => sum + (light === ON ? 1 : 0), 0);
}, 0);

console.log(lightsOn);
