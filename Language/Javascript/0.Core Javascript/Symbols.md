# 심볼형

심볼(Symbol)은 **유일한 식별자**를 만들고 싶을 때 사용된다. ES6에서 도입된 원시형 타입이다.

## 심볼 생성

`Symbol()` 을 호출하여 심볼값을 생성할 수 있다. `new` 연산자는 지원하지 않는다.

```js
const id1 = Symbol('id');
const id2 = Symbol('id');

console.log(id1 == id2); // false
console.log(id1.description); // id
```

- 인수로 문자열을 전달하면, 심볼 이름(설명)을 붙일 수 있다. 이는 디버깅 용도 이외의 특별한 역할이 없다.
- `symbol.description` 프로퍼티를 통해 심볼의 설명은 확인할 수 있으나, 심볼 값은 확인할 수도 없고 외부로 노출되지도 않는다. (따라서 값을 변경하는 것도 당연히 불가능하다.)
- 심볼은 <u>유일성이 보장되는 자료형</u>이기 때문에, 이름이 동일한 심볼이어도 모두 다른 고유한 값이다.
- 심볼형 값은 다른 자료형으로의 암시적 형 변환이 적용되지 않는다. (langauge guard)
  - 단, 불린형으로는 변환이 된다.. `false` 로 변환

## 객체 내 심볼

자바스크립트는 객체의 프로퍼티 키로 **오직 문자형과 심볼형만을 허용**한다. 어떻게 심볼값을 프로퍼티 키로 사용하는지 알아보자.

```js
const user = { name: 'sona' };
const id = Symbol('id');
user[id] = 25;

console.log(user); // {name:'sona', Symbol(): 25}
console.log(user[id]); // 25
console.log(user.id); // undefined
console.log(id in user); // true
```

- 고유한 키 값을 만들고 싶을 때 심볼형을 사용할 수 있다. 사용자의 이름을 키 값으로 하여 사용자 정보를 저장하는 객체가 있다고 해보자. 이름은 중복될 수 있지만 `[Symbol("name")]` 통해 심볼을 활용하면 고유한 식별자를 생성할 수 있다.

- 만약 객체 리터럴을 사용해 객체를 생성하는 경우, 대괄호를 사용해 심볼형 키를 만들 수 있다.

  ```js
  const id = Symbol('id');
  const user = {
    name: 'sona',
    [id]: 123,
  };
  ```

- 심볼형 키는 `for..in` 반복문이나 `Object.keys(obj)` 에서 배제된다. 이는 심볼형 프로퍼티를 최대한 숨기고 접근하지 못하도록 하는 자바스크립트의 원칙에 의한 것이다.
  - 심볼형 키만 추출하고 싶다면 `Object.getOwnPropertySymbols()` 함수를 사용
  - 심볼형 키를 포함한 모든 키를 추출하고 싶다면 `Reflect.ownKeys()` 함수를 사용
- 단, `Object.assign` 으로 객체의 프로퍼티를 복사할 때는 심볼형 키도 배제하지 않고 복사한다.

## 전역 심볼

만약 하나의 심볼은 코드 여러 곳에서 광범위하게 사용하고 싶다면 '전역 심볼'을 생성할 수 있다.

### Symbol.for

```js
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

console.log(sym1 === sym2); // true
```

- `Symbol.for("id")` 를 통해 전역 심볼을 생성할 수 있고, 이때 인수로 전달하는 문자열은 **심볼의 고유한 키**가 된다. (일반 심볼은 키 없음)
- 이렇게 생성된 모든 전역 심볼들은 **전역 심볼 레지스트리(global symbol registry)**에서 관리된다.
- 만약 `Symbol.for` 에 전달된 키가 전역 심볼 레지스트리에 이미 존재한다면 검색된 기존 Symbol을 반환해주고, 존재하지 않는다면 새로운 심볼을 생성하고 레지스트리에 등록한 후에 이를 반환한다.

### Symbol.keyFor

```js
const key1 = Symbol.keyFor(id1); // id
```

`Symbol.keyFor` 을 통해 `Symbol.for()` 로 생성한 심볼의 키를 찾을 수 있다.

## 시스템 심볼

시스템 심볼은 자바스크립트 내부에서 사용되는 심볼이다. 이들은 `Symbol.*` 로 접근할 수 있고, 이를 사용하여 내장 메서드 등 기본 동작을 변경할 수 있다. 대표적으로 [잘 알려진 심볼](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-well-known-symbols)들은 다음과 같다.

- Symbol.hasInstance
- Symbol.isConcatSpreadable
- Symbol.iterator
- Symbol.toPrimitive: 객체를 원시형으로 형 변환 시 사용

[참고: JavaScript Symbol의 근황](https://arc.net/l/quote/jocnxsfb)
