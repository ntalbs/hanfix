#!/usr/bin/env node

import fs from 'fs';
import { check } from './hanfix.js';

try {
  const inputText = fs.readFileSync(0, 'utf8');
  const result = await check(inputText);

  let correctedText = inputText;
  for (const e of result) {
    correctedText = correctedText.replaceAll(e.input, e.output);
  }

  const output = {
    errors: result,
    corrected: correctedText
  }

//  process.stdout.write(JSON.stringify(output));
  console.log(output)

} catch (err) {
  process.stderr.write(err.message);
  process.exit(1);
}
