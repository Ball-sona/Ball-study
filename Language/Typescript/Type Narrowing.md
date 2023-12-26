# Type Assertion and Narrow

```tsx
const Todo = (object:any): object is TodoType => {
	return (
		object.constructor === Object &&
		"id" in object && "text" in object &&
    typeof (object as TodoType).id === "number" &&
    typeof (object as TodoType).text === "string"
	)
}
```

`is`, `in`, `as` 키워드가 들어가 있는데, 언뜻보면 코드를 완벽히 파악하기가 어렵다. 각 키워드가 뭘 의미하는지 알아보자.

## Type Assertion

Type Assertion은 '컴파일' 단계에서 타입스크립트가 타입을 검사할 때 감지하지 못하는 애매한 타입 요소들을 직접 명시해주는 것이다. 이는 `as` 키워드를 통해 명시해줄 수 있다. 

```tsx
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
```

위 코드에서 타입스크립트는 `document.getElementById('canvas')` 만을 가지고 canvas가 `HTMLElement` 중 하나를 가질 것이라는 걸 추론할 뿐, 정확히 어떤 타입을 가질 지는 알 수가 없다. 따라서 `as HTMLCanvasElement` 를 명시해줌으로써 타입 안전을 강화한다.

물론 tsx 파일이라면 아래와 같이도 명시해줄 수 있다. 

```tsx
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
```

`as` 키워드를 통해 타입을 아예 바꿔주는 것도 가능하다.

```tsx
const a = (value as any) as T;
```

예를 들면 `string` 이었던 타입을 `number` 타입으로 바꿔주고 싶을 때 사용이 가능하다. 하지만 타입을 개발자가 하드하게? 바꿀 일은 거의 없을 것 같아서 참고만 하자.

## Type Narrowing ? Type Guard?

https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

말그대로 타입을 좁혀주기.

### Using Type predicates

```
parameterName is Type
```

Type Narrowing에는 여러 방식이 있지만 type predicate을 사용하는 방법도 있다.

```tsx
function isString(test:any): test is string {
	return typeof test === 'string';
}

function main(foo:any) {
	if(isString(foo)) {
		console.log("it's string!");
		console.log(foo.length);
	}
  console.log(foo.length); // error
}
```

isString 함수의 `test is string` 이라는 type predicate를 통해 타입스크립트는 **해당 함수를 호출한 범위에서는** test를 `string` 타입으로 본다. 따라서 위 코드에서 If문 내에서는 foo를 `string` 타입으로 보아 foo.length가 가능하지만 그 범위 밖에서는 에러가 나게 되는 것이다.

