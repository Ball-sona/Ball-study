# 자료형

자료형에 대해 더 구체적으로 알아보자.

## 원시값의 메서드

자바스크립트에서 문자열이나 숫자와 같은 원시값에도 메서드를 호출할 수가 있다. 메서드를 담을 수 있는 '객체'가 아닌데도 말이다. 이는 특수한 객체인 **원시 래퍼 객체(object wrapper)** 을 통해 가능해진다.

`str.toUpperCase()` 를 호출했을 때 동작 과정을 살펴보자.

1. 문자열 `str` 의 프로퍼티인 `toUpperCase` 에 접근하는 순간 특별한 객체, 즉 <u>원시 래퍼 객체</u>가 생성된다. 이 객체는 `str` 의 값을 알고 있고, `toUpperCase()` 를 포함한 유용한 메서드들을 가지고 있다.
2. 해당 메서드가 실행되고, 새로운 문자열이 반환된다.
3. 이후 래퍼 객체는 파괴되고, 원시값 `str` 만 남는다.

자바스크립트 엔진은 위 프로세스를 최대한 최적화하여 원시값의 메서드를 최대한 가볍게 호출할 수 있도록 한다. (객체 레퍼를 사용했지만 사용안한 것 처럼..)

> `new String()` 처럼 생성자를 통해 원하는 타입의 래퍼 객체를 직접 생성할 수 있다. 하지만 이러한 방식은 여러 상황에서 혼동을 불러일으킬 수 있기 때문에 되도록 사용하지 말자.
>
> ```js
> console.log(typeof new String('str')); // object
> ```

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
