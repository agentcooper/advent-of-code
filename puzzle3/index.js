var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var state = {
    santaCoords: { x: 0, y: 0 },
    roboSantaCoords: { x: 0, y: 0 },
    houses: new Map()
};

var actions = {
    '>': coords => ({ x: coords.x + 1, y: coords.y }),
    '^': coords => ({ x: coords.x, y: coords.y + 1 }),
    'v': coords => ({ x: coords.x, y: coords.y - 1 }),
    '<': coords => ({ x: coords.x - 1, y: coords.y })
};

function getKey(coords) {
    return coords.x + 'x' + coords.y;
}

state.houses.set(getKey(state.santaCoords), 1);

var result = input.split('').reduce(function(state, step, index) {
    var santaCoords =
        index % 2 === 0 ?
        actions[step](state.santaCoords) : state.santaCoords;

    var roboSantaCoords =
        index % 2 === 1 ?
        actions[step](state.roboSantaCoords) : state.roboSantaCoords;

    var coords = index % 2 === 0 ?
        santaCoords : roboSantaCoords;

    state.houses.set(getKey(coords), 1);

    return {
        houses: state.houses,
        santaCoords: santaCoords,
        roboSantaCoords: roboSantaCoords
    };
}, state);

console.log(result.houses.size);
