var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

function parseCommand(s) {
    var match = s.match(/(\w+)\sto\s(\w+)\s=\s(\d+)/);

    if (!match) {
        return null;
    }

    return {
        start: match[1],
        end: match[2],
        distance: Number(match[3])
    };
}

var commands = input.split('\n').map(parseCommand);

var paths = commands.reduce(function(state, command) {
    state[command.start] = state[command.start] || {};
    state[command.end] = state[command.end] || {};

    state[command.start][command.end] = command.distance;
    state[command.end][command.start] = command.distance;

    return state;
}, {});

var routes = [];

var total = Object.keys(paths).length;

function flyTo(paths, current, route, distance) {
    var p = {
        places: route.places.concat(current),
        distance: route.distance + distance
    };

    if (p.places.length === total) {
        routes.push(p);
        return;
    }

    for (var path in paths[current]) {
        if (route.places.indexOf(path) === -1) {
            flyTo(paths, path, p, paths[current][path]);
        }
    }
}

for (var path in paths) {
    flyTo(paths, path, { places: [], distance: 0 }, 0);
}

routes.sort((a, b) => a.distance - b.distance);

console.log(routes[routes.length - 1]);
