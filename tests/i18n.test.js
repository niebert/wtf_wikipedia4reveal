'use strict';
var test = require('tape');
var wtf = require('./lib');

test('nihongo templates templates', t => {
  var str = `hello {{Nihongo|Tokyo Tower|東京タワー|Tōkyō tawā}} world`;
  var doc = wtf(str);
  t.equal(doc.text(), 'hello Tokyo Tower (東京タワー) world', 'sub english word');
  t.equal(doc.templates().length, 1, 'have template');
  t.equal(doc.templates(0).romaji, 'Tōkyō tawā', 'have translation');

  str = `In Japanese, {{Nihongo2|虚無僧}} reads ''komusō''.`;
  doc = wtf(str);
  t.equal(doc.text(), 'In Japanese, 虚無僧 reads komusō.', 'sub kanji word');

  str = `{{Nihongo foot|English|Kanji|Rōmaji|extra|extra2|group=group}}`;
  doc = wtf(str);
  t.equal(doc.text(), 'English (Kanji)', 'footnote kinda');
  t.end();
});

test('lang template', t => {
  var str = `i played {{lang-de|Die Seefahrer von Catan}}`;
  var doc = wtf(str);
  t.equal(doc.text(), 'i played Die Seefahrer von Catan', 'lang-de');


  str = `hi there {{lang-ru|тундра|italic=unset}} hello`;
  doc = wtf(str);
  t.equal(doc.text(), 'hi there тундра hello', 'ru text');

  str = `{{lang|fr|Je suis française.}}`;
  doc = wtf(str);
  t.equal(doc.text(), 'Je suis française.', 'lang tag text');
  t.end();
});
