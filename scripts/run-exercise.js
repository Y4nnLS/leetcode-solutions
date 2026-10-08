const { run } = require('./exercise-runner');

try {
  process.exitCode = run(process.argv.slice(2));
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
