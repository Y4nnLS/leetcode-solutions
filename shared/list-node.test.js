const test = require('node:test');
const assert = require('node:assert/strict');
const { ListNode, arrayToList, listToArray } = require('./list-node');

test('ListNode helpers convert an array to a list and back', () => {
  assert.deepEqual(listToArray(arrayToList([1, 2, 3])), [1, 2, 3]);
  assert.deepEqual(listToArray(null), []);
});

test('ListNode helpers reject cyclic lists', () => {
  const first = new ListNode(1);
  const second = new ListNode(2);
  first.next = second;
  second.next = first;

  assert.throws(() => listToArray(first), /Cycle detected/);
});

test('ListNode helpers apply a traversal safety limit', () => {
  assert.throws(() => listToArray(arrayToList([1, 2]), 1), /safety limit/);
});
