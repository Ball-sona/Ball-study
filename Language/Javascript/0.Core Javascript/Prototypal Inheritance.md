# 프로토타입 기반 상속

프로토타입(prototype)은 자바스크립트에서 상속 기능을 지원하기 위한 매커니즘이다.

## 프로토타입(Prototype)

['자바스크립트는 왜 프로토타입을 선택했을까'](https://medium.com/@limsungmook/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%99%9C-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85%EC%9D%84-%EC%84%A0%ED%83%9D%ED%96%88%EC%9D%84%EA%B9%8C-997f985adb42) 라는 글을 읽으면 '프로토타입'은 단순히 자바스크립트에서 상속 기능을 지원하기 위한 도구가 아닌, 자바스크립트라는 언어의 근본 구조를 설명할 수 있는 핵심적인 개념이라는 것을 알 수 있다. 중요한 부분만 정리해보자면 다음과 같다.

- Java 같은 클래스 기반 언어는 '속성, 분류, 확장' 을 추구하는 것과 달리, 프로토타입 언어는 '맥락, 유사, 범주화, 위임' 을 추구한다.
- 개별 객체 수준에서 객체를 발전시키고, 설계는 맥락에 의해 평가된다.

즉, 자바스크립트에서의 상속은 부모의 메서드 등을 자식이 그대로 물려받아 확장하는 전통적인 상하 관계가 아니라, 개별 객체들이 필요에 따라 다른 객체를 참조하여 메서드를 빌려쓰는 방식으로 이루어진다. 여기서 특정 객체가 참조하고 있는 대상 객체를 '프로토타입' 이라고 부른다.

이러한 '프로토타입 기반 상속' 방식은 **객체들 간의 유연하고 독립적인 상속을 가능**하도록 한다.

## [[Prototype]]

- 객체는 `[[Prototype]]` 이라는 숨김 프로퍼티(내부 프로퍼티)를 가지고 있다.
- 만약 객체가 다른 객체를 참조하고 있다면 참조 값을 담게 되고, 참조하고 있는 객체가 없다면 `null` 을 담는다.
- 객체는 오직 하나의 객체만 상속받을 수 있고, 그렇게 때문에 하나의 `[[Prototype]]` 만 가질 수 있다.

### proto

`__proto__` 는 `[[Prototype]]` 의 [getter·setter](/Language/Javascript/0.Core%20Javascript/Property%20Getter%20and%20Setter.md) 으로, 프로토타입에 접근하기 위한 '접근자 프로퍼티' 이다.

```js
[[Prototype]] : {
	get __proto__() {...},
	set __proto__() {...},
}
```

## 프로토타입 체인

- 객체 내부에서 특정 프로퍼티를 탐색했는데 없다면, 자동으로 `[[Prototype]]` 이 참조하고 있는 프로토타입 객체에서 이를 검색한다.

- 프로토타입 객체에서 탐색한 프로퍼티를 찾았다면, 해당 프로퍼티를 가져와 사용하게 된다. 이를 프로토타입에서 상속 받은 프로퍼티, **상속 프로퍼티(inherited property)** 라고 한다.

- 이렇게 객체가 어떤 프로퍼티나 메서드를 찾기 위해 상위 프로토타입으로 올라가는 과정을 **프로토타입 체인(prototype chain)** 이라고 한다.

```js
const animal = {
	walk: () => console.log("walk!");
}
const dog = {
  jump: () => console.log("jump!");
	__proto__: animal,
}
dog.walk(); // walk!
```

위 예시를 보면 `dog` 객체는 자신의 프로토타입인 `animal` 에서 메서드 `walk` 를 자동으로 상속 받아 이를 호출하고 있다.

## 프로토타입에 영향을 받지 않는 this

`this` 는 프로토타입에 영향을 받지 않는다.

```js
const user = {
  name: 'John',
  surname: 'Smith',
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(' ');
  },
};
const admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName); // (1) "John Smith"
admin.fullName = 'Sona Gong'; // (2)
console.log(admin.fullName); // (3) "Sona Gong"
console.log(user.fullName); // (3) "John Smith"
```

1. admin 객체에는 `fullName` 프로퍼티가 없으므로, 프로토타입인 user에서 이를 탐색한 후 user의 getter 함수인 `fullName` 를 호출했다. 해당 함수는 `this.name` , `this.surname` 변수를 사용하는데, 여기서 `this` 는 user가 아니라 함수를 호출한 admin 객체를 가리킨다. 따라서 admin 객체 내부에서 두 변수를 찾는데, 값이 없으므로 프로토타입 user에서 두 값을 가져와 출력한다.
2. admin이 user의 setter 함수인 `fullName`를 호출했다. 이 함수는 `this.name` 과 `this.surname` 에 값을 할당하게 되는데, 마찬가지로 `this` 는 user가 아니라 admin이다. 따라서 admin 객체 내부에서 name, surname 변수를 찾아 값을 새로 할당하게 되는데, 현재 두 변수가 없는 상태이므로 프로퍼티를 새로 추가하여 값을 할당한다.
3. admin이 프로토타입인 user의 getter 함수인 `fullName`를 호출했다. 현재 admin 객체는 `{name:'sona', surname:'gong', isAdmin:true}` 이므로, 내부에서 name, surname 을 찾아 출력한다.
4. user가 자신의 getter 함수인 `fullName`를 호출했다. user 내 name, surname 변수에는 아무런 변화가 없었으므로, `John Smith` 를 출력한다.

즉, 메서드를 객체에서 호출했든 프로토타입에서 호출했든, 상관없이 `this` 는 언제나 `.` 앞에 있는 객체이다.

## 상속 프로퍼티, 순회는?

- `for..in` 반복문을 사용하면 **상속 프로퍼티도 순회 대상에 포함**시킨다. 더 정확히 말하면 '순회 가능한지 여부'를 나타내는 프로퍼티 플래그인 `enumerable` 값이 `true` 인 프로퍼티만 포함시킨다.
- 따라서, 객체가 기본적으로 참조하는 `Object` 내장 프로토타입에는 내장 메서드를 포함한 수많은 프로퍼티들이 있음에도 `for..in` 등을 통해 순회할 때 이들이 포함되지 않는 이유는, `Object` 내 프로퍼티들은 모두 `enumerable` 값이 `false` 이기 때문이다.
- 만약 상속 프로퍼티를 걸러내고 싶다면 `obj.hasOwnProperty(key)` 를 사용할 수 있다. 이는 객체 내 직접 구현되어 있는 프로퍼티인 경우에만 `true` 를 반환하는 메서드다.
