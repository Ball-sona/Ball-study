# 반복문

자바스크립트 반복문을 알아보자.

## for

```js
for (let i = 0; i < 100; i++) {
  if (i % 5 == 0) break; // 전체 반복문 종료
  if (i % 3 == 0) continue; // 아래 console 실행하지 않음
  console.log(i);
}
```

- `let` 생략 시 i 는 전역 변수로 생성된다.
- `break` 지시자를 사용하면 원하는 때에 반복문을 빠져나와 종료할 수 있다.
- `continue` 지시자를 사용하면 현재 실행 중인 이터레이션을 멈추고, 다음 이터레이션을 강제로 실행시킨다.

### break/continue 와 레이블

`break` 혹은 `continue` 지시자를 사용하면 하나의 반복문만 빠져나올 수 있다. 따라서 여러 개의 중첩 반복문을 한번에 빠져나오고 싶다면 label 을 사용할 수 있다.

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(i, j);
    if (i == j) break outer; // 전체 반복문 종료
  }
}
```

## for in

`for..in` 은 **객체의 모든 프로퍼티를 대상**으로 순회한다. (symbol 키는 제외)

```js
for (const key in obj) {
  console.log(obj[key]);
}
```

이는 **객체 순회에 최적화된 반복문**으로, 만약 일반 객체 외 '배열' 이나 '유사 배열 객체'에 사용할 경우 속도가 매우 느려진다. 이러한 특수 객체에는 `length` 를 비롯한 추가 프로퍼티들이 붙어있기 때문에, 이러한 값들까지 불필요하게 모두 순회하게 되어 속도가 느려지는 것이다.

따라서 일반 객체가 아닌 자료구조에는 되도록이면 쓰지 말자!

## for of

`for..of` 은 **Iterable 객체를 순회**할 때 사용하할 수 있는 반복문으로, 현재 요소의 인덱스는 얻을 수 없고 값만 얻을 수 있다.

```js
for (let item of array) {
  console.log(item);
}
```

- Iterable 객체, 즉 `Symbol.iterator` 메서드가 구현된 객체만 순회가 가능하다.
- 배열, 문자열 등 내장 이터러블 등에 적용 가능하다.
- 일반 객체에 적용하고 싶다면 `Object.keys()` , `Object.values()` 등 프로퍼티 정보를 배열로 추출해주는 메서드와 함께 사용하자.

## forEach()

`forEach` 메서드는 인수로 넘긴 함수를 배열 요소 각각에 대해 실행할 수 있게 한다.

```js
arr.forEach(function(item, index, array)) {
	console.log(item === array[index]);
	// return문 있으면 무시
}
```

## while

```js
while (condition) {
  // 본문
}
```

조건이 truthy인 동안 반복문 본문이 실행된다. `for(;;) {}` 와 동일하다.

## do while

```js
do {
  // 본문 실행 후 조건 확인
} while (codition);
```

do 내부에 있는 본문을 먼저 실행하고, 조건문을 확인한다. 조건이 truthy인 동안 본문이 계속 실행된다.
