# Chapter09.비동기 프로그래밍 패턴

비동기 자바스크립트 프로그래밍은 브라우저가 이벤트에 응답하여 다른 코드 실행하는 동안, 백그라운드에서 비교적 오래 걸리는 작업 수행하게 해준다.

## 동기 vs 비동기

- 동기 코드
  - 블로킹 방식, 즉 코드 순서대로 실행
  - 원래 자바스크립트 코드는 동기적으로 실행됨.
- 비동기 코드
  - 논블로킹 방식
  - 네트워크 요청, DB 접근, 기타 I/O 작업 등 다른 코드 실행을 차단하지 않고 오래 실행되는 작업 실행할 때 유용
  - 콜백 함수, 프로미스, async/await 통해 비동기 프로그래밍 구현 

## 콜백 함수

- 다른 함수에 인수로서 전달되어, 비동기 작업 완료된 후 실행된다.
- 주요 단점은 '콜백 지옥' -> 중첩된 콜백 구조로 인해 코드 가독성과 유지보수성 저하된다.

```js
makeRequest(URL, (error, data) => {
	// callback 
  if(error) {
    console.error(error);
    return;
  }
  makeRequest(URL2, (error, data) => {
    // callback 2
    if(error) {
    	console.error(error);
    	return;
  	}
    console.log(data);
  })
})
```

## 프로미스 패턴

### Promise

- 비동기 작업의 결과를 나타내는 객체로, 대기/완료/거부 3가지 상태 가질 수 있음
- 작업이 성공되거나 거부되었을 때 결과를 제공하는 일종의 계약서 느낌
- <u>콜백보다 체계적으고 가독성이 높은</u> 방법

```js
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
    	.then(res => res.json())
    	.then(data => resolve(data))
    	.catch(error => reject(error))
  })
}
```

### 프로미스 체이닝 vs 파이프라인

- 체이닝은 독립적인 작업들을 순차적으로 처리하는데 집중. 작업의 '순서'를 보장하는 것이 중요
- 파이프라인은 데이터를 변환/가공하는 여러 작업들을 연결해서 데이터 흐름을 만들어내는데 집중. 각 작업이 이전 작업의 결과에 '의존'하고 데이터를 점진적으로 다룰 때 사용 

### 프로미스 데코레이터

```js
// fn에 로깅이라는 추가적인 기능을 부여하는 고차 함수
function logger(fn) {
  return function(...args) {
		console.log('Function Start');
    return fn(...args).then(result => {
      console.log('Function Finish');
      return result;
    })
  }
}

const makeRequestWithLogger = logger(makeRequest);

makeRequestWithLogger(URL).then(data => console.log(data));
```

## async/await 패턴

- 비동기 코드를 마치 동기 코드처럼 작성하자! 
- Promise 기반 구축 

### for-await-of

```js
async function* createAsyncIterable() {
  yield 1;
  yield 2;
  yield 3;
}
async function main() {
  for await(const value of createAsyncInterable()) {
    console.log(value);
  }
}
```

### async/await 어떻게 구현되었나?

