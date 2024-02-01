# Generator

제네레이터(generator)는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수다.

## 제네레이터 함수 vs 일반 함수

- 제네레이터 함수는 함수 제어권을 함수 호출자에게 양도(yield)할 수 있다.
- 제네레이터 함수는 함수 호출자와 함수 상태를 주고받을 수 있다.
- 일반 함수는 값을 반환하지만, 제네레이터는 제네레이터 객체를 반환한다.

## 제네레이터 함수

`function*` 을 통해 제네레이터 함수를 생성할 수 있다.

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generateSequence();
console.log(generator.next()); // {value:1, done:false}
console.log(generator.return('End!')); // {value:"End!", done:true}
console.log(generator.throw('Error!')); // {value:undefined, done:true}
```

- 제네레이터 함수는 **'이터러블'이면서 동시에 '이터레이터'인 제네레이터 객체를 반환**한다.
  - 이터러블: `Symbol.iterator` 메서드가 구현되어 있거나 프로토타입 체인을 통해 상속 받은 객체
  - 이터레이터: `next` 메서드를 갖는 객체

```js
console.log(generator.return('End!')); // {value:"End!", done:true}
console.log(generator.throw('Error!')); // {value:undefined, done:true}
```

- `next` 를 호출하면 제네레이터 함수 내 `yield` 표현식까지 코드 블록을 실행하고, `yield` 된 값을 `value`로, `done` 값은 `false`로 하는 객체를 반환한다.
- `return` 을 호출하면 인수로 전달 받은 값을 `value`로, `done` 값은 `true`로 하는 객체를 반환한다.
- `throw` 를 호출하면 인수로 전달 받은 에러를 발생시키고, `undefined` 를 `value`로, `done` 값은 `true`로 하는 객체를 반환한다.

## 제네레이터 일시 중지 및 재개

- 일반 함수는 호출 이후 제어권을 함수가 독점하지만, 제네레이터는 함수 호출자에게 제어권을 양도(yield)할 수 있다.
- 즉, `next` 호출에 의해 함수가 실행되다가 `yield` 키워드를 만나면, 함수 실행을 일시 중지(suspend)시키고 `yield` 키워드 뒤에 오는 표현식의 평가 결과를 함수 호출자에게 반환하는 것이다.
- 일반 이터레이터의 `next` 메서드와 달리, 제네레이터의 `next` 메서드는 `yield` 표현식에 값을 전달할 수 있다. 이때 `next` 에 전달한 인수는 제네레이터 함수의 `yield` 표현식을 할당받는 변수에 할당된다.

```js
function* generateSequence() {
  const x = yield 1;
  const y = yield x + 10;
  return x + y;
}

console.log(generator.next()); // {value:1, done:false}
console.log(generator.next(10)); // {value:20, done:false}
console.log(generator.next(20)); // {value:30, done:true}
```

1. 첫번째 `next `가 호출되면 첫번째 `yield` 된 값이 `value`가 된다.
2. 두번째 `next` 메서드가 호출되면 인수로 전달받은 10은 첫번째 `yield` 표현식을 할당받는 x 변수에 할당된다. 이후 두번째 `yield` 표현식까지 실행되고, yield된 값인 20을 value로 하여 객체를 반환한다.
3. 세번째 `next` 메서드가 호출되면 인수로 전달받은 20은 두번째 `yield` 표현식을 할당받는 y 변수에 할당된다. 이후 함수 끝까지 실행이 되다가 `return` 문을 만나면 x+y인 30을 `value`로 하여 객체를 반환한다.
