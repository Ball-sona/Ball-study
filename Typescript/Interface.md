## Interface

- duck typing or structural subtyping

#### Our First Interface

```typescript
interface LabeledValue {
  label:string;
}

function printLabel(obj:LabeledValue){
  console.log(obj.label);
}

const obj = {size:10, label:'size:10'}
printLabel(obj);
```

- ~~컴파일러는 **최소한** 필요한 프로퍼티가 있는지와 타입이 맞는지만 검사한다.~~ 
- 타입 검사는 프로퍼티의 순서를 요구하지 않는다.

#### Optional Properties

```typescript
interface Config {
	color?:string;
	width?:number;
}
```

#### Readonly Properties

```typescript
interface Point {
	readonly x:number;
	readonly y:number;
}
```

- 위 Point 인터페이스를 따르는 객체 p1이 있다고 할때,  `p1.x = 10` 처럼 x,y 값을 수정할 수 없다. 
- `Array<T>` 와 동일한 기능을 하지만 배열 요소를 수정할 수 없는 `ReadonlyArray<T>` 타입도 제공한다. 

- `readonly` 는 프로퍼티에, `const` 는 변수에 사용 

#### Excess Property Checks

```typescript
interface Config {
	color?:string;
	width?:number;
} 

const square : Config = {width:100, border:10};
```

- 객체 리터럴이 '대상 타입'이 갖고 있지 않은 프로퍼티를 갖고 있다면 에러 발생.

- 이를 피하기 위해 const assertion 사용 가능 

  ```typescript
  const square = {width:100, border:10} as const;
  ```

- 추가 프로퍼티가 무조건 있다면 

  ```typescript
  interface Config {
    color?:string;
    width?:string;
    [propName:string]:any;
  }
  ```

#### Function Types

```typescript
interface SearchFunc {
	(src:string, substr:string):boolean;
}
```

- 같은 위치에 대응하는 매개변수끼리 타입 검사하므로, 타입 검사를 위해 매개변수의 이름이 같을 필요는 없다. 

#### Indexable Type

```typescript
interface StringArray {
  [index:number]: string; // index signature
}

let myArr : StringArray = ['a','b'];
```

- 인덱스 타입에는 string 와 number 두가지가 있다.

- indexer 타입으로 두가지를 모두 지원하는 것은 가능하지만, 숫자 인덱서에서 반환된 타입은 반드시 문자열 인덱서에서 반환된 타입의 하위 타입이어야한다. 

  (Obj['name'] 와 Obj.name의 타입이 같기 위함)

  ```typescript
  interface NumberDictionary {
      [index: string]: number;
      length: number;  // 성공, length는 숫자
      name: string;    // 오류, `name`의 타입은 인덱서의 하위타입이 아님
  }
  ```

- 인덱스의 할당을 막으려면..

  ```typescript
  interface ReadonlyStringArray {
  	readonly [index:number]:string;
  }
  
  let myArr : ReadonlyStringArray = ['a','b'];
  myArr[2] = 'c'; // 오류
  ```

#### ~~Difference between the static and instance sides of classes~~

- 클래스는 기본적으로 두가지의 타입을 가지고 있다 -> static 타입과 instance 타입

#### Implementing Intefaces

```typescript
interface ClockInterface {
	time: Date;
}

class Clock implements ClockInterface {
	time:Date = new Date();
}
```

#### Extending Interfaces

```typescript
interface Shape {
	color: string;
}

interface Square extends Shape {
	width: number;
}
```

#### Hybrid Types

```typescript
interface Counter {
	(start:number): string;
	interval: number;
	reset(): void;
}

function setCounter() : Counter {
	let counter = (function(s){}) as Counter;
	counter.interval = 1000;
	counter.reset = function(){};
  return counter;
}

const c = setCounter();
c(10);
c.interval = 1000;
c.reset();
```

위 인터페이스는 함수와 객체 역할을 모두 수행한다. 

#### ~~Interface Extending Classes~~