/**
 * Returns either all scenarios or the one requested by the exercise runner.
 * Case positions are one-based to match their order in cases.json.
 *
 * @param {unknown[]} cases
 * @param {string|undefined} selectedCase
 * @returns {unknown[]}
 */
function selectCases(cases, selectedCase = process.env.LEETCODE_CASE) {
  if (!selectedCase) {
    return cases;
  }

  return [cases[Number(selectedCase) - 1]];
}

module.exports = { selectCases };
