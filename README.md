# Hanfix

`hanfix`는 [다음 맞춤법
검사기](https://dic.daum.net/grammar_checker.do)를 이용한 한글 맞춤법
검사기입니다. [hanspell](https://github.com/9beach/hanspell)에서
영감을 받아 작성했습니다. `hanspell`과 다른 점은 다음과 같습니다.

- 맞춤법 검사는 다음 맞춤법 검사기만 사용합니다.
- 입력 텍스트를 `-d`(또는 `--data`) 옵션으로 제공할 수 있습니다. 이
  옵션을 지정하지 않은 경우에는 STDIN으로부터 입력을 기다립니다.

## 설치

`hanfix`는 다음과 같이 설치할 수 있습니다.

```console
npm install -g hanfix
```


## 사용법

```console
$ hanfix --help
Usage: index [options]

Korean Spell Checker

Options:
  -d, --data <text>        text for spell check
  -c, --include-corrected  include corrected text in the result
  -h, --help               display help for command
```

결과는 JSON으로 출력되며 다음과 같은 형식입니다.

```json
{
  "errors": [
    {
      "original": "원래 텍스트...",
      "suggestions": ["교정제안1", "교정제안2", ...],
      "explanation": "설명...",
      "examples": ["예문1...", "예문2...", ...]
  ]
}
```
