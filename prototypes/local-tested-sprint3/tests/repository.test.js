const test = require('node:test');
const assert = require('node:assert/strict');
const { normaliseSearch, validId } = require('../src/utils/validation');
test('search trims whitespace and caps length', () => {
  assert.equal(normaliseSearch('  notebook  '), 'notebook');
  assert.equal(normaliseSearch('a'.repeat(200)).length, 80);
  assert.equal(normaliseSearch(null), '');
});
test('product ids must be positive safe integers', () => {
  assert.equal(validId('4'), 4);
  for (const bad of ['0', '-1', '1.2', 'oops', '999999999999999999']) assert.equal(validId(bad), null);
});
