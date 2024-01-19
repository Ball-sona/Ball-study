# 내장 클래스 확장

## 내장 클래스 확장하기

```js
class MyArray extends Array {
  // ...
}
const myArr = new MyArray(1, 2, 3);
const filteredArr = myArr.filter((item) => item >= 2);
```

- `myArr`, `filteredArr` 모두 `MyArray` 클래스의 인스턴스이다.
- 즉, Array 내장 메서드인 `filter`를 사용했는데도 반환 값은 `Array` 객체, 즉 일반 배열이 아니라 `myArray` 객체이다.
- 이는 `filter` 함수 내부에서 `Array` 가 아니라 `myArr.constructor` 를 기반으로 새로운 배열을 만들고, 이에 결과를 담아서 반환하기 때문이다.

만약 `filter` 가 `MyArray` 의 인스턴스가 아니라 일반 배열을 반환했으면 좋겠다면?

```js
class MyArray extends Array {
  // ...
  static get [Symbol.species]() {
    return Array;
  }
}
const myArr = new MyArray(1, 2, 3);
const filteredArr = myArr.filter((item) => item >= 2);
console.log(filteredArr);
[1, 2, 3];
```

- 특수 정적 getter인 `Symbol.species` 를 추가하여 배열 내장 메서드 호출할 때 만들어지는 개체의 생성자를 지정해줄 수 있다.
- 이는 배열 뿐만 아니라, map, set 등 다른 자료구조에도 적용 가능하다.

## 내장 정적 메서드 상속

- 객체는 `toString()` 같은 내장 클래스의 메서드는 상속 받아 사용할 수 있지만, `Object.keys()` 같은 내장 클래스의 정적 메서드는 상속 받지 못한다.
- `Object` 를 상속받고 있는 객체가 있다고 해서, 그 객체의 `[[Prototype]]` 이 `Object` 를 직접적으로 참조하고 있지 않기 때문이다.
- `extends` 키워드를 활용한 상속과 내장 객체 간 상속의 가장 큰 차이점이다.

## instance of

`instance of` 연산자를 통해 객체가 특정 클래스에 속하는지 유무를 확인할 수 있다.

```js
const arr = [1,2,3];
console.log(arr instance of Object) // true
```

## 믹스인

다른 클래스를 상속받지 않고, 이들 클래스에 구현되어있는 메서드들을 담고 있는 클래스를 '믹스인(mixin)' 이라고 한다.

자바스크립트 객체는 하나의 프로토타입만 가질 수 있으므로 당연히 다중 상속이 안되지만, 믹스인을 사용하면 이를 유사하게 구현해낼 수 있다.
