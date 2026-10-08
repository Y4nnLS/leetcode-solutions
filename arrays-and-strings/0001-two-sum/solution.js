/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const indicesByValue = new Map();

  for (let index = 0; index < nums.length; index += 1) {
    const value = nums[index];
    const complement = target - value;

    if (indicesByValue.has(complement)) {
      return [indicesByValue.get(complement), index];
    }

    indicesByValue.set(value, index);
  }
};

module.exports = twoSum;
