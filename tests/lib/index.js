if (typeof process !== undefined && typeof module !== undefined) {
  if (process.env.TESTENV === 'prod') {
    console.log('== production build test 🚀 ==');
    module.exports = require('../../builds/wtf_wikipedia4reveal.min.js');
  } else {
    module.exports = require('../../src/index');
  }
}
