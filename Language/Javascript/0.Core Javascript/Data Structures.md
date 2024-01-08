# Data Structures

배열, Map, Set 자료구조에 대해 알아본다. 이들의 근본은 모두 [객체]()임을 명심하자.

## Array

배열(array)은 **순서가 있는** 컬렉션을 저장할 때 쓰는 자료구조다.

- `new Array()` 나 `[]` 를 통해 빈 배열을 생성할 수 있다. `new Array()` 를 통해 만들어진 배열의 초기 요소값은 모두 `undefined` 이다.
- 배열 요소의 자료형엔 제약이 없다.

### 동작 원리

배열은 숫자형 키를 사용하는 **특별한 종류의 객체**다. 따라서 배열은 많은 부분에서 객체처럼 동작한다.

- 객체와 마찬가지로 참조를 통해 복사된다.
- `length` 프로퍼티나 다양한 메서드를 제공한다.

자바스크립트 엔진은 배열을 일반 객체가 아닌 '배열' 답게 처리할 수 있도록 동작한다. 배열의 요소를 인접한 메모리 공간에 차례로 저장해 연산 속도를 높이는 등 다양한 최적화 기법을 통해 배열 처리 연산을 높인다.

따라서 개발자는 이러한 <u>최적화 기법이 잘 동작할 수 있도록 배열을 다뤄야</u> 한다. 아래 코드와 같은 경우 자바스크립트 엔진이 배열을 일반 객체처럼 다루게 되어 배열 특유의 이점이 사라진다.

```js
const arr = [];
/** 모두 하지 말아야 할 것!! */
arr.props = 1; // 숫자가 아닌 값을 키로 사용한 경우 -> 배열도 객체의 일종이니 에러는 안남
arr[1000] = 5; // 배열 길이보다 훨씬 큰 숫자를 사용해 요소 생성한 경우
arr[0] = 1;
arr[100] = 2; // 0~100 사이에 아무런 요소도 없는 경우
arr[100] = 3;
arr[99] = 2; // 요소를 역순으로 채우는 경우
```

같은 맥락에서 배열을 순회하고 싶을 땐 `for in` 을 쓰지 말자. 객체 순회에 사용되는 `for in` 을 배열에도 적용할 수는 있으나, 불필요한 프로퍼티들까지 모두 순회하게 되어 순회 성능이 떨어지게 되므로 다른 반복문을 이용하자.

### length 프로퍼티

- 배열의 `length` 프로퍼티는 배열의 가장 큰 인덱스에 1을 더한 값으로, 배열이 조작될 때마다 자동으로 갱신된다.
- 이 값을 수동으로 증가시키면 아무 일이 안생기지만, 수동으로 감소시키면 배열이 잘리게 된다.
- 이 특성을 이용하여 `arr.length = 0` 을 사용하면 배열을 간단하게 비울 수 있다.

### 배열 여부 확인

`Array.isArray()` 메서드를 통해 배열 여부를 확인할 수 있다.

```js
console.log(typeof []); // "object"
console.log(Array.isArray([])); // true
```

### thisArg

함수를 인수로 받는 대부분의 배열 메서드(map, filter,find 등. sort 제외)들은 `thisArg` 라는 매개변수를 옵션으로 받을 수 있다. `thisArg` 는 콜백 함수의 `this` 가 된다.

```js
const army = {
  minAge: 18,
  maxAge: 30,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  },
};
const users = [
  { name: 'u1', age: 10 },
  { name: 'u2', age: 20 },
];
const soldiers = users.filter(army.canJoin, army);
console.log(soliders[0].name); // u1
```

### Queue and Stack

배열을 사용해 만들 수 있는 대표적인 자료구조로는 **큐와 스택**이 있다.

- 큐(queue): 선입선출(FIFO) 자료구조. `push` 로 요소 넣고 `shift` 로 요소 추출
- 스택(stack) : 후입선출(LIFO) 자료구조. `push` 로 요소 넣고 `pop`으로 요소 추출

> 처음이나 끝에 요소를 더하거나 뺴주는 연산을 제공하는 자료구조를 Deque(Double Ended Queue) 라고 부른다.

### 관련 메서드

- [배열 메서드]()

## Iterable Object

이터러블(iterable) 객체는 배열을 일반화한, 반복 가능한 객체이다. 대표적인 내장 이터러블에는 **배열과 문자열**이 있다.

### 동작 원리

이터러블 객체를 직접 생성해보면 다음과 같다.

```js
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },
  next() {
    return this.current <= this.to
      ? { done: false, value: this.current++ }
      : { done: true };
  },
};
for (let num of range) {
  console.log(num);
}
```

위 `for..of` 이 호출되면 다음과 같은 프로세스가 진행된다. 참고로 순회 대상에 `Symbol.iterator` 가 없으면 에러가 발생한다.

1. `for..of` 호출 시, `range[Symbol.iterator]()` 가 호출된다.
2. `range[Symbol.iterator]()` 는 `range` 자체를 반환하는데, 이때 객체는 `next()` 메서드를 반드시 가지고 있어야 한다.
3. 이후 `range.next()` 가 반복마다 호출된다.

### Iterable vs Array-like

- 이터러블은 `Symbol.iterator` 메서드가 구현된 객체이다.
- 유사 배열은 인덱스와 `length` 프로퍼티가 있어 배열처럼 보이는 객체이다.
- 문자열은 이터러블이면서 유사배열 객체이다. 위 예시의 `range` 객체는 이터러블이지만 유사배열 객체는 아니다.
- `Array.from()` 을 사용하면 이터러블이나 유사 배열을 찐 배열로 만들어준다.

## Map

맵(Map)은 키가 있는 데이터를 저정한다는 점에서 객체와 유사하지만, 키에 <u>다양한 자료형을 허용</u>한다는 점에서 차이가 있다.

- 객체형 키를 사용할 수 있다.

- `new Map([iterable])` 은 이터러블 객체 내 [key,value] 쌍들을 복사해 맵에 넣는다. 만약 [key,value] 형태가 아닌 요소가 있으면 에러가 발생한다.

- 값을 설정하는 `set` 메서드는 호출할때마다 맵 자신을 반환하므로, chaining을 할 수 있다.

  ```js
  const users = new Map().set('u1', 26).set('u2', 25);
  ```

- 객체와 달리 맵은 <u>값이 삽입한 순서대로</u> 순회를 실시한다.

### 순회

- 반복 작업을 위한 `map.keys()` , `map.values()` , `map.entries()` 를 제공한다. 이 메서드들은 모두 이터러블 객체를 반환한다.
- `for..of` 와 `forEach` 메서드를 사용한다.

### 객체 ↔ 맵

- `Object.entries(obj)` : 객체의 키-값 쌍을 [키, 값] 형태로 변환 후 담은 배열 반환. 객체를 맵으로 생성할 때 사용
- `Object.fromEntries(obj)` : 각 요소가 [키, 값] 형태인 배열을 객체로 변환. 맵을 객체로 변환할 때 사용

```js
const obj = { name: 'sona', age: 26 };
const entries = Object.entries(obj); // [["name", "sona"], ["age", 26]]
const map = new Map(entries);

const entries = [
  ['name', 'sona'],
  ['age', 26],
];
const obj = Object.fromEntries(entries); // {name:'sona', age:26};
```

### 관련 메서드

- [Map Methods]()

## Set

셋(Set)은 중복을 허용하지 않는 값을 모아놓은 자료구조이다.

- 키가 없다.
- `new Set([iterable])` 은 이터러블 객체의 값들을 복사해 셋에 넣는다.
- 맵과 마찬가지로 값이 삽입한 순서대로 순회를 실시한다. 맵과 셋은 정렬이 불가능하다.

### 순회

- `set.keys()` 는 모든 요소들을 포함하는 이터러블 객체를 반환한다.
- `set.values()` , `set.entries()` 는 맵과의 호환성을 위해 만들어진 메서드로, `values()` 는 `keys()` 와 동일한 작업을 하고 `entries()` 는 [value, value] 배열을 포함하는 이터러블 객체를 반환한다.
- `for..of` 와 `forEach` 메서드를 사용 가능하다.

### 관련 메서드

- [Set Methods]()

## WeakMap / WeakSet

[WeapMap and WeapSet](/Language/Javascript/0.Core%20Javascript/WeakMap%20and%20WeakSet.md)
