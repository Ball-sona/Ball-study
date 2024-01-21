# 에러 핸들링

`try..catch` 구문을 통해 에러로 인해서 스크립트 실행이 중단되는 것을 방지하고, 적절한 처리 작업이 수행되도록 하자.

## try..catch

`JSON.parse` 는 인수로 받은 문자열을 객체로 변환할 수 없을 경우, 그 즉시 스크립트 실행을 중단해버린다. 만약 서버에서 잘못된 형식의 문자열을 보내게 된다면 그 즉시 서비스가 죽어버리게 될 수도 있다는 것이다. 이를 방지하기 위해서는 `try..catch` 구문을 사용할 수 있다.

```js
const jsonStr = '{ this is not json }';

try {
  const obj = JSON.parse(jsonStr);
  console.log(obj);
} catch (err) {
  console.log(err.name); // SyntaxError
}
```

- `try` 블록 내부에 `JSON.parse` 의 인수로 잘못된 형식의 문자열이 들어와 에러가 발생하면, 그 즉시 `try` 블록 실행을 멈추고 `catch` 블록으로 제어 흐름을 넘긴다.
- `catch` 블록에는 `err` 라는 에러 객체가 인수로 전달되고, 이 객체를 가지고 적절한 작업이 실행된다.
- `try..catch` 는 **런타임 에러(예외)에만 동작**한다. 즉, 자바스크립트는 코드를 실행하기 전에 코드를 읽는 작업을 하는데, 이때 `{{}` 등 이해할 수 없는 코드를 만나 발생하는 parse-time 에러는 따로 핸들링할 수 없다.

## 에러 객체

- 에러가 발생하면 자바스크립트는 **해당 에러와 관련된 상세 내용이 담긴 객체를 생성**하고, 이를 `catch` 블록에 인수로 전달한다.
- 내장 에러를 비롯한 에러 객체가 주로 갖는 '프로퍼티'는 다음과 같다.
  - `name` : 에러 이름
  - `message` : 에러 상세 내용
  - `stack` : 에러가 발생한 시점에서의 현재 호출 스택. 비표준 프로퍼티이나 대부분 이를 포함하고 있다.
- 에러에 대한 상세 정보가 굳이 필요하지 않은 경우라면 `catch` 블록에 에러 객체를 전달하는 것을 생략해도 된다.

## 에러 던지기

- `throw` 연산자를 사용해서 에러를 직접 생성할 수 있다.
- `throw <error object>` 로 `catch` 블록에 전달할 에러 객체를 직접 작성하면 된다.
- 이때 내장 에러와의 호환을 위해 `name`, `message` 프로퍼티를 포함할 것을 권장한다.
- `Error`, `SyntaxError` , `ReferenceError` , `TypeError` 등 표준 에러 객체 관련 생성자를 사용하여 에러 객체를 생성할 수도 있다.

```js
const jsonStr = '{ "age":26 }';

try {
  const obj = JSON.parse(jsonStr); // 에러 안남!
  if (!user.name) {
    throw new SyntaxError('no name!');
  }
  console.log(user.name);
} catch (err) {
  console.log(err.message); // no name!
}
```

위 예시에서 만약 `try` 구문 내에서 `console.log(obj.name)` 만 실행했다면, 문자열을 문제없이 객체로 변환 후 콘솔에는 `undefined` 가 출력되었을 것이다. 이를 방지하기 위해 직접 `SyntaxError` 를 던져서, `name` 프로퍼티가 객체에 없다면 에러가 발생한 것으로 간주하고 제어 흐름이 `catch` 으로 넘어간다.

## 에러 다시 던지기

`catch` 블록이 `try` 블록에서 발생한 모든 에러를 잡아 처리하도록 했으나, 어떤 에러가 오든지 동일한 방식으로 처리하는 방식은 좋지 않다. 따라서 이런 문제를 피하기 위해 **에러를 다시 던지도록(rethrow)** 해보자.

```js
function readUserData(json) {
  try {
    const user = JSON.parse(json);
    if (!user.name) {
      throw new SyntaxError('no name!');
    }
    funcWithUnExpectedError(); // 예상치 못한 에러를 발생하는 함수
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log(`SyntaxError: ${err.message}`);
    } else {
      throw err; // 알 수 없는 에러인 경우 다시 던지기
    }
  }
}

try {
  readUserData('{age:26}');
} catch (err) {
  console.log(`External Catch Error: ${err}`);
}
```

- readUserData 함수를 보면 `SyntaxError` 가 발생한 경우 `catch` 는 이에 대한 처리 방법을 알고 있으니 이를 처리하지만, 이 외의 에러는 처리 방법을 알 수 없으므로 에러를 다시 던진다.
- 이렇게 `catch` 내부에서 다시 던져진 에러는 `try catch` 구문 밖으로 던져진다. 즉 함수 밖의 `try catch` 구문이 해당 에러를 처리하게 된다.

## try..catch..finally

```js
try {
  // code
} catch (e) {
  // error handling
} finally {
  // always execute
}
```

`try` 블록의 실행 결과와 상관없이 실행을 완료하고 싶은 경우 `finally` 구문을 사용할 수 있다. 여기서 `catch` 생략도 가능하다.

## 전역 에러

만약 전역에서 에러가 발생했다면 어떻게 이를 잡아서 처리할 수 있을까?

- node.js 환경이라면 `process.on("uncaughtException")` 등 내장 기능 사용
- 브라우저 환경이라면 `window.onerror` 사용

단, 이러한 방법은 스크립트 중단을 복구하는데 사용되기보다는, 에러를 로깅하는 용도로 사용된다.
