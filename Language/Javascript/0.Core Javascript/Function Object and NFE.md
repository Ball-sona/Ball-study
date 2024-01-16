# 객체로서의 함수와 NFE

함수는 호출이 가능한(callable) **행동 객체**이다. 즉, 객체처럼 함수에 프로퍼티를 추가 및 제거하건 참조를 통해 전달도 가능하다.

## 함수 프로퍼티

### name

`name` 프로퍼티는 함수 이름을 반환하는 내장 프로퍼티이다.

```js
const sayHi = function () {
  console.log('hi');
};
console.log(sayHi.name); // sayHi
```

위처럼 익명 함수이더라도 컨텍스트를 통해 알아서 이름을 정의해주는데, 이렇게 정의된 이름을 'contextual name' 이라고 한다.

### length

`length` 프로퍼티는 함수 매개변수의 개수를 반환하는 내장 프로퍼티이다.

```js
const sum = function (a, b) {
  return a + b;
};
console.log(sum.length); // 2
```

나머지 매개변수는 개수에 포함되지 않는다.

### 커스텀

함수에 자체적으로 프로퍼티를 추가할 수도 있다.

```js
function sayHi() {
  sayHi.counter++;
}
sayHi.counter = 0;
sayHi();
console.log(sayHi.counter); // 1
```

위 예시처럼 함수 호출 횟수를 `counter` 라는 함수의 프로퍼티로 저장할 수 있다. 이렇게 프로퍼티를 추가한다고 해서 함수 내 지역변수처럼 다룰 수 있는 건 아니다. 함수의 지역 변수와 프로퍼티는 아무런 관련이 없다.

## 기명 함수 표현식(NFE)

기명 함수 표현식(Named Function Expression)은 이름이 있는 함수 표현식이다.

```js
const sum = function sumFunc(a, b) {
  return a + b;
};
```

일반 함수 표현식과 달리, 변수에 익명 함수가 아니라 `sumFunc` 이라는 이름을 가진 함수를 할당한다는 점에서 차이가 있다. 그렇다면 왜 이러한 기명 함수 표현식을 쓰는 걸까?

1. 이름을 사용해 함수 표현식 내부에서 자기 자신을 참조할 수 있다.
2. 함수 표현식 외부에서는 그 이름을 사용할 수 없다.

```js
const sayHi = function (name) {
  if (name) {
    console.log(`hello ${name}`);
  } else {
    sayHi('world'); // TypeError
  }
};
const myHi = sayHi;
myHi = null;

myHi();
```

만약 위 코드를 실행하면 왜 에러가 날까? 함수 `sayHi` 가 실행될 때 함수 내부에 있는 `sayHi` 를 만나면 자신의 내부 렉시컬 환경에선 찾지 못하여 외부 렉시컬 환경을 찾게 된다. 이때 함수 호출 시점에는 이미 `sayHi` 에 `null` 이 저장된 상태이기 때문에, 이를 함수로서 호출하지 못하게 되어 타입 에러가 발생하는 것이다.

```js
const sayHi = function func(name) {
  if (name) {
    console.log(`hello ${name}`);
  } else {
    func('world');
  }
};
```

위처럼 NFE를 사용하면, `func` 이라는 함수는 현재 함수에서만 참조할 수 있고 따라서 외부 렉시컬 환경을 탐색하지 않아도 되므로 에러 없이 바로 호출이 가능하다.
