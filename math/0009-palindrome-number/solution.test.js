const test = require('node:test');
const assert = require('node:assert/strict');
const isPalindrome = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 9 — ${scenario.name}`, () => {
    assert.equal(isPalindrome(scenario.input.x), scenario.expected);
  });
}
