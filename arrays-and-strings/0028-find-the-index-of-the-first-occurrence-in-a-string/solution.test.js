const nodeTest = require('node:test');
const { selectCases } = require('../../shared/case-selection');
const cases = require('./cases.json');

if (cases.length === 0) {
  nodeTest.todo('LeetCode 28 — add test cases after implementing strStr');
}

for (const scenario of selectCases(cases)) {
  nodeTest.todo(`LeetCode 28 — implement validation for ${scenario.name}`);
}
