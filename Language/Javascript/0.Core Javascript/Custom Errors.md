# 커스텀 에러 및 에러 확장

## 커스텀 에러

- `HTTPError`, `DBError` 등 커스텀 에러를 직접 생성해서 관심사를 분리할 수 있다.
- `message`, `name` 등 프로퍼티를 담아서 에러 객체를 새로 생성할 수 있지만, 내장 에러 클래스인 `Error` 를 상속받아 생성하는 것이 좋다.
- `err instanceof Error` 처럼 에러 객체를 식별할 수 있다는 장점 때문이다.

## 에러 확장

먼저 내장 에러 클래스 `Error` 가 어떻게 구성되었는지를 살펴보자.

```js
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error";
    this.stack = <call stack>;  // stack은 비표준 프로퍼티이지만, 대다수 환경이 지원
  }
}
```

이를 상속받아서, 특정 객체에 프로퍼티가 없을 경우 발생하는 에러를 생성해보자.

```js
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class PropertyRequiredError extends MyError {
  constructor(property) {
    super(`No Property: ${property}`);
    this.property = property;
  }
}

function readUser(json) {
  const user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError('age');
  }
  if (!user.name) {
    throw new PropertyRequiredError('name');
  }
}

try {
  const user = readUser('{ "age": 26 }');
} catch (err) {
  // 객체에 특정 프로퍼티가 존재하지 않아 에러가 발생한 경우
  if (err instanceof PropertyRequiredError) {
    console.log(err.message); // No Property: name
  }
  // 함수로 넘긴 문자열이 객체로 변환할 수 없는 경우
  else if (err instanceof SyntaxError) {
    console.log('JSON Syntax Error');
  }
  // 알 수 없는 에러는 밖으로 던지기
  else {
    throw err;
  }
}
```

- 내장 에러 클래스 `Error` 를 상속받고 있는 `MyError` 는 `constructor.name` 을 에러의 이름으로 설정해주고 있다. 따라서 이 `MyError` 를 상속받는 모든 에러 클래스는 에러 이름을 따로 설정해주지 않아도 된다.
- `MyError` 를 상속받고 있는 `PropertyRequiredError` 는 프로퍼티 이름을 생성자에 전달하여 이를 활용해 에러 메세지로 알아서 만들어준다.
- `readUser` 를 호출하고 있는 `try catch` 내에서는, 문자열을 객체로 변환할 수 없어 `SyntaxError` 가 발생한 경우에도, 객체에 프로퍼티가 없어 함수 내부에서 `PropertyRequiredError` 를 직접 던진 경우에도, 각각 발생한 에러에 맞게 이를 처리할 수 있게 되었다. 물론, 알 수 없는 에러가 발생한 경우에는 이를 다시 던지기를 하여 처리한다.

## 예외 감싸기

위 코드는 에러 종류에 따라 에러 처리를 잘 해주고 있으나, `try` 블록 내부의 기능이 확장되어 처리해야 할 에러의 종류가 많아짐에 따라 `catch` 내부의 분기문 역시 매번 추가되어야 하는 상황이다. 이러한 방식은 확장성 측면에서 좋은 코드는 아니다.

이를 대신하여 어떤 에러가 발생했는지 파악할 수 있는 포괄적인 에러 클래스 `ReadError` 를 하나 생성하고, 개별 에러가 발생할 때 마다 해당 에러에 대한 참조와 함께 `ReadError` 를 던지도록 하는 방식을 사용할 수 있다.

```js
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    throw new ReadError('SyntaxError', err);
  }

  try {
    if (!user.name) {
      throw new PropertyRequiredError('name');
    }
  } catch (err) {
    throw new ReadError('PropertyRequiredError', err);
  }
}

try {
  const user = readUser('{ "age": 26 }');
} catch (err) {
  if (err instanceof ReadError) {
    console.log(err.message, err.cause);
  } else {
    throw err;
  }
}
```
