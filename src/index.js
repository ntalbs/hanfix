#!/usr/bin/env node

import fs from 'fs';
import { program } from 'commander';
import { check } from './hanfix.js';

program
  .description('Korean Spell Checker')
  .option('-d, --data <text>', 'text for spell check')
  .option('-c, --include-corrected', 'include corrected text in the result')
  .action((options) => {
    if (!options.data) {
      readFromStdin(options);
    } else {
      checkText(options.data, options);
    }
  })
  .parse(process.argv);

async function readFromStdin (options) {
  try {
    const inputText = fs.readFileSync(0, 'utf8');
    const result = await check(inputText);
    const output = {
      errors: result
    };

    if (options.includeCorrected) {
      output.corrected = correctText(inputText, result);
    }

    process.stdout.write(JSON.stringify(output));
  } catch (err) {
    process.stderr.write(err.message);
    process.exit(1);
  }
}

async function checkText(inputText, options) {
  const result = await check(inputText);
  const output = {
    errors: result
  };

  if (options.includeCorrected) {
    output.corrected = correctText(inputText, result);
  }

  process.stdout.write(JSON.stringify(output));
}

function correctText(inputText, result) {
  let correctedText = inputText;
  for (const e of result) {
    correctedText = correctedText.replaceAll(e.input, e.output);
  }
  return correctedText;
}
