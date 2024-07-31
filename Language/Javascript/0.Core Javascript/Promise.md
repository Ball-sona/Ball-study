# Promise

자바스크립트 비동기 프로그래밍을 위한 Promise API에 대해 알아보자.

## promise

```js
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('완료'), 1000);
  // or
  setTimeout(() => reject(new Error('Error!')), 1000);
});
```

### executor 함수

- `new Promise` 의 인수로 전달되는 함수를 `executor` , 실행 함수라 부른다.
- 이는 `new Promise` 가 호출될 때, 즉 프로미스 객체가 생성될 때 자동으로 호출된다.
- `executor` 함수는 보통 `resolve` 와 `reject` 라는 인수를 받고 **무언가를 비동기적으로 수행**한다. (물론 동기적 수행도 가능)
- 이때 executor 함수 내부에서는 어떤 동작을 실행하든, 처리 성공 여부에 따라 `resolve(value)` 나 `reject(error)` 둘 중 하나는 반드시 호출해야 한다.
  - `resolve(value)`: 동작이 성공적으로 끝난 경우, 결과물을 나타내는 `value` 와 함께 호출
  - `reject(error)`: 동작 실행 중 에러 발생 시, 에러 객체를 나타내는 `error` 와 함께 호출

### promise 객체

- `new Promise` 가 반환하는 promise 객체는 기본적으로 `state` 와 `result` 라는 내부 프로퍼티를 갖는다. 기본 값은 각각 `"pending"` 과 `undefined` 이다.
- 이후 `executor` 함수가 어떤 함수를 호출하냐에 따라 다음과 같은 프로퍼티를 가지게 된다.
  - `resolve` 호출 시: `{state: "fullfilled", result: value}`
  - `reject` 호출 시: `{state: "rejected", result: error }`

<img src="https://i.imgur.com/jkstf0y.png" style="zoom:50%;" />

## then, catch, finally

앞서 말했듯 `state`, `result` 는 프로미스 객체의 '내부 프로퍼티'이다. 따라서 이를 직접 접근할 수 없고, `then` , `catch` , `finally` 메서드를 사용해 접근해야 한다.

### then

```js
promise.then(
  (result) => console.log(result),
  (error) => console.log(error)
);
```

- 첫번째 인수는 프로미스의 state가 `fulfilled` 일때, 즉 프로미스가 성공적으로 이행되었을 때 호출되는 함수
- 두번째 인수는 프로미스의 state가 `rejected` 일때, 즉 프로미스가 거부되었을 때 호출되는 함수
- 여러개의 `then` 을 연속으로 호출할 수 있다.

### catch

```js
promise.catch((error) => console.log(error));
```

- 에러가 발생한 경우만 다루고 싶은 경우
- `.then(null, errorHandleFn)` 와 `.catch(errorHandleFn)` 은 동일하게 작동한다.

### finally

```js
promise.finally(() => console.log("promise finished")).then(...)
```

- 프로미스가 처리되면, 이행이 되었든 거부가 되었든 항상 실행하고 싶은 동작이 있는 경우
- `then`와 `catch` 와 달리 `finally` 의 인수로 전달하는 **핸들러 함수에 인수가 없다**. 즉, `finally` 내부에서는 프로미스 처리 결과를 알 수 없다.
- 이는 자동으로 다음 핸들러에 결과와 에러를 전달한다.

## 프로미스 체이닝

여러 개의 비동기 작업을 순차적으로 처리하고 싶은 경우, 콜백 함수를 중첩 호출하는 방법 대신 '프로미스 체이닝'을 사용할 수 있다.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log(result); // 2
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(console.log); // 4
```

이렇게 `then` 내 핸들러가 프로미스를 생성하여 반환하면, 다음 `then` 의 핸들러는 그 프로미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 `result` 로 받아 사용한다.

## 에러 핸들링

프로미스가 거부되면 제어 흐름이 제일 가까운 rejection 핸들러로 넘어가므로, 프로미스 체이닝을 통해 쉽게 에러 핸들링을 할 수 있다.

- executor가 `reject()` 를 호출하거나 `then` 핸들러 내부에서 에러가 발생했다면 바로 가장 가까운 `catch` 핸들러가 트리거된다.
- `catch`는 하나 혹은 여러 개의 `then` 뒤에 올 수 있다.
- `catch` 핸들러에서 에러가 성공적으로 처리되면 가장 가까운 `then` 핸들러로 제어 흐름이 넘어가 실행이 이어진다.
- 그러나 에러가 처리되지 않았다면 가장 가까운 `catch` 핸들러로 제어 흐름이 넘어간다. (= 에러를 다시 던진다)
- 만약 프로미스 거부 상태가 되었는데 이를 처리할 `catch` 핸들러가 없거나, `catch` 에서 다시 에러를 던졌는데 이를 처리할 핸들러가 없다면, 전역 에러가 발생하고 스크립트가 중단된다.
  - 브라우저에서는 이러한 경우 `unhandledrejection` 이벤트가 발생한다.

## Promise 정적 메서드

### Promise.all

여러개의 프로미스를 동시에 실행시키고 모든 프로미스가 실행 완료될 때까지 기다렸다가 결과를 한번에 반환하고 싶은 경우

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // [1, 2, 3];
```

- `Promise.all` 은 요소가 모두 프로미스인 배열를 인수로 받아서, 새로운 프로미스를 반환한다.
- 배열 내 프로미스들을 모두 처리 완료하면 새로운 프로미스가 이행되는데, 배열 프로미스들의 결괏값을 담은 배열이 반환한 프로미스 객체의 `result` 가 된다.

  - 만약 배열에 프로미스가 아닌 값이 들어오면, 해당 값이 `result` 배열에 그대로 들어간다.
  - `result` 배열 내 요소 순서는 프로미스 배열 순서와 상응한다. 즉, 프로미스 이행 완료 순서와는 무관하다.

- 만약 여러 개의 프로미스 중 하나라도 거부된다면, `Promise.all` 은 그 즉시 **거부 상태의 프로미스를 반환**하고 가까운 `catch` 핸들러를 실행한다.
  - 거부된 프로미스의 `error` 객체가 `catch` 에 전달된다.
  - 이때 다른 프로미스의 처리가 취소되는 것이 아니라 호출은 계속되지만 그 결과가 무시된다.

### Promise.allSettled

여러개의 프로미스를 동시에 실행시키고 모든 프로미스가 실행 완료될 때까지 기다렸다가 각 프로미스들의 결과값을 모두 담아 반환하고 싶은 경우

```js
Promise.allSettled(fetch('valid url'), fetch('no-valid url')).then(console.log);
// [{status:'fulfilled', value: result }, {status:'rejected', reason: error }]
```

- `Promise.all` 와 마찬가지로 배열로 받은 여러 개의 프로미스의 처리가 완료될 때까지 기다린다.
- 그러나 하나의 프로미스만 거부되어도 바로 거부 상태의 프로미스를 반환하는 `Promise.all` 과는 달리, `Promise.settled`는 각 프로미스의 상태와 결과를 담은 배열을 반환한다.
- 즉, 여러 요청 중 일부가 실패해도 **다른 요청 결과가 필요한 경우 사용**된다.

### Promise.race

여러 개의 프로미스를 동시에 실행시키되 **가장 먼저 처리되는 프로미스의 결과**만 반환하고 싶은 경우

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error()), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log); // 1
```

위 예시에서 첫번째 프로미스가 가장 빨리 처리 상태가 되기 때문에 해당 결과 값이 출력되고, 나머지 프로미스의 결과 및 에러가 무시된다.

### Promise.resolve(value)

결과값이 `value` 이고 상태가 `fulfilled` 인 **이행 상태 프로미스만 생성**하고 싶은 경우

```js
function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }
  return fetch(url)
    .then((res) => res.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
```

위 예시에서 `loadCached` 함수는 만약 인수로 받은 url이 캐시에 저장되어 있을 경우 무조건 이행 상태 프로미스를 반환한다. 해당 함수는 언제나 프로미스를 반환한다는 것을 보장할 수 있다.

### Promise.reject(error)

결과값이 `error` 이고 상태가 `rejected` 인 **거부 상태 프로미스만 생성**하고 싶은 경우

- `new Promise((resolve, reject) => reject(error))` 와 동일한 결과를 반환한다.

## 프로미스화

콜백을 받는 함수를 프로미스로 반환하는 함수로 바꾸는 것을 '프로미스화(promisification)' 이라고 한다.

```js
/** 일반 함수 fn를 프로미스화해주는 함수 */
function promisify(fn) {
  // 프로미스를 반환하는 래퍼 함수를 반환
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(error, result) {
        if (error) reject(error);
        else resolve(result);

        args.push(callback);
        fn.call(this, ...args); // fn을 호출
      }
    });
  };
}

const funcWithPromise = promisify(func);
```

> 이렇게 프로미스화를 도와주는 모듈 중 [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify) 가 대표적이다.
