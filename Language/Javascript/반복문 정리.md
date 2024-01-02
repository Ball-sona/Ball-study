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

`for..in` 은 열거 가능한 non-Symbol 속성에 대해서만 반복한다.

```js
for (const key in obj) {
  console.log(key, obj[key]);
}
```

- 객체에 사용되는 반복문
- 배열에도 사용 가능하나 추천하지 않는다. 왜?

## for of

## forEach 메서드

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
