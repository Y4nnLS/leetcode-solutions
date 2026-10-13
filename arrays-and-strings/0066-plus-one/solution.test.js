const test = require('node:test');
const assert = require('node:assert/strict');
const plusOne = require('./solution');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 66 — ${scenario.name}`, () => {
    const actual = plusOne(scenario.input.digits);

    assert.deepEqual(actual, scenario.expected);
  });
}
