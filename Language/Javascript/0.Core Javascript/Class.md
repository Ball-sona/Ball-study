# 클래스

클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메서드를 정의하는 일종의 틀로, 객체를 정의하기 위한 상태와 메서드를 구성된다.

## Class

ES6에서 도입된 **클래스(Class)**는 [생성자 함수]()와 같이 객체 지향 프로그래밍을 구현하는 데 사용할 수 있다.

```js
class User {
  // 생성자 메서드
  constructor(name) {
    this.name = name;
  }
  // 사용자 정의 메서드
  sayHi() {
    console.log(`hi ${this.name}`);
  }
}
const user = new User('sona');
user.sayHi(); // hi sona
```

- `new` 연산자에 의해 내부에서 정의한 메서드를 담은 객체가 새로 생성되고, 생성자 메서드 `constructor()` 가 자동으로 호출된다.
- `get`, `set` 을 통한 getter, setter 프로퍼티도 생성할 수 있다.

## 클래스 동작 과정

클래스 문법 `class User{...}` 이 어떻게 동작하는지 살펴보자.

1. `class User` 는 `User` 라는 함수를 새로 생성한다.
2. 함수 본문은 `constructor()` 내에서 가져온다. 만약 생성자 메서드가 따로 정의되어 있지 않다면 본문이 비워진 채 함수가 만들어진다.
3. getter, setter를 포함하여 클래스 내에 정의된 메서드는 `User.prototype` 에 저장한다.

```js
console.log(typeof User); // 'function'
console.log(User.prototype); {constructor: User, sayHi: Function}
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## 클래스 문법은 문법 설탕일까?

> 기능은 동일하되, 기존 문법을 쉽게 읽을 수 있도록 만든 문법을 편의 문법, 다른 말로 문법적 설탕이라고 말한다.

- 동작 과정에서 보다시피 결국 클래스는 동일한 기능을 하는 생성자 함수로 변환되는 것이기 때문에, 이를 문법 설탕이 아닌가 하는 생각을 할 수 있다.
- 하지만 두 방법에는 몇가지 차이가 존재한다.
  1. `class` 키워드를 사용해 만든 함수에는 `[[IsClassConstructor:true]]` 가 자동으로 붙는다. 이는 `new` 없이 함수를 호출하면 에러를 발생시키는 역할을 한다.
  2. 클래스에 정의된 메서드들은 프로퍼티 플래그 중 `enumerable` 이 자동으로 `false` 가 되어서 순회 대상에서 제외된다.
  3. 클래스는 항상 엄격 모드로 실행된다.

## 클래스 표현식

클래스도 [NFE](/Language/Javascript/0.Core%20Javascript/Function%20Object%20and%20NFE.md) 와 유사하게, 클래스 표현식을 만들 수 있다. 이를 통해 클래스를 동적으로 생성할 수 있다.

```js
function makeClass() {
	const c = class C { ... };
	return c;
}
const myClass = makeClass();
```

## 클래스 필드

```js
class User {
  name = 'sona';
  sayHi() {
    console.log(`hi ${this.name}`);
  }
}
const user = new User();

console.log(User.prototype); // {constructor: User}
console.log(user); // {name:"sona"}
```

- 클래스 필드(class field)를 통해 어떤 타입의 프로퍼티도 추가 가능하다.
- 주의할 점은 클래스 필드는 클래스가 아닌 <u>클래스의 인스턴스(객체)에 속하는 멤버 변수</u>로, `User.prototype` 이 아니라 각 개별 객체의 프로퍼티로 저장된다.

### 메서드 바인딩

클래스 필드를 잘 활용하면 메서드가 호출된 환경에 따라 동적으로 결정되는 `this` 값으로 인해 발생하는 문제를 쉽게 해결할 수 있다.

```js
class Button {
  ...
	click1() {
		console.log(this.value);
	}
	click2 = () => {
		console.log(this.value)
	}
}
const button = new Button("hi");
setTimeout(button.click1, 1000); // undefined
setTimeout(button.click2, 1000); // hi
```

- 클래스 메서드로 정의된 `click1` 함수 내 `this` 는 함수가 `setTimeout` 의 콜백 함수로 넘겨지면서 `window` 가 할당된다. 따라서 `window` 객체 내에는 `value` 가 없으므로 undefined가 출력된다.
- 반면 클래스 필드로 정의된 `click2` 함수는 `button` 객체의 메서드가 되므로, `this` 는 해당 객체에 바인딩되어 문제 없이 `hi` 가 출력된다.
