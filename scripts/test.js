var exec = require('shelljs').exec;
var tape = './node_modules/.bin/tape';
var spec = './node_modules/.bin/tap-dancer --color';

//run tests server-side
exec(tape + ' ./tests/*.test.js | ' + spec);
