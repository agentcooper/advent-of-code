var fs = require('fs');

var input = fs.readFileSync('input.txt').toString().trim();

var lines = input.split('\n');

function volume(box) {
    return box.l * box.w * box.h;
}

function ribbonCount(box) {
    var sizes = [box.l, box.w, box.h].sort((a, b) => a - b);

    return 2 * sizes[0] + 2 * sizes[1] + volume(box);
}

function paperCount(box) {
    var areaLW = box.l * box.w,
        areaWH = box.w * box.h,
        areaHL = box.h * box.l;

    return (
        2 * (areaLW + areaWH + areaHL) +
        Math.min(areaLW, areaWH, areaHL)
    );
}

var boxes = lines.map(function(line) {
    var parts = line.split('x');

    return {
        l: parts[0],
        w: parts[1],
        h: parts[2]
    };
});

var totalPaperCount =
    boxes
    .map(paperCount)
    .reduce((sum, count) => sum + count, 0);

var totalRibbonCount =
    boxes
    .map(ribbonCount)
    .reduce((sum, count) => sum + count, 0);

console.log(totalRibbonCount);
