const test = require('node:test');
const assert = require('node:assert/strict');
const removeElement = require('./solution');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 27 — ${scenario.name}`, () => {
    const nums = [...scenario.input.nums];
    const k = removeElement(nums, scenario.input.val);
    const remainingValues = nums.slice(0, k).sort((left, right) => left - right);
    const expectedValues = [...scenario.expected.nums].sort((left, right) => left - right);

    assert.ok(Number.isInteger(k), 'The result must be an integer.');
    assert.equal(k, scenario.expected.k, 'The result must equal the expected remaining length.');
    assert.equal(remainingValues.length, k, 'Only the first k positions are part of the result.');
    assert.ok(!remainingValues.includes(scenario.input.val), 'The first k positions must not contain val.');
    assert.deepEqual(remainingValues, expectedValues, 'The first k positions contain unexpected remaining values.');
  });
}
