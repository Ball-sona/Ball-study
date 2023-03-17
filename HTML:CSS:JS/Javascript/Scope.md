# Scope

Scope란 참조 대상 식별자(변수, 함수 이름 등과 같이 어떤 대상을 다른 대상과 식별할 수 있는 유일한 이름) 을 찾아내기 위한 규칙이다.

자바스크립트 스코프는 2가지로 나뉘어진다.

- 전역 스코프(global scope) : 코드 어디에서든지 참조 가능
- 지역 스코프(local scope, function-level scope) : 함수 코드 블록이 만든 스코프로 <u>함수 자신과 하위에서만 참조 가능</u>

변수는 선언 위치에 의해 스코프를 가지게 된다. 즉 전역에서 선언된 변수는 전역 스코프를 가지는 전역 변수고, 함수 내부에서 선언된 변수는 지역 스코프를 가지는 지역 변수가 되는 것이다. 

## Javascript Scope

C-family Language 는 **block-level scope**, 즉 코드 블록(`{...}`) 내에서만 유효한 스코프를 따른다. 

반면 Javascript 는 **function-level scope** 를 따른다. 함수 코드 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고 함수 외부에서는 유효하지 않는 것이다. 그렇기에 함수 외부에서 선언된 변수는 모두 전역 스코프를 가지게 된다. 단, 변수 `let` 을 사용하면 블록 레벨 스코프를 사용할 수 있다.

```js
var x = 0; let y = 0;
{ 
  var x = 1; let y = 1; 
}
console.log(x, y); // 0 1
```

## Lexical Scope

Lexical Scope 란 자바스크립트는 함수를 어디서 '호출'했는지가 아니라 **어디서 '선언'했는지에 따라** 상위 스코프를 결정하는 것을 말한다. 자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.

```js
const x = 1;
const test1 = () => {
    console.log(x);
}
const test2 = () => {
    const x = 10;
    test1();
}
test1();	// 1
test2();	// 10이 아니라 1
```

**그런데 어떻게 함수가 정의된 환경을 알아낼 수 있을까?**

- 함수 정의가 평가되어 함수 객체를 생성할때, 자신이 정의된 환경에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯 `[[Environment]]` 에 저장한다. 

- 함수가 호출될때마다 매번 실행 컨텍스트(Execution Context)가 생성이 된다. 이때 `[[Environment]]` 에 저장한 값을 이 실행 컨텍스트 객체 내 Lexical Environment 의 Outer Lexical Environment Reference(외부 렉시컬 환경에 대한 참조)에 저장될 참조값으로 사용한다. 

## Implicit Global

```js
var x = 10;
function foo(){ 
	y = 20;
  console.log(x+y);
}
foo(); // 30
```

위 예제에서 y는 선언하지 않은 식별자로, 참조 에러가 발생할 것 같지만 실제 실행해보면 마치 선언된 변수처럼 동작한다. 이는 선언하지 않은 식별자에 값을 할당하면 전역 객체의 프로퍼티가 되기 때문이다. 즉 `window.y = 20` 으로 해석하여 프로퍼티를 동적 생성하는 것이다. 이러한 현상을 암묵적 전역(implicit global) 이라고 한다.

> typescript 에서는 불가능하다. 



## 참조

https://github.com/gdsc-ssu/hcj-study/pull/3