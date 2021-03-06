var test = require('tape');
var select = require('../');
var through = require('through2');

var expected = [
    [ 'open', '<html>' ],
    [ 'text', '\n  ' ],
    [ 'open', '<head>' ],
    [ 'text', '\n    ' ],
    [ 'open', '<title>' ],
    [ 'text', 'presentation examples' ],
    [ 'close', '</title>' ],
    [ 'text', '\n  ' ],
    [ 'close', '</head>' ],
    [ 'text', '\n  ' ],
    [ 'open', '<body>' ],
    [ 'text', '\n    ' ],
    [ 'open', '<h1>' ],
    [ 'text', 'hello there!' ],
    [ 'close', '</h1>' ],
    [ 'text', '\n    ' ],
    [ 'open', '<p>' ],
    [ 'text', '\n      This presentation contains these examples:\n    ' ],
    [ 'close', '</p>' ],
    [ 'text', '\n    \n    ' ],
    [ 'open', '<ul>' ],
    [ 'text', '\n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'BROWSERIFY' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'NODE-STYLE ' ],
    [ 'open', '<CODE>' ],
    [ 'text', 'REQUIRE()' ],
    [ 'close', '</CODE>' ],
    [ 'text', ' IN THE BROWSER' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n      \n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'STREAMS' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'SHUFFLE DATA AROUND WITH BACKPRESSURE' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n      \n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'NDARRAY' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'N-DIMENSIONAL MATRICIES ON TOP OF TYPED ARRAYS' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n      \n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'MUSIC' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'MAKE MUSIC WITH CODE' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n      \n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'VOXELJS' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'MAKE MINECRAFT-STYLE GAMES IN WEBGL' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n      \n      ' ],
    [ 'open', '<LI>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DT>' ],
    [ 'text', 'TRUMPET' ],
    [ 'close', '</DT>' ],
    [ 'text', '\n        ' ],
    [ 'open', '<DD>' ],
    [ 'text', 'TRANSFORM HTML WITH CSS SELECTORS AND STREAMS' ],
    [ 'close', '</DD>' ],
    [ 'text', '\n      ' ],
    [ 'close', '</LI>' ],
    [ 'text', '\n    ' ],
    [ 'close', '</ul>' ],
    [ 'text', '\n  ' ],
    [ 'close', '</body>' ],
    [ 'text', '\n' ],
    [ 'close', '</html>' ],
    [ 'text', '\n' ]
];

var tokens = require('./tr_batch/tokens.json');

test('transform with batched writes', function (t) {
    t.plan(expected.length + 1);
    var s = select('li', function (e) {
        var tr = through.obj(function (row, buf, next) {
            this.push([ row[0], String(row[1]).toUpperCase() ]);
            next();
        });
        tr.pipe(e.createStream()).pipe(tr);
    });
    s.pipe(through.obj(write, end));
    tokens.forEach(function (token) { s.write(token) });
    s.end();
    
    function write (row, enc, next) {
        var x = [ row[0], row[1].toString('utf8') ];
        t.deepEqual(x, expected.shift(), x[1]);
        next();
    }
    function end () { t.ok(true, 'ended') }
});
