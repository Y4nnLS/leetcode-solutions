const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const requiredFiles = ['solution.js', 'cases.json', 'solution.test.js', 'NOTES.md'];
const expected = new Map([
  ['0001', 'arrays-and-strings/0001-two-sum'],
  ['0009', 'math/0009-palindrome-number'],
  ['0013', 'math/0013-roman-to-integer'],
  ['0014', 'arrays-and-strings/0014-longest-common-prefix'],
  ['0020', 'stack/0020-valid-parentheses'],
  ['0021', 'linked-lists/0021-merge-two-sorted-lists'],
  ['0026', 'arrays-and-strings/0026-remove-duplicates-from-sorted-array']
]);
const errors = [];
const foundNumbers = new Set();

function reportError(message) {
  errors.push(message);
}

for (const [number, relativeDirectory] of expected) {
  const directory = path.join(root, relativeDirectory);
  if (!fs.existsSync(directory)) {
    reportError(`${number}: required directory is missing: ${relativeDirectory}`);
    continue;
  }

  foundNumbers.add(number);
  for (const filename of requiredFiles) {
    if (!fs.existsSync(path.join(directory, filename))) {
      reportError(`${number}: missing ${filename}`);
    }
  }

  try {
    const cases = JSON.parse(fs.readFileSync(path.join(directory, 'cases.json'), 'utf8'));
    if (!Array.isArray(cases)) throw new Error('must be an array');
    for (const [index, scenario] of cases.entries()) {
      if (!scenario || typeof scenario.name !== 'string' || !Object.hasOwn(scenario, 'input') || !Object.hasOwn(scenario, 'expected')) {
        reportError(`${number}: cases.json scenario ${index} must contain name, input, and expected.`);
      }
    }
  } catch (error) {
    reportError(`${number}: invalid cases.json (${error.message}).`);
  }

  try {
    const solution = require(path.join(directory, 'solution.js'));
    if (typeof solution !== 'function') reportError(`${number}: solution.js must export a function.`);
  } catch (error) {
    reportError(`${number}: solution.js could not be imported (${error.message}).`);
  }
}

for (const topic of ['arrays-and-strings', 'math', 'stack', 'linked-lists']) {
  if (!fs.existsSync(path.join(root, topic))) reportError(`Required topic directory is missing: ${topic}`);
}

const discovered = [];
for (const topic of fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))) {
  const topicPath = path.join(root, topic.name);
  for (const child of fs.readdirSync(topicPath, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const match = /^(\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(child.name);
    if (!match) {
      reportError(`${topic.name}/${child.name}: directory must use NNNN-kebab-case.`);
      continue;
    }
    if (discovered.includes(match[1])) reportError(`${match[1]}: duplicate exercise number.`);
    discovered.push(match[1]);
  }
}

const readmePath = path.join(root, 'README.md');
if (!fs.existsSync(readmePath)) {
  reportError('README.md is missing.');
} else {
  const readme = fs.readFileSync(readmePath, 'utf8');
  for (const match of readme.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g)) {
    const localPath = match[1].split('#')[0];
    if (localPath && !fs.existsSync(path.resolve(root, localPath))) reportError(`README link target does not exist: ${localPath}`);
  }
}

if (errors.length > 0) {
  console.error('Repository validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Repository structure is valid (${foundNumbers.size} registered exercises).`);
}
