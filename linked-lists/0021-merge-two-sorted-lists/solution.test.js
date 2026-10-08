const test = require('node:test');
const assert = require('node:assert/strict');
const mergeTwoLists = require('./solution');
const { arrayToList, listToArray } = require('../../shared/list-node');
const cases = require('./cases.json');
const { selectCases } = require('../../shared/case-selection');

for (const scenario of selectCases(cases)) {
  test(`LeetCode 21 — ${scenario.name}`, () => {
    const list1 = arrayToList(scenario.input.list1);
    const list2 = arrayToList(scenario.input.list2);
    const result = mergeTwoLists(list1, list2);
    const values = listToArray(result, scenario.input.list1.length + scenario.input.list2.length + 1);
    assert.deepEqual(values, scenario.expected);
    assert.equal(values.length, scenario.expected.length, 'The merged list has an unexpected number of nodes.');
  });
}
