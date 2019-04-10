var exec = require('shelljs').exec;
var echo = require('shelljs').echo;
var fs = require('fs');
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/.bin/derequire';
var uglify = './node_modules/.bin/uglifyjs';

// ok somehow,
// for deploys, we want the 'browser' field
// but that messes with browserify...
// so temporarily remove it during builds.
// ¯\_(ツ)_/¯
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
exec('mv ./package.json ./package.json.backup');
delete pkg.browser;
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));

//final build locations
var banner = '/* wtf_wikipedia4reveal v' + pkg.version + '\n   github.com/niebert/wtf_wikipedia4reveal\n   MIT\n*/\n';
var uncompressed = './builds/wtf_wikipedia4reveal.js';
var compressed = './builds/wtf_wikipedia4reveal.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);
echo(banner).to(compressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone wtf';
cmd += ' -t [ babelify --presets [ env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
exec(cmd);

//uglify
cmd = uglify + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd);

//log the size of our builds
require('./filesize');

//.. then we replace original package.json file
exec('mv ./package.json.backup ./package.json ');
