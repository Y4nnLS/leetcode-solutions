class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(values) {
  const dummy = new ListNode();
  let current = dummy;

  for (const value of values) {
    current.next = new ListNode(value);
    current = current.next;
  }

  return dummy.next;
}

function listToArray(head, maxNodes = 10_000) {
  const values = [];
  const visited = new Set();
  let current = head;

  while (current !== null) {
    if (visited.has(current)) {
      throw new Error('Cycle detected while converting a linked list to an array.');
    }
    if (values.length >= maxNodes) {
      throw new Error(`Linked list exceeded the ${maxNodes}-node safety limit.`);
    }

    visited.add(current);
    values.push(current.val);
    current = current.next;
  }

  return values;
}

module.exports = { ListNode, arrayToList, listToArray };
