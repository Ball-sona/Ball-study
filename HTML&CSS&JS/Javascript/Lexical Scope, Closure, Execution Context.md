# Lexical Scope, Closure, Execution Context

### Lexical Scope

자바스크립트는 함수를 어디서 '호출'했는지가 아니라 **어디서 '정의'했는지에 따라** 상위 스코프를 결정한다. 

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

### Closure

함수의 실행이 종료되면 Execution Context Stack 에서 해당 함수의 실행 컨텍스트가 제거된다. 하지만 **해당 함수 내에 중첩 함수가 있다면 그 함수는 이미 생명 주기가 종료된 외부 함수의 변수를 참조할 수 있다.** 이러한 중첩 함수를 Closure라고 한다. 

```js
// 외부 함수
function outer() {
	const x = 10;
  // 중첩 함수
  const inner = function () {
        console.log(x);
	}
  return inner;
}

const myFun = outer();
myFun();	// 10
```

위 예시에서 `const myFun = outer()` 가 실행되고 나면 outer 함수의 생명 주기가 마감되고 실행 컨텍스트가 제거된다. 그럼에도 `myFun()` 을 실행하면 outer 내부의 x 값에 접근하는 것을 볼 수 있다. 

**어떻게 가능한걸까?**

이는 outer 함수의 실행 컨텍스트가 제거되어도 outer 함수의 Lexical Environment 까지 제거되는 것은 아니기 때문이다. 

- 자바스크립트 엔진 내에서는 garbage collector 가 끊임없이 동작하며 참조되지 않는(도달할 수 없는) 객체들을 삭제하며 메모리를 관리한다. 

- 만약 outer 함수 내에 중첩 함수가 없다면 outer 함수의 Lexical Environment 값이 누구에게도 참조되지 않고 있기 때문에 garbage collector 가 이를 제거해버린다. 
- 그러나 inner 중첩 함수의 `[[Environment]]` 에서 outer 함수의 Lexical Environment 를 참조하고 있기 때문에 제거되지 않는다. 

### Closure 활용

- addEventListener

  ```js
  const fruits = ['apple', 'banana', 'peach'];
  ...
  fruits.forEach((fruit) => {  
  	...
  	elem.addEventListener('click', () => {
  		alert('your choice is' + fruit);
      // fruit는 이 콜백함수의 외부 데이터지만 사용이 가능하다
  	});
  	...
  })
  ```

- 정보 은닉

  ```js
  const couter = function(){ // 즉시 실행 함수
    let num = 0;
    return function(){ // counter에 할당될 함수
      return {
        increase(){ return ++num; },
        decrease(){ return -- num; }
      }
    }
  }();
  ```

​		counter에 할당되는 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프(즉시 실행 함수의 렉시컬 환경)을 기억하는 클로저가 된다. 이렇게 되면 외부에서 num 값을 직접적으로 접근할 수 없어 의도치 않은 변경을 막을 수 있고, counter.increase, counter.decrease 를 통해 값을 다룰 수 있어 안정적인 프로그램이 생성된다. 



> **즉시 실행 함수(IIFE)** 쓰는 이유
>
> 즉시 실행 함수는 정의되자마자 즉시 실행되는 함수를 말한다. 
>
> - 이 함수를 선언하면 내부 변수가 전역으로 저장되지 않기 때문에, 필요없는 전역 변수의 생성을 줄일 수 있다. 
>
> - 또한 외부에서 접근할 수 없는 자체적인 스코프를 가지게 되면서, 내부 변수를 외부로부터 private 하게 보호할 수 있다. (캡슐화)
>
> 단 한번만 실행되는 함수일때나 js 모듈일때 주로 사용이 된다. 



### Execution Context

실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체다. 

**실행 컨텍스트 객체** 구성 요소

- Lexical Environment : 현재 실행 컨텍스트 내 식별자들 정보 + 상위 스코프에 대한 참조
  - Environment Record : 식별자에 바인딩된 값 관리하는 저장소(호이스팅 관련)
  - Outer Environment Reference : 상위 스코프의 Lexical Environment 참조
- Variable Environment : 선언 시점 Lexical Environment 스냅샷
- ThisBinding : `this` 가 바라보는 대상 객체

자바스크립트는 소스코드를 2개의 과정으로 나누어 처리한다.

1. 평가 단계 : 실행 컨텍스트를 생성하고 선언문들만 먼저 실행하여 생성된 식별자를 실행 컨텍스트가 관리하는 스코프에 등록
2. 런타임 단계 : 선언문 제외한 코드 순차적으로 실행. 실행에 필요한 변수 정보 등을 실행 컨텍스트가 관리하는 스코프에서 검색 후 취득

#### Execution Context Stack (= Call Stack)

코드들이 실행되면서 생성되는 실행 컨텍스트들은 stack 자료 구조로 관리되는데, 이를 실행 컨텍스트 스택, 혹은 콜 스택이라고 부른다.



**참조**

https://github.com/gdsc-ssu/hcj-study/pull/3