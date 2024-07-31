## Husky

기본적으로 [Git hook](/)은 `.git/hooks` 디렉토리에 저장하여 사용하지만, 이렇게 되면 git repository에서 원격으로 저장 및 관리를 할 수 없기 때문에 이를 여러 사람들 간에 공유할 수가 없다.

이러한 불편함을 해결할 수 있는 도구 중 node.js 환경에서 사용할 수 있는 [husky](https://github.com/typicode/husky) 라이브러리에 대해 알아보자.

## Settings

### Install

```shell
# install
yarn add husky -D
# enable git hooks
npx husky install
```

### package.json

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

> `prepare` 스크립트는 패키지가 패킹되기 전에 실행되는 스크립트로, `npm publish` or `npm install` 가 실행될 때 호출

### Automatic setting

```shell
yarn dlx husky-init --yarn2 && yarn
```

위 명령어 실행하면 설치부터 설정까지 자동으로 해준다.

## Hook + Lint-staged

- Husky hook을 사용해서 매 커밋 전 린트 툴을 돌려 코드 내 오류, 버그, 포멧팅 등을 검사할 수 있다.
- 이때 모든 파일을 대상으로 코드를 검사해버리면 시간이 오래걸리고 매우 비효율적이다.
- 이때 [lint-staged](https://github.com/lint-staged/lint-staged)라는 라이브러리를 사용하면 **스테이징된, 즉 내가 현재 변경한 코드만 대상으로 검사를 진행**할 수 있다.

### 1. 파일 생성

```shell
npx husky add .husky/pre-commit
```

### 2. 스크립트 작성

```
#! /bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 3. package.json

package.json 에 다음과 같은 내용을 추가해준다.

```js
"lint-staged": {
    "*.{ts,tsx,js,jsx}": "eslint --cache --fix"
  }
```

- TS, JS로 작성된 파일만을 대상으로 `eslint` 린트 검사를 수행한다.
- 이때 린트 검사 결과를 캐싱하여 재검사 속도를 높이고, `--fix`를 통해 가능한 많은 **린트 오류를 자동으로 수정할 수 있도록 설정**한다.

## Hook + CommitLint

이번엔 [CommitLint](https://commitlint.js.org/#/)라는 라이브러리와 함께 husky hook을 작성해보자.

### 0. CommitLint

CommitLint는 커밋 메세지 검사할 수 있는 라이브러리이다. 팀 내 커밋 컨벤션을 유지하는데 아주 유용하다.

### 1. Install

```shell
yarn add @commitlint/cli @commitlint/config-conventional -g
```

> 패키지를 설치하지 않고 실행하고 싶다면 `npx --no-install` or `yarn dlk` 명령어를 사용해주면 된다.

### 2. commitlint.config.js

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

자동으로 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 를 사용하게 된다. config 파일을 수정하여 규칙을 팀의 컨벤션에 맞게 수정할 수 있다.

> Conventional Commits
>
> - msg format : `type(scope?): message`
> - type : build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test

### 3. create commit-msg hook

husky 폴더 내에`commit-msg` 라는 훅을 생성 후 아래 스크립트를 작성한다.

```
#! /bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```
