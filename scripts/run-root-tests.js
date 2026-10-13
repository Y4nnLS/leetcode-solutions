const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = process.cwd();
const ignoredDirectories = new Set(['.git', 'apps', 'node_modules', 'coverage']);
const testFiles = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) collect(path.join(directory, entry.name));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.test.js')) testFiles.push(path.join(directory, entry.name));
  }
}

collect(root);
testFiles.sort();

const coverage = process.argv.includes('--coverage');
const watch = process.argv.includes('--watch');
const result = spawnSync(process.execPath, [coverage ? '--experimental-test-coverage' : '', '--test', watch ? '--watch' : '', ...testFiles].filter(Boolean), {
  cwd: root,
  stdio: 'inherit'
});

process.exitCode = result.status ?? 1;
