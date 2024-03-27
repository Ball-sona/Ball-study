# 자료형 Advanced

자료형에 대해 더 구체적으로 알아보자.

## 원시값의 메서드

자바스크립트에서 문자열이나 숫자와 같은 원시값에도 메서드를 호출할 수가 있다. 메서드를 담을 수 있는 '객체'가 아닌데도 말이다.

- 오직 해당 메서드를 처리하기 위해서 **원시 래퍼 객체(object wrapper)** 덕에 가능하다.
- 래퍼 객체는 메서드를 처리한 이후에 바로 사라진다. 엔진은 이 과정을 최적화하여 원시값의 메서드를 최대한 가볍게 호출할 수 있도록 한다.

자세한 동작 과정은 [원시값 래퍼 객체](/Language/Javascript/0.Core%20Javascript/Data%20Types%20Advanced.md)를 참고하자.

### string vs String

`new String()` 처럼 내장 객체 생성자를 직접 호출하여 통해 래퍼 객체를 직접 생성할 수도 있다. 하지만 이러한 방식은 여러 상황에서 혼동을 불러일으킬 수 있고, 성능상 권장되지 않으니 사용하지 말자.

```js
console.log(typeof 'str', typeof new String('str')); // string, object
```

## 숫자형

### 표현 방법

- 일반 숫자는 '배정밀도 부동소수점 숫자(double precision floating point number)' 로 알려진 64비트 형식의 IEEE-754에 저장된다.
- -2^53 미만 2^53 초과 인 숫자는 BigInt 라는 자료형을 통해 표현할 수 있다.
- `e` 를 통해 연속된 0을 생략할 수 있다. (ex. 10억 = 1e9)
- `0x`, `0b`, `0o` 를 통해 각각 16진수, 2진수, 8진수를 표현할 수 있다.

### 어림수

- `Math.floor` : 소수점 첫째 자리에서 버림 (ex. -1.1 -> -2)
- `Math.ceil` : 소수점 첫째 자리에서 올림
- `Math.round` : 소수점 첫째 자리에서 반올림
- `Math.trunc` : 소수부 무시 (ex. -1.1 -> -1)

### NaN, Infinite

- `NaN`: 에러를 나타내는 값
- `Infinity` or `-Infinity` 그 어떤 숫자보다 크거나 작은 값

### 관련 메서드

- [Number Methods](https://github.com/ballsona/Study/blob/main/Language/Javascript/%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%A0%95%EB%A6%AC.md#number-methods)
- [수학 연산 메서드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)

## 문자열

### 표현 방법

- 모든 문자열은 UTF-16 을 사용해 인코딩된다.
- `\n` , `\\` , `\'` 등 특수 문자들이 제공된다.

### 불변성

- 문자열은 수정할 수 없다. 즉 문자열의 중간 글자를 하나 바꾸는 등의 작업은 불가능하다.
- 문자열을 변경하고 싶다면 새로운 문자열을 생성 후 변수에 재할당해야 한다.

### 서로게이트 쌍

이모티콘, 수학 기호 등 사용 빈도가 낮은 기호 문자는 '서로게이트 쌍(surrogate pair)' 이라 불리는 2바이트 글자들의 쌍을 사용해 인코딩한다.

```js
console.log('😂'.length); // 2
```

> 문자열 Iterator는 서로게이트 쌍을 지원한다.

### 관련 메서드

- [String Methods](https://github.com/ballsona/Study/blob/main/Language/Javascript/%EB%A9%94%EC%84%9C%EB%93%9C%20%EC%A0%95%EB%A6%AC.md#string-methods)

## 불변성(Immutable)

- 문자, 숫자 등 모든 원시 타입은 '불변성'을 가지고 있다. 즉, 문자열 중간 글자를 하나 바꾸는 등의 작업이 불가능하다.
- 객체, 함수 등 원시 타입이 아닌 타입(참조 타입)은 변경이 가능하다. 즉, 객체 할당 후 속성 값을 수정할 수 있다.
- 만약 객체의 속성 값은 변경하되 '불변성'은 유지하고 싶다면, 새로운 객체를 재할당해야 한다.
