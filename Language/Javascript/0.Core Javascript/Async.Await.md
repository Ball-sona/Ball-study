# async/await

프로미스를 더 편하게 사용할 수 있는 문법 `async/await` 에 대해 알아보자.

## async

function 앞에 `async` 키워드를 붙이면 해당 함수는 항상 프로미스를 반환한다.

```js
async function fn() {
  return 1; // return Promise.resolve(1); 와 동일
}
```

- 만약 함수가 프로미스가 아닌 값을 반환하면 이행 상태의 프로미스로 값을 감싸서 해당 프로미스가 반환되도록 한다.
- 즉, `value` 를 반환하는 함수에 async를 붙이면 `Promise.resolve(value)`를 반환하는 것과 동일하다.

## await

`await` 키워드는 반드시 `async` 함수 안에서만 동작한다.

```js
async function fn() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('finished'), 1000);
  });
  const result = await promise;
  consol.log(result); // "finished"
}
```

- `await` 키워드를 만나면 해당 프로미스가 처리될때까지 함수 실행을 기다리게 만든다. 이후 프로미스가 처리되면 그 결과가 반환됨과 동시에 함수 실행이 재게된다.
- 프로미스가 처리되길 기다리는 동안 자바스크립트 엔진은 다른 스크립트 처리 등 다른 일을 할 수 있으므로 CPU 리소스가 낭비되는 것은 아니다.
- 가독성 측면에서 프로미스 체이닝보다 더 낫다.

## 에러 핸들링

만약 `await` 키워드가 붙어있던 프로미스가 거부된다면, `await` 은 `throw Error` 처럼 에러를 던진다.

- 해당 에러는 async 내부에 `try..catch` 를 구현하여 잡을 수 있다.

```js
async function fn() {
  try {
    const res = await fetch('no-valid-url');
    const user = await res.json();
  } catch (error) {
    console.log(error); // fetch나 res.json에서 발생한 에러 모두 여기서 잡는다.
  }
}
```

- 혹은 async 함수에 `.catch`를 추가한다.

```js
fn().catch(console.log);
```
