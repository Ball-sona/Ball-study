# Package Manager

**패키지 매니저**란 프로젝트가 의존하고 있는 패키지를 효과적으로 설치, 갱신, 삭제할 수 있도록 도와주는 관리 도구이다.

## 의존성 관리

어떤 패키지가 다른 패키지를 사용할 때, 이를 의존 관계라고 한다. 그런데 의존 관계에 있어서 우리는 주의를 기울어야 한다.

![image](https://user-images.githubusercontent.com/67703882/217890390-2eef1b40-a478-4a1f-9480-59c40062c857.png)

A,B,C 라는 모듈이 있고 현재 의존 관계는 다음과 같다. 이때 만약 A와 C 모듈을 사용해 새로운 프로그램을 만들고자 한다면, **B의 어떤 버전**을 가져와야하는걸까? (의존성 지옥)

<img width="629" alt="스크린샷 2023-02-10 02 28 29" src="https://user-images.githubusercontent.com/67703882/217891327-b8fea51a-37e8-4687-ac11-1068b4377388.png">

- npm v2는 의존 관계에 있는 모듈을 상위 관계에 있는 모듈 아래에 둔다. 이렇게 되면 중복으로 존재하는 모듈들이 존재하게 되고, 이는 중첩된 관계들로 이어진다.

  - `node_modules/A/.../node_modules/C`

- npm v3는 모든 모듈을 '플랫(flat)'하게 둔다. 이미 설치한 모듈의 다른 버전이 새롭게 필요하다면 해당 모듈을 필요로 하는 상위 모듈 아래에 둔다. yarn classic 역시 이 방식을 사용한다.
  - `node_modules/A,B,C`
  - 이 방식은 모듈의 설치 순서에 따라 의존성 구조가 달라질 수 있다는 문제가 있다. 또 보안의 위험도 존재한다. (npm v6부터는 audit 기능 지원)

현재까지 나와있는 패키지 매니저, npm, yarn, pnpm, yarn berry의 각각의 특성과 차이점들에 대해 알알아보자.

## 1. npm

**npm**은 node.js 의 표준 패키지 매니저이다.

### 특징

- 패키지 버전 잠금을 위해 `package-lock.json` 사용한다.

- **npm**을 사용했을 때 파일 구조

  ```
  .
  ├── node_modules/
  ├── .npmrc
  ├── package-lock.json
  └── package.json
  ```

### 보안

npm은 보안과 관련된 문제들을 많이 겪었다.

- `package-lock.json` 의 SHA-512 암호화 알고리즘을 사용해서 설치하는 패키지의 무결성을 체크한다.

## 2. yarn classic

**Yarn** (Yet Another Resoucre Negotiator) 은 페이스북에서 만든 자바스크립트 패키지 매니저이다.

### 특징

- `yarn.lock` 파일을 통해 패키지 버전 잠금을 지원하므로, 이를 통해 프로젝트에서 의존하는 모든 패키지를 어느 환경에서든 동일하게 설치 가능

- npm3의 flat한 의존성 구조를 사용한다.

- **yarn classic**을 사용했을 때 파일 구조

  ```
  .
  ├── .yarn/
  │   ├── cache/
  │   └── releases/
  │       └── yarn-1.22.17.cjs
  ├── node_modules/
  ├── .yarnrc
  ├── package.json
  └── yarn.lock
  ```

### 일관성과 보안

- `yarn.lock` 파일을 자동으로 생성하고 의존 모듈들을 순서대로 작성.
- 패키지 잠금 파일은 특정 버전만 설치가 가능하기 때문에, npm의 보안성 문제가 일어나지 않는다. 또 순서대로 작성하므로 작업하거나 검토할 때 수정한 부분을 알아보기 쉽다.
- `yarn.lock` 에 저장된 체크섬으로 각 패키지의 무결성을 검증

### 성능

- 패키지들을 병렬적으로 설치하므로 순차적으로 설치하는 npm 보다 속도가 훨씬 빠르다.
- 오프라인 미러 -> 오프라인 설치 가능

### 단점

- flat한 의존성 트리를 만드는 알고리즘 비용이 많이 든다.
- 유령 의존성(phantom dependency) : 내가 사용하겠다고 적은 패키지는 아니지만, 의존 관계 때문에 자동으로 설치되어 사용이 가능해져버린 것. 이는 관리가 어렵다는 문제가 있다.

## 3. pnpm

**pnpm(performant npm)**은 Zoltan Kochan이 2017년에 내놓은 패키지 매니저이다.

기존 패키지 매니저에 비해 종속성 관리, 디스크 효율성, 속도 등의 관점에서 휼륭한 성능을 보이고 있는 [pnpm][https://pnpm.io/] 에 대해 알아보자.

### 소개 및 특징

- 기존의 npm 와 yarn classic은 호이스팅을 통해 모듈들의 종속 관계들을 플랫하게 만들어 패키지들을 관리하나, 이런 방식은 유령 의존성이나 플랫 알고리즘의 복잡성 등 여러 어려움이 존재했다.

- 이에 대안책으로 pnpm 은 **중첩된 `node_modules` 구조**를 채택했고, 의존성을 더욱 효과적으로 저장하기 위해 '내용 주소화 저장소(Content-addressable storage)' 방식을 사용한다.

  <img src="https://user-images.githubusercontent.com/67703882/218006980-0d3f16a2-f6c7-4680-a140-7668e7890f15.png" alt="image" style="zoom:50%;" />

  - 홈 폴더 (`~/.pnpm-store/`) 의 전역 저장소에 패키지를 저장한다. 이때 의존성 패키지들의 모든 버전은 해당 폴더에 딱 한번만 복사본으로 설치가 된다.

  - `node_modules` 레이아웃은 심볼릭 링크를 사용하여 의존성의 중첩 구조를 생성한다. 여기서 폴더 내의 모든 패키지들의 파일들은 저장소에 대한 하드 링크가 된다.

    [symlink된 node_modules 구조][https://pnpm.io/ko/symlinked-node-modules-structure]

> **심볼릭 링크(Symbolic Link)** : 원본 파일의 이름을 가리키는 링크로, 원본 파일이 사라지게 되면 링크 파일은 역할을 수행할 수 없다. (윈도우의 '바로가기'와 비슷한 개념)
>
> **하드링크(Hard Link)** : 심볼릭 링크와 달리, 하드링크는 원본 파일과 동일한 inode를 가지게 되므로, 원본 파일이 삭제되어도 링크된 파일은 여전히 사용 가능하다.

- pnpm 이용하여 'gdsc-pack' 라는 패키지를 설치했다고 가정했을 때 폴더 구조를 살펴보자.

  ```
   .
   ├── node_modules/
   │   └── .pnpm/
   │   └── .modules.yaml/
   │   └── gdsc-lib
   ├── .npmrc
   ├── package.json
   └── pnpm-lock.yml
  ```

  npm이나 yarn을 사용하여 설치하게 되면 gdsc-pack 패키지와 이 패키지와 의존 관계에 있는 패키지들이 모두 `node_modules` 에 설치되어 flat하게 관리되지만, pnpm을 이용해 설치하면 `node_modules` 에는 gdsc-lib 패키지만 설치되는 것을 볼 수 있다.

​ 이와 의존 관계에 있는 패키지들은 `node_modules/.pnpm` 에 flat한 구조로 존재하게 된다.

- 자체 버전의 lock 파일인 `pnpm-lock.yml` 을 생성한다. 선택적으로 `.npmrc` 파일을 사용하여 추가 설정도 할 수 있다.
- npm에 대한 드롭 인 대체(Drop-in replacement) 이므로 npm 프로젝트에서는 바로 pnpm을 사용할 수 있다.

> **드롭 인 대체(Drop-in replacement)** : 어떤 부품이나 프로그램을 대체했을 때 별다른 설정 등을 수정하지 않아도 되고 속도, 안정성, 용량 등의 성능이 올라가는 대체를 의미한다.

### 성능

- 글로벌 저장소에 패키지를 물리적으로 한번만 저장하므로 디스크 공간을 절약할 수 있다.
- `node_modules` 에 유령 종속성이 없도록 깔끔하게 유지한다.

- 모듈 설치 및 실행 속도가 매우 빠르다. 다른 패키지 매니저들과 비교했을 때에도 설치 속도가 빠른 편임을 확인할 수 있다.

  <img src="https://user-images.githubusercontent.com/67703882/218030605-52bbb5bc-84f9-448f-b921-b7128feec12e.png" alt="image" style="zoom:67%;" />

### 보안

- 코드가 실행되기 전에 체크섬을 이용하여 설치된 모든 패키지의 무결성을 확인한다.

- npm 와 yarn classic 에서 사용하는 패키지 호이스팅을 하지 않기 때문에 이와 관련한 유령 의존성 등 보안 이슈를 피할 수 있다.

- 대신 불법 의존성 접근의 위험을 제거하는 중첩된 `node_modules` 폴더를 생성한다.

  즉, 의존성이 `package.json`에 명시적으로 선언된 경우에만 다른 의존성에 액세스할 수 있도록 한다.

### 사용

- pnpm 설치

  ```
  npm i -g pnpm
  ```

- `pnpm-lock.yaml` 생성

  ```
  pnpm import
  ```

​ 이후 `package-lock.json` 이나 `yarn.lock` 파일 삭제

- 의존성 설치

  ```
  pnpm i
  ```

### 문제점

pnpm이 하드 링크를 사용하므로서 생기는 호환성 문제들이 발생할 수 있다.

- 운영체제와 파일 시스템에 따라 방식이 다르고, 하드 링크나 심볼릭 링크를 지원하지 않는 파일 시스템도 존재한다.
- 파일 감시툴인 watchman 에서 동작하지 않는다.

## 4. yarn berry

**Yarn2 (Yarn Berry)** 는 Yarn에서 주요 업그레이드가 된 새로운 패키지 매니저

#### 특징

- **Plug'n'Play** 라는 새로운 패키지 방식은 프로젝트의 `node_modules` 디렉토리에 패키지를 저장하지 않는다.
- `node_modules` 를 생성하는 대신 의존성 조회 테이블이 있는 `.pnp.cjs` 파일이 생성되며, 중첩된 폴더 구조가 아닌 단일 파일이기 때문에 효율적으로 처리가 가능하다.

- 패키지들은 `node_modules` 폴더가 아닌 디스크 공간을 덜 차지하는 `.yarn/cache/` 폴더에 zip 파일로 저장된다.

- **yarn berry**을 사용했을 때 파일 구조

  ```
  .
  ├── .yarn/
  │   ├── cache/
  │   └── releases/
  │       └── yarn-3.1.1.cjs
  ├── node_modules/
  ├── .yarnrc.yml
  ├── package.json
  └── yarn.lock
  ```

### 보안

- PnP 모드의 yarn berry는 전통적인 `node_modules` 접근 방식의 보안 문제를 겪지 않는다.
- yarn classic 과 달리 명령어 실행 보안을 향상시켰다.

## 모노레포(mono-repo)

모노레포는 워크스페이스 또는 패키지라고 하는 여러 프로젝트를 보관하는 저장소이다. 여러 repository를 사용하는 대신 모든 것을 한 곳에 보관하는 프로젝트 구성 전략이다.

### npm

npm7에서 npm 워크스페이스 기능을 출시했다. 루트 패키지 내에서 다중 패키지 프로젝트를 관리하는데 도움이 되는 여러 명령어를 이용할 수 있다.

```bash
# 모든 워크스페이스에 대한 모든 의존성 설치
$ npm i --workspaces.
# 하나의 패키지에 대해 실행
$ npm run test --workspace=hooks
# 여러 패키지에 대해 실행
$ npm run test --workspace=hooks --workspace=utils
# 모두 실행
$ npm run test --workspaces
# 테스트가 누락된 모든 패키지 무시
$ npm run test --workspaces --if-present
```

### yarn classic

### yarn berry

### pnpm

## 인기 프로젝트이 채택한 매니저

- npm : svelte, preact, express, meteor, apollo server
- yarn : react, angular, ember, next, gatsby, nuxt, cra, webpack-cli, emotion
- yarn berry : jest, storybook, babel, redux toolkit
  - 다만 pnp 접근 방식은 어떤 프로젝트도 사용하지 않는다.
- pnpm : vue3, browerlist, prisma, sveltekit

## 참고자료

https://dev-boku.tistory.com/entry/%EB%B2%88%EC%97%AD-JavaScript-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80-%EB%B9%84%EA%B5%90-npm-Yarn-%EB%98%90%EB%8A%94-pnpm

https://medium.com/zigbang/%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%A7%A4%EB%8B%88%EC%A0%80-%EA%B7%B8%EA%B2%83%EC%9D%B4-%EA%B6%81%EA%B8%88%ED%95%98%EB%8B%A4-5bacc65fb05d
