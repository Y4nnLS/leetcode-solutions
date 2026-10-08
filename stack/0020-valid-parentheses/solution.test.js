const test = require('node:test');
const assert = require('node:assert/strict');
const isValid = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 20 — ${scenario.name}`, () => {
    assert.equal(isValid(scenario.input.s), scenario.expected);
  });
}
