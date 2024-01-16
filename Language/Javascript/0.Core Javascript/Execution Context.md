# Execution Context

실행 컨텍스트(Execution Context)는 <u>실행할 코드에 제공할 환경 정보들을 모아놓은 객체</u>다.

## 실행 컨텍스트와 콜스택

<img src="https://i.imgur.com/0KM2J6c.png" title="source: imgur.com" />

- 코드들이 실행되면서 생성되는 실행 컨텍스트들은 스택 자료 구조로 관리되는데, 이를 **실행 컨텍스트 스택 or 콜 스택**이라고 부른다.
- 처음 코드를 실행하는 순간 단 하나의 '전역 컨텍스트'가 생성되고 콜스택에 쌓인다.
- 함수가 호출될 때마다 '함수 컨텍스트'가 하나씩 생성되어 콜스택에 쌓이게 되고, 실행 종료시 사라진다.
- 코드 실행이 모두 종료되면 전역 컨텍스트도 콜스택에서 사라진다.

## 구성 요소

실행 컨텍스트는 변수 객체, 스코프 체인, this에 대한 정보로 구성된다.

```js
const word = "hi";
function say1(name) {
	console.log(word, name);
}
funciton say2() {
	const word = "hello";
	console.log(word, "world"); // hello world
	say1("world"); // hi world
}
say2();
```

위와 같은 코드가 있을 때, 실행 컨텍스트가 어떻게 구성될지 알아보자.

### 변수 객체(Variable Object)

변수 객체(활성 객체)는 모든 변수들의 '선언' 정보를 담고 있는 객체이다. 이는 <u>선언된 모든 변수 및 함수, 함수인 경우 매개변수, 내부 함수</u>에 대한 정보를 포함한다.

```js
// 전역 컨텍스트
variableObject = {
  word: 'hi',
  say1: Function,
  say2: Function,
};
// say2 함수 컨텍스트
variableObject = {
  word: 'hello',
};
```

### 스코프 체인(Scope Chain)

스코프 체인은 <u>현재 실행 컨텍스트에서 참조할 수 있는 변수 객체들의 리스트</u>이다. 자기 자신의 변수 객체를 선두로 하여 순차적으로 상위 컨텍스트의 변수 객체들이 리스트에 포함되며 마지막으로 전역 컨텍스트의 변수 객체를 포함한다.

```js
// 전역 컨텍스트
scopeChain = [globalExecutionContext.variableObject];

// say1 함수 컨텍스트
scopeChain = [say1Context.variableObject, globalExecutionContext.variableObject];
```

이때 중요한 점은 자바스크립트는 렉시컬 스코핑(Lexical Scoping)을 따르므로 스코프 체인은 '선언' 시점에 결정되기 때문에, 함수 `say1` 는 함수가 호출된 `say2`의 컨텍스트가 아니라 전역 컨텍스트를 상위 스코프로 한다.

### this

스코프 체인이 생성 완료되면 this 에 값이 할당된다. 전역 객체(브라우저 환경이라면 `window`)를 가리키고 있다가 함수 컨텍스틀가 실행되면 함수 호출 패턴에 의해 값이 할당된다.

> 전역 객체는 모든 객체의 최상위 객체로, 브라우저에서는 `window` 객체, node 환경에서는 `global` 객체, 엄격 모드에서는 `undefined` 이 할당된다.

[[참고] Zerocho 실행 컨텍스트](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)
