# npx and yarn dlk

`npx` 와 `yarn dlk` 명령어는 일회성으로 npm 패키지를 실행할 때 사용된다.

## 일회성으로 패키지를 실행한다?

'패키지를 일회성으로 실행한다'는 말은 해당 패키지를 현재 프로젝트에 영구적으로 설치하지 않고, 딱 한 번만 실행한다는 의미이다.

일반적으로 패키지를 사용할 때 사용하는 `npm install` 이나 `yarn add` 명령어를 사용하면 해당 디렉토리 내 `node_modules` 폴더에 해당 패키지와 그 패키지가 의존하는 패키지들(종속성)이 설치된다.

그러나 `npx` 나 `yarn dlk` 명령어를 실행하면 해당 패키지가 현재 프로젝트의 종속성으로 추가되지 않고, 당연히 `node_modules` 에도 설치되지 않는다. `create-react-app` 처럼 새로운 프로젝트를 초기화할 때 자주 활용되고, 특정 도구를 테스트하거나 스크립트를 실행할 때 사용된다.

## npx

```shell
npx husky-init && npm install
```

`npx husky-init ` 이 성공적으로 실행되면 `npm install` 이 실행된다.

## yarn

```shell
yarn dlx husky-init --yarn2 && yarn
```

> --yarn2 는 yarn berry(yarn 2) 사용 시, 이에 특화된 설정을 사용하기 위한 플래그로, yarn 1 사용 중이면 무시된다.
