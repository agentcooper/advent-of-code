var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var actions = {
    'AND': (a, b) => a & b,
    'OR': (a, b) => a | b,
    'LSHIFT': (a, b) => a << b,
    'RSHIFT': (a, b) => a >> b,
    'NOT': (a) => ~a > 0 ? ~a : (65536 + ~a)
};

var evaluated = {};

function applyCommand(state, command) {

    function evaluate(s) {
        var match = String(s).match(/\d+/);

        if (match) {
            return Number(s);
        }

        // we get a loop without remembering the evaluation
        if (evaluated[s]) {
            return evaluated[s];
        }

        var result = state[s]();

        evaluated[s] = result;

        return evaluated[s];
    }

    var output;

    if (command.input.type === 'expression') {
        output = function() {
            return evaluate(command.input.value);
        }
    }

    if (command.input.type === 'binary-operation') {
        output = function() {
            return actions[command.input.op](
                evaluate(command.input.left),
                evaluate(command.input.right)
            );
        }
    }

    if (command.input.type === 'unary-operation') {
        output = function() {
            return actions[command.input.op](
                evaluate(command.input.value)
            );
        }
    }

    if (state[command.output]) {
        throw new Error('Already wired!');
    }

    state[command.output] = output;

    return state;
}

function parseOperation(s) {
    var RX_BINARY_OPERATION = /(.+)\s(.+)\s(.+)/;

    var RX_UNARY_OPERATION = /(.+)\s(.+)/;

    var match = null;

    match = s.match(RX_BINARY_OPERATION);
    if (match && match.length === 4) {
        return {
            type: 'binary-operation',
            left: match[1],
            op: match[2],
            right: match[3]
        };
    }

    match = s.match(RX_UNARY_OPERATION);
    if (match && match.length === 3) {
        return {
            type: 'unary-operation',
            value: match[2],
            op: match[1]
        };
    }

    return {
        type: 'expression',
        value: s
    }
}

function parseCommand(s) {
    var match = s.match(/(.+)\s->\s(.+)/);

    return {
        input: parseOperation(match[1]),
        output: match[2]
    };
}

var initialState = {};

var commands = input.split('\n').map(parseCommand);

var endState = commands.reduce(function(state, command) {
    return applyCommand(state, command);
}, initialState);

console.log(endState.a());
