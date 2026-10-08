/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let prefix = strs[0];

  for (let index = 1; index < strs.length && prefix.length > 0; index += 1) {
    while (!strs[index].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }

  return prefix;
};

module.exports = longestCommonPrefix;
