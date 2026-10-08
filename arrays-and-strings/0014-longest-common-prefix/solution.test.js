const test = require('node:test');
const assert = require('node:assert/strict');
const longestCommonPrefix = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 14 — ${scenario.name}`, () => {
    assert.equal(longestCommonPrefix([...scenario.input.strs]), scenario.expected);
  });
}
