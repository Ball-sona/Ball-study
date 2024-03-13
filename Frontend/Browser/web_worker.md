# Web Worker

Javascript는 싱글 스레드로 동작하지만, 브라우저는 그렇지 않다. 브라우저에서 처리되는 <u>네트워크 통신이나 I/O들은 서로 다른 스레드에서 동작</u>한다.

- Web Worker를 이용하면 브라우저의 메인 스레드와 별개로 작동되는 스레드를 생성할 수 있다.
- Web Worker로 생성한 스레드는 브라우저 렌더링 같은 메인 스레드의 작업을 방해하지 않고 별도의 스크립트를 실행하게 된다.

## 실행

먼저 Web Worker가 실행할 수 있는 별도의 스크립트 파일을 생성한다.

```js
// worker.js 
const message = 'lets work';
postMessage(message); // message가 메인 스레드의 worker.onmessage로 전달
...
```

메인 스크립트에서는 생성한 스크립트를 활용해 `Worker` 를 새로 생성한 후,`onmessage` 메서드를 통해 통신하게 된다.

```js
// main.js
if(window.Worker) {
	const worker = new Worker('worker.js'); // worker thread 생성
	work.onmessage = (event) => { // worker 메세지를 전달받기 위한 이벤트 핸들러
		console.log(event.data);
		worker.terminate(); // 작업 종료
	}	
}
```

## Scope

- worker 스레드는 scope로 `GlobalScope` 가 아니라 `WorkerGlobalScope` 를 가진다. 따라서 window 메서드 사용이나 DOM 조작이 불가능하다. 
- 메인 스레드와 Worker 스레드는 Message System을 통해 통신한다. 이때 전달하는 데이터는 복사하여 새로운 값으로 전달되기 때문에, `function`이나 class 내 `method`는 전달할 수 없다. 

```js
postMessage(() => {}); // Uncaught DOMExpection

class Test {
	value = true;
	onAction() {};
}
const test = new Test();
postMEssage(test); // {value:true};
```

- Web worker 내에서도 새로운 스레드를 생성할 수 있다. 새로운 스레드에서도 마찬가지로 `postMessage` 와 `onmessage` 로 데이터를 통신할 수 있다. 

## importScripts

- 만약 worker 스레드에서 외부 라이브러리를 사용해야 한다면, `importScripts` 를 사용하여 다른 외부 스크립트를 가져올 수 있다. 
  - 단, javascript만 허용
- 이렇게 불러온 스크립트는 해당 worker 스레드에만 영향을 주며, 전역 값 또한 worker 스레드의 self(`WorkerGlobalScope`)에 속하게 된다. 

## Error

worker 스레드 내에서 발생한 에러는 메인 스레드까지 전파되지는 않는다. `onerror` 메서드를 이용하면 메인 스레드에서 worker 스레드의 ErrorEvent를 수신할 수 있다. `onmessageerror` 메서드는 `postMessage` 로 데이터 전달 중에 문제가 발생하면 호출된다. 

## Web Worker 종류

Web Worker에는 두가지 타입이 존재한다.

- Dedicated Worker: `new Worker()` 로 생성한 worker로, 부모 자식 간의 스레드끼리만 메세지 교환이 가능하다.
- Shared Worker: worker가 동일한 도메인 내에 존재하는 여러 스레드에서 사용이 가능하며, 포트를 이용해 통신한다. 

## VS Service Worker

Service Worker 역시 메인 스레드의 작업을 방해하지 않고 백그라운드에서 스크립트를 실행할 수 있다. 이는 주로 fetch event와 같은 네트워크 요청을 탈취하거나 push event 같은 Push API를 listen 할 수 있다. 

- Web Worker는 UI Block을 피하기 위해 무거운 연산이 소요되는 작업(ai, games, image/video encoding 등)을 보조 스레드에서 실행하기 위해 사용되지만, Service Worker는 네트워크 프록시 같은 역할이나, 백그라운드 작업, 캐싱, 오프라인을 처리하는데 사용된다. 
- 페이지는 여러 개의 Web Worker를 생성할 수 있지만, 단일 Service Worker는 등록된 Scope 내에서 모든 활성 탭을 제어한다. 

## 참고 자료

- https://pks2974.medium.com/web-worker-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-4ec90055aa4d

- https://yrnana.dev/post/2021-03-09-web-worker-service-worker/
