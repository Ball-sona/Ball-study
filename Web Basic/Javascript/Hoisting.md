# Hoisting

**호이스팅** 이란 변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상을 의미한다.

```js
hello(); // hello world
console.log(world); // undefined
function hello() { console.log('hello world')};
var word = 'hello';
```

위 코드를 보면 변수와 함수가 선언보다 호출이 먼저 되었음에도 에러 없이 정상적으로 작동한다. 이는 호이스팅에 의해 **변수 선언과 함수 선언식**이 최상단으로 끌어올려졌기 때문이다. 또 코드 실행 전 전역 컨텍스트가 먼저 생성이 되는데, 이때 함수 선언식은 `{hello:Function}` 으로 바로 대입이 되므로 선언 전 호출이 가능해지는 것이다. (함수 표현식은 그렇지 않으므로 에러가 난다.)

호이스팅 된 코드는 다음과 같다.

```js
function hello() { console.log('hello world')};
var word;
hello(); // hello world
console.log(world); // undefined
word = 'hello'
```



## 참고 자료

https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0
