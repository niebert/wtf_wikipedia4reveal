'use strict';
var test = require('tape');
var wtf = require('./lib');

test('references', t => {
  var str = `John smith was a comedian<ref name="cool">{{cite web |url=http://supercool.com |title=John Smith sure was |last= |first= |date= |website= |publisher= |access-date= |quote=}}</ref>
and tap-dance pioneer. He was born in glasgow<ref>irelandtimes</ref>.

This is paragraph two.<ref>{{cite web |url=http://paragraphtwo.net}}</ref> It is the same deal.

==Section==
Here is the third paragraph. Nobody knows if this will work.<ref>[http://commonsense.com/everybody|says everybody]</ref>

`;
  var doc = wtf(str);
  t.equal(doc.sections().length, 2, 'sections');
  t.equal(doc.paragraphs().length, 3, 'paragraphs');
  t.equal(doc.references().length, 4, 'all references');
  t.equal(doc.sections(0).references().length, 3, 'first references');
  t.end();
});


test('sentence/paragraphs by newlines', t => {
  var doc = wtf(`Leading text

Closing remark`);
  t.equal(doc.paragraphs().length, 2, '2 paragraphs');
  t.equal(doc.sentences().length, 2, '2 sentences');
  t.equal(doc.markdown(), 'Leading text\n\nClosing remark', 'markdown paragraphs');
  t.end();
});


test('bring newlines to plaintext', t => {
  var str = `hello



world`;
  var doc = wtf(str);
  t.equal(doc.text(), 'hello\n\nworld', 'plaintext has one newline');
  t.end();
});


test('newlines in templates', t => {
  var str = `hello world{{cite web |url=http://coolc.om |title=whoa hello |last= |first=



|date= |website= |publisher= |access-date=


|quote=}}

Paragraph two!`;
  var doc = wtf(str);
  t.equal(doc.paragraphs().length, 2, 'paragraphs');
  t.equal(doc.paragraphs(0).text(), 'hello world', 'first paragraph');
  t.equal(doc.paragraphs(1).text(), 'Paragraph two!', '2nd paragraph');
  t.end();
});

test('newlines in tables', t => {
  var str = `hello world. Up here.
{| class="wikitable"
|-

! Header 1
! Header 2
! Header 3
|-
| row 1, cell 1


| row 1, cell 2
| row 1, cell 3


|-
| row 2, cell 1
| row 2, cell 2
| row 2, cell 3
|}

Second paragraph here.`;
  var doc = wtf(str);
  t.equal(doc.paragraphs().length, 2, 'paragraphs');
  t.equal(doc.paragraphs(0).text(), 'hello world. Up here.', 'first paragraph');
  t.equal(doc.paragraphs(1).text(), 'Second paragraph here.', '2nd paragraph');
  t.equal(doc.tables().length, 1, 'got broken table');
  t.end();
});
