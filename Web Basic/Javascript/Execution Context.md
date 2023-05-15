# Execution Context

실행 컨텍스트(Execution Context)는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체다. 

## 컨텍스트 원칙

1. 처음 코드를 실행하면 전역 컨텍스트가 하나 생성되고, **함수가 호출될 때마다** 함수 컨텍스트가 하나씩 생성된다.
2. 컨텍스트 생성 시 컨텍스트 안에는 변수 객체(arguments, variable), scope chain, this 가 생성된다.
3. 컨텍스트 생성 후 함수가 실행되면, 사용되는 변수들은 변수 객체 안에서 값을 찾고 값이 없다면 스코프 체인을 따라 올라가면서 찾는다.
4. 함수 실행이 마무리되면 해당 컨텍스트가 사라지고, 페이지가 종료되면 전역 컨텍스트가 사라진다.

## 컨텍스트 구성 요소

```js
var name = "hello";
function say1(word) {
  console.log(name, word);
}
function say2() {
  var name = "bye";
  console.log(name);
  say1('world');
}
say2(); // bye -> hello world
```

위 코드가 실행 되기 전, **전역 컨텍스트**가 어떻게 구성될지 간단하게 표현해보자.

```json
{
	변수객체: {
		arguments: null, // 함수의 인자
		variable: ['name','say1','say2'], // 해당 스코프의 변수
	},
	scopeChain : ['전역 변수객체'], // 자신과 상위 스코프들의 변수객체
	this: window, // this
}
```

여기서 this는 따로 설정되어 있지 않다면 `window` 가 되는데, `new` 를 호출하거나 함수에 다른 `this` 값을 바인딩해서 this 를 바꿀 수가 있다. 

이제 위 코드가 실행이 되면 say1, say2 는 호이스팅으로 선언과 동시에 대입이 되고, 이후 name에는 값이 대입되어 variable 는 다음과 같아진다.

```json
variable: [{name:'hello'},{say1:Function},{say2:Function}]
```

다음으로는 함수 컨텍스트가 어떻게 구성되는지 표현해보자.

먼저 say2 함수가 먼저 실행되므로 say2의 함수 컨텍스트는 다음과 같이 생성된다.

```json
{
	변수객체: {
		arguments: null, 
		variable: ['name'],
	},
	scopeChain : ['say2 변수객체','전역 변수객체'], 
	this: window,
}
```

이후 say2 함수 내에서 say1 함수가 실행되면 say1의 함수 컨텍스트는 다음과 같이 생성된다.

```json
{
	변수객체: {
		arguments: [{word:'world'}], 
		variable: null,
	},
	scopeChain : ['say1 변수객체','전역 변수객체'], 
	this: window,
}
```

여기서 중요한 점은 Lexical Scoping 에 따라 say1 함수의 scope chain은 선언시에 이미 정해지므로, 'say2 변수객체' 가 아니라 '전역 변수객체' 가 된다. 

## 소스 코드 처리 과정

자바스크립트는 소스코드를 2개의 과정으로 나누어 처리한다.

1. 평가 단계 : 실행 컨텍스트를 생성하고 선언문들만 먼저 실행하여 생성된 식별자를 실행 컨텍스트가 관리하는 스코프에 등록
2. 런타임 단계 : 선언문 제외한 코드 순차적으로 실행. 실행에 필요한 변수 정보 등을 실행 컨텍스트가 관리하는 스코프에서 검색 후 취득

## Execution Context Stack

코드들이 실행되면서 생성되는 실행 컨텍스트들은 stack 자료 구조로 관리되는데, 이를 실행 컨텍스트 스택(Execution Context Stack), 혹은 콜 스택(Call stack)이라고 부른다.



## 참고 자료

https://poiemaweb.com/js-execution-context

https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0