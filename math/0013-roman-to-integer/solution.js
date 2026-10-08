/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let index = 0; index < s.length; index += 1) {
    const current = values[s[index]];
    const next = values[s[index + 1]];
    total += current < next ? -current : current;
  }

  return total;
};

module.exports = romanToInt;
