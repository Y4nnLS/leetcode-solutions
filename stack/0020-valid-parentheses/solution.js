/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const openingForClosing = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const character of s) {
    if (character in openingForClosing) {
      if (stack.pop() !== openingForClosing[character]) {
        return false;
      }
    } else {
      stack.push(character);
    }
  }

  return stack.length === 0;
};

module.exports = isValid;
