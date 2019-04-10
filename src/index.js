const wtf_wikipedia = require('wtf_wikipedia');
const fetch = require('wtf_fetch');
const version = require('../package').version;

//the main 'factory' exported method
const wtf4reveal = function(wiki, options) {
  //return wtf_wikipedia(wiki, options);
  return "wtf4reveal output"
};
wtf4reveal.version = version + "- wtf_wikipedia: " + wtf_wikipedia.version;

module.exports = wtf4reveal;
