# Var, Let, Const

### Var vs Let

두 변수는 값을 재할당 할 수 있다는 공통점이 있다. 

- var

  - 오래된 개념 
  - function scope 를 가진다. 

- let 

  - ES6에서 생성된 개념 

  - block scope 를 가진다.

    

```js
const s = 'string';
if(s === 'string'){
  var var1 = true;
  let let1 = true;
} else {
  var var2 = false;
  let let2 = false;
}
console.log(var1, var2); // true, false
console.log(let1, let2); // Error 
```

var 로 선언된 var1, var2 는 함수 스코프를 가지므로 각자의 스코프 내에서  true, false 값을 가진다.

반면 let 으로 선언된 let1, let2 는 블록 스코프를 가지므로, 같은 스코프 내에서 중복 선언을 한 셈이 되어 ReferenceError 가 발생한다. 

### Const

- 선언과 동시에 값이 초기화되어야한다. `const s = 1`
- block scope 가진다. 
- 재할당 금지 