# 함수의 프로토타입

객체 리터럴 `{...}` 이나 `new Object()` 를 사용하여 객체를 생성하면 자동으로 `Object` 을 프로토타입으로 참조하게 되지만, 생성자 함수를 사용하면 조금 다르게 동작한다.

이를 이해하기 위해 모든 생성자 함수의 프로퍼티인 `prototype` 알아보자.

## F.prototype

`F.prototype` 은 생성자 함수로 만들어진 **객체들이 공유하고 있는, 즉 공통적으로 상속받고 있는 메서드나 프로퍼티** 정보를 나타내기 위해 사용된다.

- 모든 함수는 프로퍼티로 `prototype` 을 갖는다.

  > 화살표 함수는 예외.

- 이 프로퍼티는 해당 생성자 함수로 생성된 객체들이 `[[Prototype]]` 으로 참조할 객체가 담긴다.

- 객체의 기본값은 `{constructor: F}` 로, 이때 `constructor` 프로퍼티는 함수 자신을 가리킨다.

- 객체에 `constructor` 프로퍼티가 기본적으로 들어있는 이유는 해당 객체가 상속 체인에서 어떤 생성자 함수에 의해 생성되었는지 확인할 수 있도록 하기 위함이다.

```js
function Animal(sound) {
  this.sound = sound;
}
Animal.prototype.speak = function () {
  console.log(`${this.sound}! ${this.sound}!`);
};
console.log(Animal.prototype); // { constructor: Animal, speak: Function }

const dog = new Animal('wal');
const pig = new Animal('ggul');
dog.speak(); // wal! wal!
pig.speak(); // ggul! ggul!
```

위 예시를 보면 생성자 함수 `Animal` 로 만들어진 두 객체가 `Animal.prototype` 가 가리키는 객체를 공유하고 있고, 해당 객체 내 새롭게 추가한 `speak` 메서드를 둘 다 호출하고 있다.

### F.prototype 은 new F 이 호출될때만 사용된다.

`F.prototype` 프로퍼티의 핵심 역할은 생성자 함수의 프로토타입 정보를 이용해 새롭게 생성된 객체의 `[[Prototype]]` 을 설정하는 것이다. 즉 이 프로퍼티는 '새로운 객체가 만들어질 때만' 사용된다.

따라서 만약 `Animal.prototype` 에 `null` 을 할당하면, 이후부터 생성되는 객체는 상속 프로퍼티들을 공유하지 못한다.

```js
Animal.prototype = null;

const duck = new Animal('hi');
duck.speak(); // Error
```
