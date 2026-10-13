const test = require('node:test');
const assert = require('node:assert/strict');
const searchInsert = require('./solution');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 35 — ${scenario.name}`, () => {
    const actual = searchInsert(scenario.input.nums, scenario.input.target);

    assert.equal(actual, scenario.expected);
  });
}
