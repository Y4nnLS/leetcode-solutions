const test = require('node:test');
const assert = require('node:assert/strict');
const lengthOfLastWord = require('./solution');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 58 — ${scenario.name}`, () => {
    const actual = lengthOfLastWord(scenario.input.s);

    assert.equal(actual, scenario.expected);
  });
}
