# 프로토타입 메서드

`__proto__` 는 프로토타입에 직접적으로 접근할 방법이 없었던 과거 시절 사용되던 접근자 프로퍼티이다. 하지만 [지금은 deprecated된 기능](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)이니 대신 모던 자바스크립트에서 제공하는 관련 메서드들을 사용하자.

## Object.create(proto, [descriptors])

`proto`를 프로토타입으로 하는 새로운 빈 객체를 생성한다. 두번째 인자에는 새로운 객체에 추가하고자 하는 프로퍼티 설명자를 넣을 수 있다.

```js
const dog = Object.create(animal, {
  jumps: { value: true },
});
```

### 객체 복사

```js
const cloneObj = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);
```

객체의 데이터 프로퍼티부터 접근자 프로퍼티까지 완벽하게 복제하여 객체 사본을 만들 수 있다.

### 프로토타입 제거

```js
obj = Object.create(obj, null);
// or
obj.__proto__ = null;
```

이렇게 프로토타입이 아예 없어진 객체는 내장 메서드를 사용할 수 없다.

## Object.getPrototypeOf(obj)

`__proto__` 가 `[[Prototype]]` 의 getter 역할을 완전히 대체한다. 객체의 프로토타입을 반환해준다.

```js
console.log(Object.getPrototypeOf(dog)); // animal
```

## Object.setPrototypeOf(obj, proto)

`__proto__` 가 `[[Prototype]]` 의 setter 역할을 완전히 대체한다. 객체의 프로토타입을 직접 설정한다.

```js
Object.setPrototypeOf(dog, human);
```

> 참고로 자바스크립트 엔진은 객체의 프로토타입이 잘 변하지 않는다는 시나리오 기반으로 최적화되어있다. 따라서 불필요하게 기존 객체의 `[[Prototype]]` 을 변경하는 작업은 하지 말자.

## obj.isPrototypeOf(obj2)

특정 객체가 다른 객체의 프로토타입 체인 상에 있는지 여부를 반환한다.

```js
const animal = { walk: () => console.log('walk!') };
const dog = Object.create(animal);
const puppy = Object.create(dog);

console.log(animal.isPrototypeOf(puppy)); // true
```
