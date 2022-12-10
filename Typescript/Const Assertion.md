## Const Assertion (`as const`) 

#### **타입 추론?**

변수에 타입을 지정해주지 않아도 타입스크립트가 알아서 타입을 추론 후 지정해주는 것을 말한다. 

``` typescript
let name = 'sona' //name : string
const name = 'sona' //name : 'sona'
```

let 으로 선언한 변수는 TS가 알아서 타입 추론 후 string으로 타입을 지정해주지만, const 변수는 불변하므로 값 또는 타입이 변할 일이 없기 때문에 TS는 변수의 타입을 값 자체(여기서는 sona)로 지정해버린다. 

이때 **Const Assertion**을 이용하면 let 변수에도 같은 규칙을 적용할 수 있다. 

```typescript
let name = 'sona' as const; // name : 'sona'	
let name = <const> 'sona'; // .ts 에서만 가능 

name = 'gong' // Error 
```

위처럼 let 변수에 `as const` 를 붙여 선언하게 되면 마치 const 변수로 선언한 것 같이 만들 수 있다. 

근데 const assertion을 왜쓰는건데? 

```typescript
const Color = {
	black: '#000',
	white: '#fff',
} as const;
```

Color 객체에 `as const` 를 붙이지 않는다면 타입스크립트는 객체 내부 black, white 속성에 대한 타입을 `string`으로 추론했을 것이다.  하지만 우리는 black, white을 속성값 그 자체로 불변하게 사용하고 싶고, 이 때문에 타입스크립트의 타입 추론의 범위를 좁혀주고 싶다면 Const Assertion을 사용하면 된다. 

**??? const는 수정할 일이 없어서 알아서 string대신 값으로 타입을 지정해준다며..? 언행불일치 뭔데**
