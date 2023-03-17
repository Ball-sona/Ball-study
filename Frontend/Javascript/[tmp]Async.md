## Javascript 동작 원리 

#### 자바스크립트 비동기 처리

<img src="https://user-images.githubusercontent.com/70627979/165538982-fd32c1ca-4f11-4fa2-9a10-ced4e65b5a87.png" alt="image" style="zoom:50%;" />

자바스크립트는 싱글 스레드로 동작하는 언어이다. 

즉 Execution Context 를 처리하는 콜 스택이 자바스크립트 엔진에 한개만 존재하고, 이는 요청된 작업을 순차적으로 실행하기만 한다.

그렇다면 자바스크립트의 비동기 처리는?

사실 비동기 처리는 자바스크립트 엔진을 구동하는 런타임 환경인 브라우저 or Node.js 가 담당한다. 