# 클래스 상속

결국 클래스를 사용해도 자바스크립트에서 상속은 '프로토타입 기반' 이라는 것을 명심하자!

## extends

```js
class Animal {
  walk() {
    console.log('walk');
  }
}
class Dog extends Animal {
  run() {
    console.log('run');
  }
}
const dog = new Dog();
dog.walk(); // walk
```

- Dog 클래스는 Animal 클래스를 확장해서 만든 클래스이다.
- `extends` 키워드는 `Dog.prototype.[[Prototype]]` 을 `Animal.prototype` 으로 설정한다.
- 따라서 `dog.prototype` 에 `walk` 메서드가 없다면 `Animal.prototype`에서 이를 찾아 사용한다.

## 메서드 오버라이딩

만약 위 Dog 클래스에서 `walk` 메서드를 정의하면, 더이상 `Animal` 클래스의 메서드를 사용하지 않고 자체 메서드를 사용한다. 근데 만약 부모 메서드를 토대로 일부만 로직을 변경해 쓰고 싶다면?

```js
class Dog extends Animal {
  walk() {
    super.walk(); // -> Animal.walk()
    this.run();
  }
}
```

`super.method()` 를 사용하여 부모 메서드를 확장하는 '오버라이드' 기능을 구현할 수 있다.

## 생성자 오버라이딩

만약 Dog 클래스처럼 다른 클래스를 상속하고 있는 클래스에

```js
constructor(...args) {
	super(...args);
  ...
}
```

- 자식 클래스의 생성자 메서드 `constructor()` 는 무조건 부모 클래스의 생성자 메서드 `super()` 를 호출해야 한다.
- 부모 생성자 메서드 호출은 `this` 를 사용하기 전에 먼저 호출되어야 한다. 그렇지 않다면 에러가 발생한다.
- 만약 다른 클래스를 상속하고 있는 클래스(상속 클래스)인데 `constructor` 가 정의되어 있지 않다면, 자동으로 생성된다.

### 왜 부모 생성자를 호출해야하나?

- 상속 클래스의 생성자 함수에는 일반 클래스의 생성자 함수와 달리 `[[ConstructorKind]]:"derived"` 라는 내부 프로퍼티가 자동으로 생성된다.
- 만약 위 프로퍼티가 붙어있지 않은 클래스는, `new` 연산자를 통해 새로운 객체가 생성될 때 `this`에 해당 객체를 할당한다.
- 하지만 위 프로퍼티가 붙어있는 클래스라면, `this`에 객체를 할당하는 일을 부모 클래스의 생성자가 직접 처리해주길 기대한다.
- 따라서 이를 위해 `super` 를 호출하여 부모 생성자 메서드를 실행시키는 것이고, 만약 이를 생략한다면 `this` 에 할당될 객체가 정상적으로 만들어지지 않아서 에러가 발생한다.

## 클래스 필드 오버라이딩

```js
class Animal {
  name = 'animal';
  constructor() {
    console.log(this.name);
  }
  sayHi() {
    console.log(this.name);
  }
}
class Dog extends Animal {
  name = 'dog';
  constructor() {
    super();
  }
}
const animal = new Animal(); // animal
const dog = new Dog(); // animal
dog.sayHi(); // dog
```

클래스 필드도 메서드와 생성자처럼 자식 클래스에서 오버라이딩할 수 있지만, 이를 생성자 함수에서 접근할 경우 주의할 점이 있다.

- 부모 생성자는 클래스 필드 값에 접근할 때 자식 클래스에서 오버라이딩한 값이 아니라 부모 클래스의 필드 값을 사용한다.
- 이는 <u>클래스 필드가 초기화되는 순서와 연관</u>이 있다.
  - 만약 일반 클래스라면, 클래스 필드는 `constructor()` 실행 이전에 초기화된다.
  - 하지만 만약 상속 클래스라면, 클래스 필드는 `super()` 실행 직후에 초기화된다.
- 따라서 Dog 클래스 생성자에서 `super()` 가 호출되어 콘솔에 `this.name` 이 출력되고, 그 이후에 `name="dog"` 이 실행된다.

## super

`super` 키워드는 의 내부 동작 과정에 대해 살펴보자.

- 모든 '메서드'는 `[[HomeObject]]` 라는 내부 프로퍼티를 갖는데, 이는 **메서드가 속한 객체나 클래스를 참조**한다.
- `super` 를 통해 호출되는 메서드는 클래스의 프로토타입 체인을 따라 부모 클래스에서 찾아지게 되는데, 이때 `[[HomeObject]]` 를 사용하여 현재 메서드가 속한 클래스 정보를 추적한다.
- 즉 부모 클래스를 찾는 `super` 와 자기 자신을 계속 저장하고 있는 `[[HomeObject]]` 가 함께 조합되어 사용됨으로써, 정확하게 부모 메서드를 호출할 수 있도록 한다.

```js
const animal = {
  eat() {
    console.log('eat!');
  },
};
const dog = {
  __proto__: animal,
  eat() {
    super.eat();
  },
};
const puppy = {
  __proto__: dog,
  eat() {
    // puppy.eat.[[HomeProject]] = puppy
    super.eat();
  },
};
puppy.eat(); // eat!
```

한가지 주의할 점은 `super` 키워드는 '메서드' 내에서만 유효하다는 것이다.

```js
const puppy = {
  __proto__: dog,
  eat: function () {
    super.eat();
  },
};
puppy.eat(); // error
```

위 코드는 `eat` 이라는 '메서드'를 생성한 것이 아니라 값이 '일반 함수'인 `eat` 이라는 프로퍼티를 생성한 것이기 때문에, `super` 키워드 사용시 에러가 발생한다. 이는 super가 사용하는 `[[HomeObject]]` 프로퍼티가 일반 함수에는 담겨있지 않기 때문에 발생한다.
