# Javascript Module System and Bundler

- 기본적으로 HTML에서 여러 스크립트를 불러오게 되면, 해당 스크립트(모듈) 간의 **스코프가 구분이 되지 않는다.** → 충돌 발생 가능
- 이를 해결하기 위해 등장한 모듈 시스템과 관련 도구들에 대해 알아보자.

## CJS(Common JS)

브라우저에서만 사용되던 자바스크립트를 서버 사이드단에서도 범용적으로 사용될 수 있도록 모듈 시스템을 제작하자!

- 모듈을 동기적으로 호출하는 방식
- `module.exports` 와 `require()`
- 비동기 방식보다 느리고, 트리 쉐이킹 어려움, 순환 참조 취약
- Node.js가 CJS를 표준으로 채택 후 구현 → 현재는 ESM도 안정적으로 지원
- 인기 많아진 CJS 방식을 브라우저단에서도 사용해보려는 도구가 **Browserify**

```js
const foo = require('./foo');
module.exports = {
  //...
};
```

## AMD(Asynchronous Module Definition)

비동기적으로 모듈을 실행하자!

- 비동기 상황에서 모듈 어떻게 할지 CJS와 논의하다가 합의점 못찾고 나온 그룹
- 브라우저, 서버 사이드 모두 호환되는 방식
- 이를 구현한 대표적인 모듈 로더 라이브러리가 **RequireJS**

```js
define(['./foo'], function (foo) {
  return {
    // ...
  };
});
```

## UMD(Universal Module Definition)

CJS와 AMD 방식을 모두 호환해볼게

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['moduleA'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('moduleA'));
  } else {
    // Global
    root.myModule = factory(root.moduleA);
  }
})(this, function (moduleA) {
  return {
    // ...
  };
});
```

## ESM(ES6 Module)

ES6에서 자바스크립트 표준 모듈 시스템 명세가 등장

- 동기/비동기 로드 모두 지원
- 간단한 문법 → `import` 와 `export`
- 실제 객체/함수를 바인딩하기 때문에 순환 참조 관리 편리
- CJS와 달리 import/export 모듈을 정적으로 불러오기 때문에 정적 분석 가능 + 트리 쉐이킹 쉽게 가능
- 그러나 최신 문법인지라 구형 브라우저에서는 동작 안함 -> 모든 환경에서 모듈 시스템을 사용하기 위한 모듈 로더 SystemJS 까지 등장

```js
import moduleA from './moduleA';
export const myModule = {
  // ...
};
```

## Transfiler

최신 문법과 함께 자바스크립트를 작성하면, 이를 한번에 컴파일해서 구형 브라우저에서도 동작하는 자바스크립트로 변환해주는 도구

- 대표적인 도구가 **Babel** → 호환성 해결
- CoffeScript, **Typescript** 같은 슈퍼셋 언어까지 등장

### SWC

- 트랜스파일러인 Babel, Typescript의 내장 컴파일러인 TSC는 싱글 스레드에서 실행되어 속도가 느리다는 단점
- SWC는 Rust 언어 기반으로 엄청난 속도로 모듈을 빌드함
- Next.js가 사용

## Task Runner

린트, 번들링, 빌드, 최적화, 테스트 등 프로덕트 개발 과정에서 필요한 일련의 과정들을 자동화하는 도구

- 대표적인 도구가 **Grunt, Gulp**
- 현재는 번들러 자체에서도 각종 플러그인을 제공하고 있기 때문에 별도의 테스크 러너를 잘 사용하지 않게 됨

## Bundler

자바스크립트 모듈을 브라우저에서 실행할 수 있는 단일 파일로 번들링하는 데 사용되는 도구

- 모듈 로더들은 런타임에 모듈을 가져오는데 초점 두었다면, 번들러는 빌드 시 모듈을 묶어서 단일 번들 파일로 만들기 때문에 런타임에서 모듈을 추가로 불러올 필요가 없음
- 모든 브라우저에서 모듈 시스템 호환될 수 있도록 하고, 코드 종속성 관계나 순서 관리하고, 다른 에셋 로드하고, 트리 쉐이킹 기능까지 다양한 기능 제공

### Webpack

- 높은 안정성과 풍부한 생태계
- Live Reloading, HMR 등 뛰어난 개발 서버 기능
- CJS 기반 (v5부터 ESM 번들 지원)
- 복잡한 설정

> **Live Reload vs Hot Reload vs HMR**
>
> - Live Reload: 소스코드 변경 사항 감지 시 전체 페이지(혹은 서버) 자동 새로고침. 애플리케이션 상태 유지 불가 (ex. `nodemon`)
> - Hot Reload: 소스코드 변경 시 런타임에 새로운 코드 주입하여 즉시 변경 사항 반영. 애플리케이션 상태 유지 가능. 주로 모바일 개발 환경에서 사용 (ex. `react fast refresh`)
> - Hot Module Replacement(HMR): 모듈의 일부가 변경 시 전체 페이지 새로고침하지 않고 변경된 모듈만 교체. 나머지 애플리케이션 상태는 유지. 주로 모듈 번들러에서 사용 (`ex. webpack`)

### Rollup

- ESM 기반으로 최적화된 결과물과 작은 번들 크기를 제공
- 라이브러리 번들링에 특화
- ES6 코드에서 더 제대로 동작하는 Tree Shaking에 강함.

### Parcel

- Zero Configuration
- HTML 파일을 기반으로 알아서 어떻게 config할지 결정
- ESM/CJS 모두 Three Shaking 지원

### ESBuild

- Go 언어로 작성된 번들러로, 속도 매우 빠름
- 번들러 주요 기능을 갖추고는 있지만, 아직 안정성 이슈 등으로 인해 메이저 버전이 릴리즈되지 못하고 있다.

## 참고

- [Javascript 번들러로 본 조선시대 붕당의 이해](https://yozm.wishket.com/magazine/detail/1261/)
- [Why I use Rollup, and not Webpack](https://medium.com/@PepsRyuu/why-i-use-rollup-and-not-webpack-e3ab163f4fd3)
