# Getter and Setter

객체의 프로퍼티는 크게 두종류로 나눌 수 있다.

- 데이터(Data) 프로퍼티: 일반적으로 사용하는 모든 프로퍼티로, 객체에 값을 직접 저장 및 접근하고자 할 때 사용한다.
- 접근자(Accessor) 프로퍼티: 값을 획득하고 설정할 때 사용하는 프로퍼티로, 이 프로퍼티의 본질은 함수다!
  - Getter/Setter

## getter/setter

접근자 프로퍼티에는 값(데이터 프로퍼티)에 접근할 수 있는 `getter` 메서드와 값을 설정할 수 있는 `setter` 메서드가 있다.

```js
const user = {
  name: '',
  age: 0,

  // getter - 인수 없음
  get fullname() {
    return `ball ${name}`;
  },
  // setter - 인자 반드시 1개
  set info(value) {
    [this.name, this.age] = value.split(' ');
  },
};

user.info = 'sona 26';
console.log(user.fullname); // ball sona
```

## 접근자 프로퍼티의 설명자

객체의 모든 프로퍼티는 [프로퍼티 설명자](/Language/Javascript/0.Core%20Javascript/Property%20Flags%20and%20Descriptors.md)를 갖는다. 단, 일반 프로퍼티와 접근자 프로퍼티의 설명자의 형태는 조금 다르다.

- 일반 프로퍼티

  - 프로퍼티 값
  - 플래그(`writable`, `enumerable`, `configurable`)

- 접근자 프로퍼티
  - `get` : getter면 함수 본체, setter면 `undefined`
  - `set` : setter면 함수 본체, getter면 `undefined`
  - 플래그( `enumerable`, `configurable`)

## Use Case

사실 접근자 프로퍼티가 제공하는 기능은 객체 외부에 따로 함수를 생성해서 충분히 구현할 수 있다. getter/setter를 사용해야 하는 경우나 사용했을 때의 이점을 살펴보자.

### Use Case #1

user 객체에 `name` 을 저장하는데, 너무 긴 문자열은 값으로 저장하지 못하도록 설정해보자.

```js
const user = {
  get name() {
    return this._name;
  },
  set name(value) {
    if (value.length >= 20) {
      console.log('name is too long!');
      return;
    }
    this._name = value;
  },
};

user.name = 'sonasonasonasonasona'; // 해당 값으로 설정 안됨.
```

### Use Case #2

아래와 같이 이름과 나이를 가지고 사용자 객체를 구현하고 있는 코드가 있다고 해보자.

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
const user1 = new User('sona', 26);
```

근데 만약 사용자의 나이가 아니라, 생일을 가지고 객체를 만드는 코드로 리팩토링하고 싶다면 어떻게 할까?

1. 객체 내 `age` 프로퍼티를 `birthday` 로 변경한다. -> 기존 코드에 `user1.age` 값을 사용하는 부분을 다 수정해주어야 한다.
2. 그럼 `age` 프로퍼티도 놔두고 `this.birthday = birthday` 를 직접 새로 추가한다.

이런 상황에서 getter를 사용하면 깔끔하게 문제를 해결할 수 있다.

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

  Object.defineProperty(this, 'age', {
    get() {
      return new Date().getFullYear() - this.birtday.getFullYear();
    },
  });
}
const user1 = new User('sona', new Date(1999, 9, 25));
console.log(user1.age)l; // 26
```
