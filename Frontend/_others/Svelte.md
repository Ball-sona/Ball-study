# Svelte

## What is Svelte

- Svelte = 사라지는 프레임워크
- 리액트와 뷰 같은 다른 프레임워크와 달리, 런타임 이전인 빌드 타임에 자바스크립트 코드로 변환해 프레임워크 사용시 앱 로드 패널티를 가지지 않아도 된다.

- 따라서 Svelte는 라이브러리나 프레임워크보다 컴파일러에 가깝다. 유저가 스벨트로 만들어진 웹 페이지에 접속하게 되면 프레임워크 코드는 따로 다운받지 않고 개발자가 작성한 코드가 js로 컴파일된 코드만 다운받게 된다. 따라서 앱 사이즈가 작고 빠르다!
- 핵심 특정
  - HTML, CSS, JS 에서 크게 벗어나지 않는 문법
  - No Virtual DOM
  - Truly Reactive : 라이브러리없이 순수 JS로만 상태 관리
- 문법적 특징
  - `.svelte` 파일에서 html, css, js 블록을 각각 나누어 작업한다.
  - Dynamic attributes
    - `<img src={src} />` 가능
  - Styling
  - `<style>` 블록 안에서 css 스타일링
  - 파일 스코프에만 유효하다.
  - Nested Component
  - HTML Tags
    - `@html` 은 innerHTML 역할을 한다.
  - Context API
  - Store

## SvelteKit

- SSR가 default 로 Next.js 랑 비슷하다. CSR 도 지원
- Pregeneration 지원

## Svelte vs React

<img src="/Users/gongsona/Library/Application Support/typora-user-images/스크린샷 2023-01-31 19.59.10.png" alt="스크린샷 2023-01-31 19.59.10" style="zoom:50%;" />

## 참고 자료

GDSC Soongsil NFF Study 중 svelte todo codejam 발표
