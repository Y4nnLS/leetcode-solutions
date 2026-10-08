const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function usageError(message) {
  return new Error(`${message}\nUsage: npm run test:exercise -- <problem-number> [--case <case-number>]`);
}

function parseArguments(args) {
  if (args.length === 0) {
    throw usageError('A problem number is required.');
  }

  const [rawNumber, ...options] = args;
  if (!/^\d+$/.test(rawNumber) || Number(rawNumber) < 1) {
    throw usageError('Problem number must be a positive integer.');
  }

  if (options.length === 0) {
    return { rawNumber, selectedCase: undefined };
  }

  if (options.length !== 2 || options[0] !== '--case') {
    throw usageError(`Unknown or malformed argument: ${options.join(' ') || '(missing option value)'}.`);
  }

  const selectedCase = options[1];
  if (!/^[1-9]\d*$/.test(selectedCase)) {
    throw usageError('Case number must be a positive integer starting at 1.');
  }

  return { rawNumber, selectedCase };
}

function findExerciseDirectory(root, rawNumber) {
  const normalizedNumber = rawNumber.padStart(4, '0');
  const topicDirectories = fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'));

  for (const topic of topicDirectories) {
    const topicPath = path.join(root, topic.name);
    const match = fs.readdirSync(topicPath, { withFileTypes: true })
      .find((entry) => entry.isDirectory() && entry.name.startsWith(`${normalizedNumber}-`));
    if (match) {
      return path.join(topicPath, match.name);
    }
  }
}

function readCases(exerciseDirectory) {
  const casesPath = path.join(exerciseDirectory, 'cases.json');
  try {
    const cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
    if (!Array.isArray(cases)) throw new Error('must contain a JSON array');
    return cases;
  } catch (error) {
    throw new Error(`Could not read ${casesPath}: ${error.message}`);
  }
}

function validateCasePosition(selectedCase, caseCount, rawNumber) {
  if (!selectedCase) return;

  const position = Number(selectedCase);
  if (position > caseCount) {
    throw new Error(
      `Case ${position} does not exist for exercise ${Number(rawNumber)}.\nAvailable cases: 1 to ${caseCount}.`
    );
  }
}

function run(args, root = process.cwd(), spawn = spawnSync, log = console.log) {
  const { rawNumber, selectedCase } = parseArguments(args);
  const exerciseDirectory = findExerciseDirectory(root, rawNumber);
  if (!exerciseDirectory) {
    throw new Error(`Exercise ${Number(rawNumber)} was not found.`);
  }

  const cases = readCases(exerciseDirectory);
  validateCasePosition(selectedCase, cases.length, rawNumber);

  const environment = { ...process.env };
  if (selectedCase) {
    environment.LEETCODE_CASE = selectedCase;
  } else {
    delete environment.LEETCODE_CASE;
  }

  const caseLabel = selectedCase ? `, case ${selectedCase}` : '';
  log(`Running tests for ${path.basename(exerciseDirectory)}${caseLabel}...`);
  const result = spawn(process.execPath, ['--test', path.join(exerciseDirectory, 'solution.test.js')], {
    cwd: root,
    env: environment,
    stdio: 'inherit'
  });

  return result.status ?? 1;
}

module.exports = { parseArguments, validateCasePosition, run };
