# This

객체의 메서드 내부에서 객체에 접근하는 방법을 알아보자.

## Method

객체의 프로퍼티에 할당된 함수를 **메서드(method)** 라고 부른다.

```js
const user = {
  name: 'sona',
  sayHi: function () {
    console.log('hi!');
  },
};
user.sayHi(); // hi!
```

## this

- 만약 메서드 내부에서 객체에 저장된 다른 프로퍼티 값에 접근하고 싶다면 `this` 연산자를 사용하면 된다.

  ```js
  const user = {
    name: 'sona',
    sayHi: function () {
      console.log('hi' + this.name);
    },
  };
  user.sayHi(); // hi sona
  ```

- `this` 값은 <u>런타임 시점에 컨텍스트에 의해 결정</u>된다.

  ```js
  const user1 = { name: 'sona' };
  const user2 = { name: 'ball' };

  function sayHi() {
    console.log('hi' + this.name);
  }

  user1.f = sayHi;
  user1.f(); // hi sona
  user2.f = sayHi;
  user2.f(); // hi ball
  ```

  호출한 객체에 따라 함수 내 `this` 가 참조하는 값이 달라지는 걸 볼 수 있다.

- 만약 위 `sayHi` 메서드를 객체 없이 호출했다면, 즉 메서드가 객체 컨텍스트 밖에서 호출되었다면 `this` 는 전역 객체(브라우저 환경에서는 Window 객체)를 참조한다.

## this 바인딩

앞서 말했듯 `this` 는 컨텍스트에 의해 다르게 바인딩이 된다.

- 전역 공간의 this: 전역 객체를 참조
- 호출된 메서드 내부의 this: 해당 메서드를 호출한 객체 참조
- 호출된 함수 내부의 this: <u>지정되지 않아 자동으로 전역 객체를 참조</u>

즉 어떤 함수가 객체로부터 호출된 게 아니라 함수 자체로 호출되었다면, 해당 함수 내부의 `this`는 따로 지정이 되지 않아 자동으로 전역 객체를 가르키게 되는 것이다.

```js
const user = {
  name: 'sona',
  func1: function () {
    const func2 = function () {
      console.log(this.name);
    };
    func2();
  },
};
user.func1(); // undefined <- 전역 객체에 func1 속성 없음
```

## Arrow Function

ES6에서 도입된 **화살표 함수(arrow function)**는 일반 함수와 달리 고유한 `this` 를 가지지 않는다.

즉 일반 함수는 메서드로 호출되는지, 함수 자체로 호출되는지에 따라 동적으로 this가 바인딩되는 반면, 화살표 함수는 선언될 시점에서의 상위 스코프가 this로 바인딩된다.

> 따라서 위 예시 코드에서 func2 내 this는 func2 함수 선언 시점의 상위 스코프인 user 객체를 가르키게 된다.
