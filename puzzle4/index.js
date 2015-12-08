var secret = 'ckczppom';

var crypto = require('crypto');

function pad(number, length, literal) {
    var s = String(number);

    return Array.from(
        new Array(Math.max(length - s.length + 1, 0))
    ).join(literal) + s;
}

for (var i = 0, md5 = ''; i <= 100000000; i++) {
    md5 = crypto.createHash('md5').update(secret + pad(i, 5, '0')).digest('hex');

    if (md5.indexOf('000000') === 0) {
        console.log(i, md5);
        break;
    }
}
