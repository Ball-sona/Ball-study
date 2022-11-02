## Generic

```ts
function identify<T>(arg:T):T{
  return arg;
}
```

- T는 유저가 전달하는 인수의 타입을 캡처. 이를 반환타입으로 다시 사용 

- `identify<string>("Hello")` 처럼 T를 명시적으로 알려줄 수 있지만, 이를 생략하면 컴파일러가 "Hello" 를 보고 알아서 추론하기도 한다. 

#### Generic Type

```ts
interface IdentifyType {
	<U>(arg:U) : U;
}
const myIdentify : IdentifyType = identify;
```

함수의 타입을 제네릭 인터페이스로 지정해주었다. 

```ts
interface IdentifyType<U>{
  (arg:U):U;
}
const myIndenfity : IdentifyType<number> = identify;
```

제네릭 매개변수를 전체 인터페이스의 매개변수로 설정하면 인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있다. 

#### Generic Class

```ts
class GenericValue<T>{
  initValue:T;
  add(x:T,y:T) => T;
}

const myNumber = new GenericValue<number>();
myNumber.initValue = 0;
myNumber.add = (x,y)=> x+y;

const myString = new GenericValue<string>():
myString.initValue = 'hello';
myString.add = (x,y) => x+y; // 문자열 연결 
```

#### Generic Constraint

특정 타입들로만 동작하도록 제네릭 함수를 제한할 수 있다. 

```ts
interface LengthCons {
	length:number;
}

function identify<T extends LengthCons>(arg:T):T {
  return arg.length; //T 타입에 최소한 length 프로퍼티가 있어야함.
}

identify(3); //오류
identify({length:3, width:10});
```

#### Class Types in Generic

```ts
function createInstnace<T>(c:{new()=>T;}):T{
  return new c();
}
```

