# 함수

## Parameter vs Argument

```js
function sendMessage(text) {
  console.log(text);
}

sendMessage('hi');
```

- 매개변수 혹은 인자(parameter)는 함수 선언 시 괄호 사이에 있는 변수로, 위 함수는 매개변수로 `text` 를 갖는다.
- 인수(argument)는 함수를 호출할 때 매개변수에 전달되는 값으로, 위에서는 `"hi"` 를 인수로 전달한다.

## 기본값

만약 함수 호출 시 매개변수에 인수를 전달하지 않으면 그 값은 `undefined` 가 된다. 만약 매개변수에 값을 전달하지 않아도 그 값이 `undefined` 가 되지 않게 하려면 함수를 선언할 때 기본 값을 설정해주면 된다.

```js
function sendMessage(text = "empty message");
```

함수 선언 이후에 매개변수 기본값을 설정하고 싶다면 `||` 나 `??` 연산자를 사용할 수도 있다.

```js
function sendMessage(text) {
  // 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 기본값 설정
  text == text || 'empty message';
  return text;
}

function sendMessage(text) {
  // 매개변수가 생략되었거나 null이 넘어오면 기본값 설정
  text == text ?? 'empty message';
  return text;
}
```

> return문이 없거나 return 지시자만 있는 함수는 `undefined` 를 반환한다.

## 함수 규칙

- 함수 내부에서 외부(전역) 변수를 사용하는 대신 지역 변수와 매개변수를 사용하여 이해하기 쉬운 코드를 작성하자.
- 함수 이름은 가능한 한 간결하고 명확해야 한다.
- `show` , `get` , `calc` ,`create` , `check` 등 접두어를 통해 어떤 동작을 하는지 대략적으로 설명할 수 있도록 하자.
- 함수는 되도록이면 동작 하나만 담당해야 한다. 함수를 분리해 작성하여 테스트와 디버깅을 쉽게 하도록 하자.

## Function Declaration vs Expression

```js
// 함수 선언문(function declaration)
function sendMessage(text) {
  console.log(text);
}

// 함수 표현식(function expression)
const sendMessage = function (text) {
  console.log(text);
};
```

다른 언어와 달리 자바스크립트에서 함수는 특별한 종류의 '값'으로 취급된다. 따라서 함수를 생성하고 그 함수를 변수에 할당할 수 있다.

### 생성 시기

함수 선언문과 함수 표현식은 **자바스크립트 엔진이 언제 함수를 생성하는지** 그 시기에 차이가 있다.

- 함수 표현식은 실행 흐름이 해당 함수에 도달했을 때 함수를 생성한다. 즉 스크립트가 실행되고 `const sendMessage = function...` 에 도달했을 때 비로소 함수가 생성되고, 이후부터 해당 함수를 사용할 수 있다.
- 함수 선언문은 선언문이 정의되기도 전에 호출할 수 있다. 즉 함수 선언이 스크립트 어디에 있느냐에 상관없이 함수를 호출할 수 있는 것이다.

이는 자바스크립트 엔진이 스크립트를 실행하기 전 '초기화 단계'에서 <u>전역에 선언된 함수 선언문을 찾고 해당 함수를 미리 생성</u>하는 내부 알고리즘 때문이다.

### Scope

함수 선언문은 선언된 코드 블록 안에서만 유효하다.

```js
if (age > 20) {
  function welcome() {
    console.log('hi adult');
  }
} else {
  function welcome() {
    console.log('hi child');
  }
  welcome(); // hi child
}
welcome(); // Reference Error: welcome is not defined
```

함수 선언문은 선언된 코드 블록, 즉 if문 내에서만 유효하기 때문에 if문 밖에서는 해당 함수에 접근할 수 없는 것이다.

```js
let welcome;
if (age > 20) {
  welcome = function () {
    console.log('hi adult');
  };
} else {
  welcome = function () {
    console.log('hi child');
  };
}
welcome();
```

위처럼 함수 표현식을 사용하면 코드가 의도한 대로 동작한다.

## 콜백 함수

함수를 함수의 인수로 전달하고, 필요한 경우 <u>인수로 전달한 그 함수를 나중에 호출</u>할 경우, 이를 '콜백 함수' 라고 부른다.

```js
// hiAdult 와 hiChild가 콜백 함수
function welcome(age, hiAdult, hiChild) {
  age > 20 ? hiAdult() : hiChild();
}

welcome(
  25,
  // 익명 함수 -> welcome 외부에선 접근 불가
  function () {
    console.log('hi adult');
  },
  function () {
    console.log('hi child');
  },
);
```

## 화살표 함수

화살표 함수를 통해 더 간결한 **함수 표현식**을 작성할 수 있다.

```js
const welcome = (age) => console.log(age);
```
