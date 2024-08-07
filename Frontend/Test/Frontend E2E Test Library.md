# Test Library(Framework)

- E2E Test: Cypress, Playwright, Selenium, WebDriver.io

## E2E 테스트 도구 기준

### 1. Progressive Automation

테스트 자동화를 위한 프레임워크

### 2. Test Runner

### 3. Platform Test

## 프레임워크 종류

### Cypress

- E2E 테스트 라이브러리
- 브라우저 내부에서 테스트 코드를 실행시키는 방식. 즉 테스트코드가 실행되는 iframe과 애플리케이션 iframe이 동일한 이벤트 루프에서 실행된다.
  - 실제 브라우저를 띄워 실행하므로 다른 방법에 비해 느리고, CPU, Memory 등 컴퓨팅 자원을 요구한다.
  - headless 설정을 지원하긴 함.
- 테스트 병렬처리 기능이 유료다. (플러그인 사용하면 무료로 구현 가능하지만 추가적인 설정 필요)

### Playwright

- E2E 테스트 라이브러리
- CDP(Chrome Debugger Protocol) 사용하고, Edge, Firefox 등 다른 브라우저에서는 CDP와 유사한 구현체를 가지고 있다.
  - Cypress도 CDP를 내장하고 있긴 하지만, 이를 사용하려면 추가 설정이 필요하다.
- 테스트 병렬처리 기능을 무료로 제공한다.

### Selenium

- E2E 테스트 라이브러리
- WebDriver Class Protocol 사용
  - WebDrvier.IO, Appium, Nightwatch도 같은 방식
- Web socket 기반의 event-driven 방식으로 데이터 통신

### Vitest

- test runner ?
- Vitest 공식 문서 읽어볼것

### Cucumber

- 시나리오 기반 테스트 도구

### Jest

- 코드 기반 테스트 도구

https://shorttrack.tistory.com/7
