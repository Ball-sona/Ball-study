# 객체

객체는 몇 가지 특수한 기능을 가진 연관 배열(associative array)이다.

## 객체 생성하기

1. 객체 생성자 `new Object()` 사용하기
2. 객체 리터럴 `{}` 사용하기

## property

- 객체 `{}` 안에는 'key:value' 쌍으로 구성된 **프로퍼티**가 들어간다.

- `delete` 연산자를 통해 프로퍼티를 삭제할 수 있다.

  ```js
  delete user.age;
  ```

- `const` 로 선언된 상수 객체도 프로퍼티 값을 수정할 수 있다. (새로운 객체를 재할당 하는 건 안됨)

  ```js
  const user = { age: 25 };
  user.age = 26; // ok
  user = newUser; // error!
  ```

- 점 표기법과 대괄호 표기법(square bracket notation)을 통해 프로퍼티 값을 읽을 수 있다.

  ```js
  user.age === user['age'];
  ```

### 계산된 프로퍼티

프로퍼티 키가 대괄호로 둘러싸여 있는 경우, 이를 **계산된 프로퍼티**라 부른다.

```js
const name = prompt('your name?');
const age = {
  [`ball${name}`]: 26,
};
console.log(age.ballsona); // name에 'sona'가 할당되었다면 26, 아니라면 undefined
```

### 단축 프로퍼티

변수를 사용해 프로퍼티를 만드는 경우, **프로퍼티 값 단축 구문**을 통해 코드를 줄일 수 있다.

```js
function createUser(name, age) {
  return { name, age }; // {name:name, age:age}와 동일
}
```

## 프로퍼티 키

- 예약어를 포함한 <u>모든 문자형과 심볼형 값</u>은 프로퍼티 키가 될 수 있다.

  > TODO: 단, `__proto__` 만큼은 예외 케이스인데, 이는 이후 프로토타입 상속 관련 정리 후 이유를 정리하도록 하자.

- 만약 키에 숫자를 넣으면 문자열로 자동 형 변환이 된다.

  ```js
  const obj = { 0: 'test' };
  console.log(obj[0] === obj['0']); // true
  ```

> 참고로 프로퍼티 '값'은 모든 자료형이 올 수 있다.

## 프로퍼티 존재 여부 확인

1. undefined 와 비교

   - 다른 언어와 달리, 자바스크립트 객체는 존재하지 않는 프로퍼티에 접근하려 해도 에러가 발생하는 것이 아니라 undefined 를 반환한다.

   - 따라서 위 특성을 활용하여 `user.age === undefined` 를 통해 키가 age인 프로퍼티가 존재하는지 확인할 수 있다.

> 만약 프로퍼티 값 자체에 `undefined`가 할당되었다면 존재하는 프로퍼티임에도 그렇지 않다고 판단을 내릴 수 있다. 물론 `null`이 아닌 `undefined`를 직접 값에 할당하는 건 좋지 않다.

2. `in` 연산자

   ```js
   const user = { age: 26 };
   console.log('age' in user); // true
   console.log('name' in user); // false
   ```

## 객체 순회

`for..in` 반복문을 사용하여 객체의 모든 키를 순회할 수 있다.

```js
const user = { name: 'sona', age: 26 };

for (let key in user) {
  console.log(user[key]);
}
```

## 객체 정렬

- 정수 프로퍼티라면 자동으로 숫자 정렬이 된다.
- 그 외의 프로퍼티는 <u>객체에 추가한 순서</u> 그대로 정렬이 된다.

> 정수 프로퍼티란, 변형 없이 정수에서 왔다 갔다 할 수 있는 문자열을 의미한다. 즉 "26"처럼 정수로 변환하거나 정수로 변환한 정수를 다시 문자열로 변환해도 값이 변하지 않아야 한다. ("+26" 이나 "2.6"은 해당 안됨)

## 생성자 함수

```js
function User(name) {
  // this = {};
  this.name = name;
  // return this;
}
const user1 = new User('sona');
console.log(user1.name); // sona
```

- 위처럼 생성자 함수를 실행하면 빈 객체를 this에 할당 후. 함수 본문을 모두 실행하고, this를 반환한다.
- 함수 내부에서 `new.target` 프로퍼티를 사용하면 함수가 `new` 와 함께 호출되었는지 알 수 있다.
- 생성자 함수는 자동으로 `this` 를 반환하기 때문에 `return`문이 거의 필요 없다. 만약 객체를 return 하도록 했다면 `this` 대신 해당 객체를 반환해주고, 이외의 원시형을 return 하도록 했다면 해당 `return` 문은 무시된다.
- 생성자 함수에 인수가 없다면 괄호 생략이 가능하다.

## Optional Chaining

옵셔널 체이닝 `?.` 은 앞의 평가 대상이 `undefined` 나 `null` 이라면, 평가를 멈추고 `undefined` 를 반환한다.

```js
const user = {};
console.log(user?.address?.street); // undefined
```

이는 선언이 완료된 변수를 대상으로만 동작한다.

### ?.()

```js
const user1 = {
	isAdmin: () => console.log("this is admin");
}
const user2 = {};

user1.isAdmin?.();
user2.isAdmin?.(); // isAdmin 정의 안되어있는데도 에러 안남
```

마찬가지로 `?.[]` 를 사용하면 객체 존재 여부과 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다.
