# 마이크로테스크

자바스크립트 엔진이 어떻게 비동기 작업을 처리하는지 알아보자.

## 브라우저 환경

<img src="https://image.toast.com/aaaadh/real/2018/techblog/b1493856379d11e69c16a9a4cf841567.png" style="zoom:70%;" />

브라우저 환경을 간단하게 표현한 그림이다.

- 자바스크립트 엔진은 크게 2개의 영역으로 구분할 수 있따.
  - Call stack: 실행 흐름에 따라 실행 컨텍스트가 추가되고 제거되는 '실행 컨텍스트 스택'이다.
  - Heap: 객체가 저장되는 메모리 공간으로, 실행 컨텍스트는 힙에 저장된 객체를 참조한다.
- Task queue: `setTimeout` , `setInterval` 와 같은 비동기 함수의 콜백 함수 혹은 이벤트 핸들러가 일시적으로 보관되는 영역이다.
- Event loop: call stack에 현재 실행 중인 실행 컨텍스트가 있는지, 그리고 task queue에 대기 중인 함수가 있는지 계속 관찰한다. 만약 call stack이 비어 있고 task queue에 대기 중인 함수가 있다면 event loop은 순차적으로 task queue에서 함수를 꺼내 call stack으로 이동시킨다.

즉 여전히 자바스크립트는 '단일 호출 스택'에 의해 동기적으로 작업을 수행하되, 브라우저나 node.js가' 테스크 큐와 이벤트 루프'를 자바스크립트 엔진과 상호 연동하여 비동기 스케줄링을 지원하는 것이다. 다시 말해 자바스크립트 엔진은 '싱글 스레드'로 동작하고, 브라우저나 node.js 등 이를 구동하는 환경은 '멀티 스레드'로 동작한다.

> node.js 에서는 이벤트 루프 대신 'libuv' 라는 라이브러리를 사용하여 비동기 작업을 스케줄링한다.

## 마이크로테스크 큐

V8을 비롯한 자바스크립트 엔진은 '마이크로테스크 큐(microtask queue)'를 통해 비동기 작업들을 관리한다.

- 마이크로테스크 큐도 앞서 본 '테스크 큐'와 마찬가지로 비동기 함수의 콜백 함수나 이벤트 핸들러를 일시 저장하는 장치이다.

  - task queue를 macotask queue라고도 부른다.

- 단, **마이크로테스크 큐는 테스크 큐보다 우선 순위가 높다**. 즉, 콜 스택이 비어있을 때 이벤트 루프는 마이크로테스크 큐를 먼저 확인하여 대기하고 있던 함수를 실행하고, 이후 마이크로테스크 큐가 비면 테스크 큐에서 대기하던 함수를 실행한다.
- 프로미스의 `.then/catch/finally` 의 핸들러 함수가 이 마이크로테스크 큐에 들어가 대기하게 된다.

```js
setTimeout(() => console.log(1), 0);
Promise.resolve(() => console.log(2));
```

위 예시 코드에서는 콘솔에 '2 -> 1' 순으로 출력되는 것을 확인할 수 있다. `setTimeout` 의 콜백 함수는 테스크 큐에, 프로미스의 함수는 마이크로테스크 큐에 들어가기 때문이다.

## Queues

- Microtask queue: `Promise` , `async/await` , `process.nextTick` , `Object.observe` , `MutationObserver` 처리
- AnimationFrames: `requestAnimationFrame` 등 브라우저 렌더링과 관련된 task를 넘겨 받는 queue
- Macrotask queue: `setTimeout`, `setInterval` , `setImmediate` 처리
- 이벤트 루프가 처리하는 우선 순위: Microtask queue > AnimationFrames > Macrotask queue

## unhandledrejection

- 프로미스가 거부되었음에도 이에 대한 `catch` 핸들러가 없다면 브라우저에서는 `unhandledrejection` 이벤트가 발생한다.
- 이를 큐 관점에서 보면, 자바스크립트 엔진이 마이크로테스크 큐에서 대기하던 작업을 모두 완료하여 큐가 비어있음에도 아직 거부 상태의 프로미스가 남아있다면 해당 이벤트를 트리거하는 것이다.
