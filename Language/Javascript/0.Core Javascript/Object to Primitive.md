# 객체를 원시형으로 변환

- 모든 객체는 불리형으로 변환 시 `true` 가 된다.
- 객체끼리 빼는 연산을 하거나 수학 관련 함수를 적용할 때 숫자형으로 변환된다.
- `alert` 함수 등을 통해 객체를 출력할 때 문자형으로 변환된다.

## Hint

목표로 하는 자료형을 나타내는 hint 는 총 3가지 값을 가질 수 있고, 이 값을 기준으로 객체의 형 변환이 이루어진다. hint가 가지는 값은 다음과 같다.

1. `"string"` : alert 함수 같이 문자열 인자를 기대하는 연산을 수행할 때
2. `"number"` : 수학 연산을 적용하려 할 때
3. `"default"` : 연산자가 기대하는 자료형이 확실치 않을 때
   - 객체에 이항 덧셈 연산자 `+` 를 사용한 경우
   - 동등 연산자 `==` 를 통해 객체 - 문자형 or 숫자형 or 심볼형 끼리 비교한 경우

## 형 변환

자바스크립트가 객체를 원시형으로 형 변환하는 과정은 다음과 같다.

1. `obj[Symbol.toPrimitive](hint)` 메서드가 구현되어 있다면 이를 실행

   ```js
   const user = {
     name: 'sona',
     age: 26,
     [Symbol.toPrimitive](hint) {
       return hint == 'string' ? this.name : this.age;
     },
   };
   alert(user); // hint가 "string" 이므로 "sona"
   alert(+user); // hint가 "number" 이므로 26
   alert(user + 1); // hint가 "default" 이므로 27
   ```

   객체에 현재 hint에 따라 변환할 값을 직접 지정해주는 `[Symbol.toPrimitive](hint)` 메서드를 구현해줄 수 있다. 이 메서드는 무조건 원시형 값을 반환해야 한다.

2. 위 메서드가 없다면 `toString()` 이나 `valueOf()` 를 호출

   ```js
   const user = { name: 'sona' };

   alert(user); // [object Object]
   alert(user.valueOf() === user); // true
   ```

   - 기본적으로 `toString` 은 문자열 `"[object Object]"` 를 반환하고, `valueOf` 는 객체 자신을 반환한다.
   - 두 함수를 객체 내에서 구현해주어 변환 값을 제어할 수 있다.
   - 이때 hint가 "string"이라면 `toString` -> `valueOf` 순으로 함수를 찾아 호출하고, 그 외에는 `valueOf` -> `toString` 순으로 찾아서 호출한다.
