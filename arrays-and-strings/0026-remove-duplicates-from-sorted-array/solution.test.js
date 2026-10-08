const test = require('node:test');
const assert = require('node:assert/strict');
const removeDuplicates = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 26 — ${scenario.name}`, () => {
    const nums = [...scenario.input.nums];
    const k = removeDuplicates(nums);
    assert.equal(k, scenario.expected.k);
    assert.deepEqual(nums.slice(0, k), scenario.expected.nums);
  });
}
