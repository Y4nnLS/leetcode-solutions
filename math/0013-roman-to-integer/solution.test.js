const test = require('node:test');
const assert = require('node:assert/strict');
const romanToInt = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 13 — ${scenario.name}`, () => {
    assert.equal(romanToInt(scenario.input.s), scenario.expected);
  });
}
