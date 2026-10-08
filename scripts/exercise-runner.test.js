const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { parseArguments, validateCasePosition, run } = require('./exercise-runner');
const { selectCases } = require('../shared/case-selection');

test('exercise runner accepts an optional one-based case position', () => {
  assert.deepEqual(parseArguments(['21']), { rawNumber: '21', selectedCase: undefined });
  assert.deepEqual(parseArguments(['21', '--case', '3']), { rawNumber: '21', selectedCase: '3' });
});

test('exercise runner rejects malformed problem and case arguments', () => {
  assert.throws(() => parseArguments(['0']), /Problem number must be a positive integer/);
  assert.throws(() => parseArguments(['21', '--case', '0']), /Case number must be a positive integer/);
  assert.throws(() => parseArguments(['21', '--case']), /Unknown or malformed argument/);
  assert.throws(() => parseArguments(['21', '--unknown', '1']), /Unknown or malformed argument/);
});

test('exercise runner reports a requested case beyond the available range', () => {
  assert.throws(
    () => validateCasePosition('8', 5, '26'),
    /Case 8 does not exist for exercise 26\.\nAvailable cases: 1 to 5\./
  );
});

test('case selection exposes only the requested scenario to test callbacks', () => {
  const executed = [];
  const scenarios = [
    { name: 'first', execute: () => executed.push('first') },
    { name: 'second', execute: () => executed.push('second') },
    { name: 'third', execute: () => executed.push('third') }
  ];

  for (const scenario of selectCases(scenarios, '2')) {
    scenario.execute();
  }

  assert.deepEqual(executed, ['second']);
  assert.deepEqual(selectCases(scenarios), scenarios);
});

test('exercise runner inherits stdout and stderr for selected-case debugging', () => {
  let childOptions;
  const exitCode = run(
    ['21', '--case', '2'],
    path.resolve(__dirname, '..'),
    (command, args, options) => {
      childOptions = options;
      return { status: 0 };
    },
    () => {}
  );

  assert.equal(exitCode, 0);
  assert.equal(childOptions.stdio, 'inherit');
  assert.equal(childOptions.env.LEETCODE_CASE, '2');
});

test('selected case runs only its solution call', () => {
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'leetcode-case-runner-'));
  const exerciseDirectory = path.join(temporaryRoot, 'fixture-topic', '9998-console-fixture');
  const selectionModule = path.resolve(__dirname, '../shared/case-selection.js');
  const runner = path.resolve(__dirname, 'run-exercise.js');
  const resultFile = path.join(temporaryRoot, 'executed-cases.txt');

  try {
    fs.mkdirSync(exerciseDirectory, { recursive: true });
    fs.writeFileSync(path.join(exerciseDirectory, 'cases.json'), JSON.stringify([
      { name: 'first' },
      { name: 'second' },
      { name: 'third' }
    ]));
    fs.writeFileSync(path.join(exerciseDirectory, 'solution.js'), [
      "const fs = require('node:fs');",
      `const resultFile = ${JSON.stringify(resultFile)};`,
      'module.exports = function runScenario(name) {',
      "  console.log(`solution called: ${name}`);",
      "  fs.appendFileSync(resultFile, `${name}\\n`);",
      '};'
    ].join('\n'));
    fs.writeFileSync(path.join(exerciseDirectory, 'solution.test.js'), [
      "const test = require('node:test');",
      "const runScenario = require('./solution');",
      `const { selectCases } = require(${JSON.stringify(selectionModule)});`,
      "const cases = require('./cases.json');",
      'for (const scenario of selectCases(cases)) {',
      "  test(scenario.name, () => runScenario(scenario.name));",
      '}'
    ].join('\n'));

    const environment = { ...process.env };
    delete environment.NODE_TEST_CONTEXT;
    const result = spawnSync(process.execPath, [runner, '9998', '--case', '2'], {
      cwd: temporaryRoot,
      encoding: 'utf8',
      env: environment
    });

    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(resultFile, 'utf8'), 'second\n');
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
});
