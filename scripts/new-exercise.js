const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

function toKebabCase(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function assertValid(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const prompt = readline.createInterface({ input, output });

  try {
    const number = (await prompt.question('Problem number: ')).trim();
    const name = (await prompt.question('Problem name: ')).trim();
    const difficulty = (await prompt.question('Difficulty (Easy, Medium, or Hard): ')).trim();
    const topic = (await prompt.question('Topic: ')).trim();
    const functionName = (await prompt.question('Function name: ')).trim();
    const parameters = (await prompt.question('Parameters (comma-separated): ')).trim();
    const url = (await prompt.question('LeetCode URL (optional): ')).trim();

    assertValid(/^\d+$/.test(number) && Number(number) > 0, 'Problem number must be a positive integer.');
    assertValid(name.length > 0, 'Problem name is required.');
    assertValid(['Easy', 'Medium', 'Hard'].includes(difficulty), 'Difficulty must be Easy, Medium, or Hard.');
    assertValid(topic.length > 0 && toKebabCase(topic), 'Topic is required.');
    assertValid(/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(functionName), 'Function name must be a valid JavaScript identifier.');
    assertValid(!parameters || parameters.split(',').every((item) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(item.trim())), 'Parameters must be comma-separated JavaScript identifiers.');
    assertValid(!url || /^https:\/\/leetcode\.com\/problems\/.+\/$/.test(url), 'LeetCode URL must use https://leetcode.com/problems/.../.');

    const paddedNumber = number.padStart(4, '0');
    const topicDirectory = toKebabCase(topic);
    const exerciseDirectoryName = `${paddedNumber}-${toKebabCase(name)}`;
    const root = process.cwd();
    const existing = fs.readdirSync(root, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .some((entry) => fs.readdirSync(path.join(root, entry.name), { withFileTypes: true })
        .some((child) => child.isDirectory() && child.name.startsWith(`${paddedNumber}-`)));
    assertValid(!existing, `Exercise ${Number(number)} already exists and will not be overwritten.`);

    const target = path.join(root, topicDirectory, exerciseDirectoryName);
    assertValid(!fs.existsSync(target), `Directory ${exerciseDirectoryName} already exists and will not be overwritten.`);

    const parameterList = parameters.split(',').map((item) => item.trim()).filter(Boolean).join(', ');
    const scenarioArguments = parameterList
      .split(',')
      .filter(Boolean)
      .map((parameter) => `scenario.input.${parameter.trim()}`)
      .join(', ');
    const solution = `/**\n * @param {...} ${parameterList || 'none'}\n * @return {*}\n */\nvar ${functionName} = function (${parameterList}) {\n  throw new Error('Not implemented');\n};\n\nmodule.exports = ${functionName};\n`;
    const cases = '[]\n';
    const test = `const test = require('node:test');\nconst assert = require('node:assert/strict');\nconst ${functionName} = require('./solution');\nconst { selectCases } = require('../../shared/case-selection');\nconst cases = require('./cases.json');\n\nfor (const scenario of selectCases(cases)) {\n  test(\`LeetCode ${Number(number)} — \${scenario.name}\`, () => {\n    const actual = ${functionName}(${scenarioArguments});\n\n    assert.deepEqual(actual, scenario.expected);\n  });\n}\n`;
    const notes = `# ${Number(number)} — ${name}\n\n## Informações gerais\n\n- Dificuldade: ${difficulty}\n- Categoria: ${topic}\n- Link: ${url || 'Adicionar link do LeetCode.'}\n\n## Entendimento do problema\n\nDescreva o problema com suas próprias palavras.\n\n## Anotações\n\n- Hipóteses:\n- Tentativas:\n- Dificuldades encontradas:\n- Solução final (após implementar):\n`;

    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, 'solution.js'), solution);
    fs.writeFileSync(path.join(target, 'cases.json'), cases);
    fs.writeFileSync(path.join(target, 'solution.test.js'), test);
    fs.writeFileSync(path.join(target, 'NOTES.md'), notes);

    console.log(`Created ${path.relative(root, target)} with solution.js, cases.json, solution.test.js, and NOTES.md.`);
    console.log('Next steps: add JSON cases, implement the function, write the notes, update this table, and run npm run validate before calling the problem solved.');
  } catch (error) {
    console.error(`Could not create exercise: ${error.message}`);
    process.exitCode = 1;
  } finally {
    prompt.close();
  }
}

main();
