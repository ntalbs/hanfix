import { JSDOM } from 'jsdom';

const GRAMMAR_CHECKER_URL = 'https://dic.daum.net/grammar_checker.do';
const MAX_LEN = 1000;

export async function check(text) {
  if (text.length > MAX_LEN) {
    throw new Error(`Too large text. Input should not exceed ${MAX_LEN} characters.`);
  }
  let html = await send(text);
  return parse(html);
}

function parse(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return [...document.querySelectorAll('div.cont_spell a')].map(node => {
    return {
      errorType: node.dataset.errorType,
      input: node.dataset.errorInput,
      output: node.dataset.errorOutput,
      helpText: node.querySelector('[id="help"] li')?.textContent,
      examples: [...node.querySelectorAll('#examples li')].map(e => e.textContent)
    }
  });
}

async function send(text) {
  const res = await fetch(GRAMMAR_CHECKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'sentence': text
    })
  });

  const result = await res.text();
  return result;
}
