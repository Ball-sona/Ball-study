# 내장 객체의 프로토타입

## 생성자 함수, Object

```js
const obj = new Object(); // const obj = {} 와 동일
```

- `Object` 는 내장 객체 생성자 함수로, [모든 함수가 그러하듯](/Language/Javascript/0.Core%20Javascript/Function's%20Prototype.md) `Object.prototype` 프로퍼티를 갖는다.
- `Object.prototype` 은 `toString` 등 여러 메서드들이 구현되어있는 거대한 객체를 참조하고 있다.
- 이렇게 생성된 `obj` 의 `[[Prototype]]` 은 `Object.prototype` 객체를 참조하게 된다.
- 따라서 `obj.toString()` 을 호출하면 `obj`는 자신이 프로토타입으로 참조하고 있는 `Object.prototype` 객체에서 해당 메서드를 가져오게 된다.
- `Object.prototype` 은 어떤 것도 참조하지 않는다. 즉, `[[Prototype]]` 이 `null` 이다.

## 다양한 내장 객체 프로토타입

- `Array`, `Date`, `Function` 등도 결국 다 내장 객체 생성자 함수이다.
- 이들은 `Array.prototype` 과 같은 프로토타입 객체를 가지고 있고, 이 객체 내부에는 해당 객체 유형에 대한 여러 메서드와 프로퍼티가 정의되어 있다.
- 모든 내장 프로토타입의 상속 트리 꼭대기엔 `Object.prototype` 이 있다. 다시 말해서, `Array.prototype` 를 비롯한 모든 내장 프로토타입 객체들의 `[[Prototype]]` 은 `Object` 이다.

```js
const arr = [1, 2, 3];
console.log(arr.__proto__); // Array.prototype
console.log(arr.__proto__.__proto__); // Object.prototype
console.log(arr.__proto__.__proto__.__proto__); // null
```

> `console.dir` 를 통해 객체 상속 관계를 편리하게 확인할 수 있다.

## 원시값 래퍼 객체

원시값에 마치 객체처럼 마침표 표기법(ex. `"str".*`) 으로 접근하면, 자바스크립트 엔진은 암묵적으로 <u>원시값을 연관된 객체로 변환</u>한다.

```js
'str'.length; // -> new String("str").length -> 3
```

1. 문자열과 연관된 내장 생성자 함수 `String` 이 호출되어 새로운 객체가 생성되고, 이 객체는 `String.prototype` 에 있는 `length` 프로퍼티를 가져와 사용하게 된다.
2. 이렇게 생성된 임시 래퍼 객체는 실행이 종료된 이후에 빠르게 사라진다. 엔진은 이러한 래퍼 객체에 대한 최적화를 한다.

> `1.toString()` 처럼 숫자형 값에 마침표 표기법을 바로 적용하면 이를 소수점으로 인식하여 메서드가 동작하지 않는다. 만약 이를 실행하고 싶다면 `1..toString()` 이나 `(1).toString()` 을 사용하자.

> 자바스크립트의 원시값 중 `null`, `undefined`에 대응하는 래퍼 객체는 존재하지 않는다. 따라서 이들에겐 메서드나 프로퍼티를 적용할 수 없다.

## 내장 프로토타입 조작

내장 프로토타입은 전역에 영향을 미치는 요소이므로, 이를 조작하는 것은 위험한 짓이다. 그러나 딱 한가지 예외로 '폴리필'을 생성할 때는 조작이 허용된다.

### 폴리필

- 특정 기능이 표준 명세서에는 정의되어 있으나 브라우저 혹은 자바스크립트 엔진이 이를 지원하지 않을 때, 이를 지원하도록 하는 코드를 '폴리필' 이라고 한다.
- 명세서에 있는 메서드를 내장 프로토타입 객체에 직접 추가하여 동일하게 동작하도록 할 수 있다.

## 내장 메서드 빌리기

[유사배열 객체(Array-like Object)](/Language/Javascript/0.Core%20Javascript/Data%20Structures.md)는 실제로 배열은 아니지만, 인덱스와 `length` 프로퍼티를 가지고 있어 마치 배열처럼 보이는 객체를 의미한다. 이러한 유사배열 객체에는 배열 메서드를 적용할 수 없다고 말했지만, 내장 프로토타입을 잘 이해하면 내장 메서드를 빌려 사용할 수 있다.

```js
const arrayLikeObj = {
  0: 'Hello',
  1: 'world!',
  length: 2,
};
// 1. Array 내장 메서드 복사하기
arrayLikeObj.join = Array.prototype.join;
// 2. 객체의 프로토타입을 Object가 아닌 Array으로 변경
arrayLikeObj.__proto__ = Array.prototype;

console.log(arrayLikeObj.join(',')); // Hello,world!
```
