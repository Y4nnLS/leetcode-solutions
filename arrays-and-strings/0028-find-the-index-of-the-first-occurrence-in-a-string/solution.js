/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle === "") return 0;

  const needleLength = needle.length;
  const haystackLength = haystack.length;

  for (let i = 0; i <= haystackLength - needleLength; i++) {
    if (haystack.substring(i, i + needleLength) === needle) {
      return i;
    }
  }
  return -1;
};

module.exports = strStr;
