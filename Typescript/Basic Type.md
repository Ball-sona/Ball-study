## Basic Type 

#### Boolean

```typescript
let isWriter: boolean = true;
```

#### Number

```typescript
let decimal: number = 6;
```

#### String

```typescript
const color: string = 'red';
```

#### Array

```typescript
const list: number[] = [1,2,3];
const list2: Array<number> = [1,2,3];
```

#### Tuple

```typescript
const x: [string,number] = ['hello',10];
```

#### Enum

```typescript
enum Color {
  Black = '#000',
  White = '#fff',
}
const whiteCode: Color = Color.White;
```

- 속성 값으로 문자열 또는 숫자만 허용

- 위 예시를 Const Assertion 을 통해 비슷하게 구현 가능하다. 

  ```typescript
  const Color = {
    Black : '#000',
    White : '#fff'
  } as const; 
  
  type ColorCode = typeof Color[keyof typeof Color];
  const whiteCode = ColorCode.White;
  ```

- 아래 예시처럼 속성 값을 지정해주지 않고 숫자 열거형을 생성하면, 0부터 순서대로 자동-증가된 정수값으로 초기화해준다. 

  ```ts
  enum Direction {
    up, // 0
    down, // 1
    left, // 2
  }
  ```

- keyof typeof 을 사용하면 enum의 모든 key들을 문자열로 나타낸다. 

  `keyof typeof Color = 'Black' | 'White'`

- const enum은 상수 멤버만 허용하여 (표현식x), 일반 열거형과 달리 컴파일 과정에서 완전히 제거된다. 
- declare enum은 초기화되지 않은 멤버가 상수 멤버 뒤에 있다면 그 멤버도 상수로 간주한다. 

#### Any

```typescript
let notSure: any = 4;
```

- 서드 파트 라이브러리 등에서 동적인 컨텐츠를 불러와 타입을 정확히 알지 못할때

#### Void

```typescript
function alertWarn(): void { 
	console.log('WARNING');
}
let unsuable: void = undefined; // or null
```

- 어떤 타입도 존재할 수 없음을 의미한다. (함수에서 반환 값이 없을때 등)

- undefined 나 null 만 직접적으로 할당 가능하다.  

#### Never

```typescript
function err(message:string): never {
  throw new Error(message);
}
```

항상 오류를 발생하거나 절대 발생할 수 없는 타입 (ex. 무한반복문)

#### Object

- 원시 타입이 아닌 나머지 타입이자. interface, class 의 상위 타입이다. 
- object 와 Object 구분 주의

#### Function

- Contextual typing

  ```ts
  type FuncType = (arg1:number, arg2:number)=> number;
  const func : FuncType = (a,b)=>a+b;
  ```

- Rest Parameters

  ```ts
  function createName(first:string, ...rest:string[]) {
    return `${first} ${rest.join("")}`
  }
  
  const myName = createName("Gong",'so','na')
  ```

- This

  클래스 내에서 클래스 멤버에 접근하고 싶을때

  `this:void`

- Overloads

  ```ts
  const suits = ["hearts", "spades", "clubs", "diamonds"];
  
  function pickCard(x:{order:number,suits:string}[]):number;
  function pickCard(x:number):{order:number,suits:string};
  function pickCard(x):any{
    if(type x=='object'){
      return Math.floor(Math.random()*x.length)
    } 
    if(type x=='number'){
      return {order:x%13, suit: suits[Math.floor(x%13)};
    }
  }
  const myDeck = [{order:1, suit:'hearts'},{order:2, suit:'spades'},{order:3, suits:'clubs'}];
  const pick1 = myDeck[pickCard(myDeck)]; // number 반환
  const pick2 = pickCard(15); // object 반환
  ```

  Typescript 에서도 오버로드 목록으로 동일한 함수에 대해 다중 함수 타입을 제공한다. 

#### Literal Type 

let, var로 선언된 변수는 값이 변경될 여지가 있으므로, 컴파일러는 타입을 추론 후 지정한다. 

반면 const 로 선언된 변수는 값이 변경되지 않으므로 지정된 값이 타입이 된다. = **literal narrowing** 

- String Literal Types

  ```ts
  function func(easing:"ease-in" | "ease-out" ) {
    if(easing === 'ease-in'){ ... }
    if(easing === 'ease-out'){ ... }
    else { ... }
  }
  ```

  func 함수 인자의 타입이 string 같은 원자 타입이 아니라 'ease-in', 'ease-out' 둘 중 하나로, 특정 문자열 값이 된다. 

- Numeric Literal Types

  ```ts
  type DiceType = 1 | 2 | 3 | 4 | 5 | 6;
  
  function rollDice(): DiceType {
    return (Math.floor(Math.random() * 6) + 1) as DiceType;
  }
  ```

  마찬가지로 rollDice의 반환값 타입이 number 같은 원자 타입이 아니라 1~6 중 특정값으로 지정된다. 

  