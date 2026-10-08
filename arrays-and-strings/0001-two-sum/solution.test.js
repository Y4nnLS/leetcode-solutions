const test = require('node:test');
const assert = require('node:assert/strict');
const twoSum = require('./solution');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 1 — ${scenario.name}`, () => {
    const { nums, target } = scenario.input;
    const result = twoSum([...nums], target);

    assert.ok(Array.isArray(result), 'The result must be an array.');
    assert.equal(result.length, 2, 'The result must contain exactly two indices.');
    assert.ok(result.every(Number.isInteger), 'Each result item must be an integer index.');
    assert.notEqual(result[0], result[1], 'The same index cannot be used twice.');
    assert.ok(result.every((index) => index >= 0 && index < nums.length), 'Each index must exist in nums.');
    assert.equal(nums[result[0]] + nums[result[1]], target, 'The selected values must add up to target.');
  });
}
