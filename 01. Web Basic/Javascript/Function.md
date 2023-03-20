# Function Basic

Javascript Function 에 대한 기초적인 지식

## Function Declaration(함수 선언문) vs Function Expression(함수 표현식)

- function declaration(함수 선언문)

```javascript
console.log(sum(1,2)) // 3
function sum(a,b){
	return a+b;
}
```

- function expression(함수 표현식)

```javascript
console.log(sum(1,2)) // error
const sum = function(a,b) {
	return a+b;
};
```

두 구문은 **언제 자바스크립트 엔진이 함수를 생성하는가** 에서 차이를 보인다. 

**함수 선언문**은 함수 선언문이 정의되기 전에도 호출이 될 수 있다. 이는 저바스크립트 내부 동작 방식(호이스팅) 때문인데, 자바스크립트는 스크립트를 실행하기 전에 '초기화 단계'에서 전역에 선언된 함수 선언문을 찾고 해당 함수를 미리 생성해놓는다. 따라서 스크립트 어디서든 함수 선언문으로 선언된 함수에 접근이 가능하다. 
반면 **함수 표현식**으로 선언된 함수는 호이스팅의 대상이 아니다. 그러므로 실제 스크립트 실행 흐름이 해당 함수에 도달했을 때 함수가 생성이 되고, 그 이후부터 해당 함수를 할당 및 호출 가능하다. 

https://javascript.info/function-expressions

## Arrow function(화살표 함수)

함수 표현식 보다 더 간결하게 함수를 생성하는 방법.

```
const sum = (a+b) => a+b;
```

## Rest parameters(나머지 매개변수) and spread syntax(전개 구문)

Rest parameters 와 Spread syntax는 `...` 를 통해 사용되어진다. 둘의 작동 방식은?

- Rest parameters 

  ```javascript
  function sumAll(a,b,...args){
  		let sum = a+b;
  		for (let arg of args) { sum += arg; } // args=[3,4,5]
  		return sum;
  }
  sum(1,2,3,4,5); // 15
  ```

  위 예시에서 sum의 2개의 인수를 제외한 나머지 인수들을 args라는 배열의 형태로 모은다. (길이 고정X)

  ( ⚠️ 나머지 매개변수는 항상 마지막에 위치해야함! `sum(a,...args,b)`는 안됨 )

- arguments

  나머지 매개변수 문법이 나오기 전에는, `arguments` 를 통해 함수의 인수에 접근 가능했다. 

- Spread syntax

  스프레드 문법은 `for..of` 같은 방식으로 내부에서 iterator를 통해 요소를 수집한다. 

  - 배열 

    ```js
    const arr1 = [1,2,3];
    const arr2 = [4,5,6];
    const arrConcat = [0,...arr1,...arr2]; // [0,1,2,3,4,5,6]
    const arrCopy = [...arr1]; // 배열 복사도 가능
    ```

  - 객체

    ```js
    const obj1 = {a:1,b:2};
    const obj2 = {...obj1, c:3};
    const objConcat = {...obj1, obj2}; // {a:1,b:2,c:3}
    const objCopy = {...obj1} // 객체도 간단하게 복사 가능
    ```

    

