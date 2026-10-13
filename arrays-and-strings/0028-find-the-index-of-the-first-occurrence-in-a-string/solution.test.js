const test = require('node:test');
const assert = require('node:assert/strict');
const strStr = require('./solution');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 28 — ${scenario.name}`, () => {
    const actual = strStr(scenario.input.haystack, scenario.input.needle);

    assert.equal(actual, scenario.expected);
  });
}
