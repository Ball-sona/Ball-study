# Web Worker, Service Worker

- Worker를 사용하면 특정 스크립트를 메인 스레드와 분리하여 실행할 수 있다.
- Window 객체나 DOM에 직접적으로 접근할 수 없다.

## Web Worker

- UI를 차단하지 않고 비동기 작업을 처리한다. 주로 긴 시간이 걸리는 작업을 처리하는 데 유용하다.
- 한 페이지는 여러 개의 Web Worker를 생성할 수 있다. Web Worker가 실행 중인 탭이 닫히면 자동으로 워커가 종료된다.

## Service Worker

- `fetch` 이벤트와 같은 네트워크 요청을 탈취해서 캐싱을 하거나 `push` 이벤트 같은 PUSH API를 제어?할 수 있다.
- 오프라인 상황에서 웹 페이지를 사용할 수 있게 한다?
- 하나의 Service Worker가 등록된 스코프 내 모든 활성 탭을 제어한다. 활성 탭이 열려있지 않아도 워커는 백그라운드에서 실행될 수 있다.
