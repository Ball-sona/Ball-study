# Static, Protected, Private

OOP를 지원하기 위한 몇가지 키워드에 대해 알아보자.

## 정적 메서드와 프로퍼티

```js
class User {
  static name = 'sona';
  static staticMethod() {
    // ...
  }
  static staticMethod2() {
    return new this();
  }
}
```

- 정적 메서드와 프로퍼티는 클래스로 생성한 인스턴스(객체)가 아니라 '클래스 자체'에 속한 값들로, `User.prototype` 에 저장된다.
- `extends` 를 통해 클래스를 상속한다면, 정적 메서드 및 프로퍼티도 상속 가능하다.

생성자 함수를 사용할 경우 아래와 같이 정적 메서드 및 프로퍼티를 생성할 수 있다.

```js
User.name = 'ball';
User.staticMethod3 = function () {
  // ...
};
```

## 캡슐화

캡슐화(encapsulation)란, 내부 인터페이스와 외부 인터페이스를 구분하여 설계하는 것을 의미한다.

- 외부 인터페이스는 클래스 밖에서도 접근 가능한 프로퍼티와 메서드를 의미한다.
- 내부 인터페이스는 클래스 내부에서만 접근할 수 있는 프로퍼티와 메서드를 의미한다. 자바스크립트에서 `private` 필드를 지원한다.
- 클래스 자신과 자손 클래스에서만 접근을 허용하는 `protected` 필드도 많은 언어에서 지원된다. 단 자바스크립트는 지원하지 않는다.

## private

클래스 내부에서만 접근을 허용하는 `private` 프로퍼티를 만들어보자.

- private 메서드와 프로퍼티는 `#` 으로 시작한다.
- 자식 클래스에서 부모 클래스의 private 프로퍼티에 접근하려면 해당 프로퍼티의 getter, setter 함수를 통해야 한다.

```js
class User {
  #admin = true;
  #checkIsAdmin() {
    return this.#admin;
  }
}
const user = new User();
user.#admin; // error
user.#checkIsAdmin(); // error
```

## protected

클래스 자신과 자손 클래스에서만 접근을 허용하는 `protected` 프로퍼티를 만들어보자.

- 보통 protected 메서드와 프로퍼티 명은 `_ ` 으로 시작한다.
- 클래스 내부에 필드를 하나 생성하고, 이에 접근하는 getter, setter 함수를 구현한다.
- getter 함수만 구현해놓으면 프로퍼티를 읽기 전용으로 설정할 수 있다.

```js
class User {
  _age = 20;

  set age(number) {
    if (number < 0) throw new Error('age > 0 !');
    this._age = age;
  }
  get age() {
    return this._age;
  }
}
```

## 내장 클래스 확장

```js
class MyArray extends Array {
  // ...
}
const myArr = new MyArray(1, 2, 3);
console.log(myArr);
[1, 2, 3];

const filteredMyArr = myArr.filter((item) => item >= 2);
```

- myArr, filteredMyArr 모두 MyArray 클래스의 인스턴스임.
- Array 내장 메서드인 filter를 썼는데도 반환값은 myArray 인스턴스임. `filter` 함수 내부에서 새로운 배열을 생성할 때 Array 가 아니라 myArr.constructor 기반으로 새로운 배열을 만들고, 결과를 담아서 반환하기 때문임.

만약 Array 객체로 만들고 싶다면?

```js
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
const myArr = new MyArray(1, 2, 3);
console.log(myArr);
[1, 2, 3];

const filteredMyArr = myArr.filter((item) => item >= 2);
```

- `Symbol.species`가 있으면 배열 내장 메서드 호출할 때 만들어지는 개체의 생성자를 지정해줄 수 있음.
- 이는 배열 뿐만 아니라, map, set에도 적용 가능

## 내장 메서드 상속

내장 클래스는 정적 메서드를 상속하지 못한다.

## instance of

```
dog instance of Dog // true
```

- `Class[Symbol]`

## 믹스인

자바스크립트 객체는 하나의 프로토타입만 가질 수 있으므로 당연히 다중 상속이 안되지만, 이를 믹스인을 사용해 유사하게 구현해낼 수 있다.
