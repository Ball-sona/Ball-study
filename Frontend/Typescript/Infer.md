# Infer

`infer` 은 **조건부 타입의 extends 절**에서만 사용 가능한 키워드로, 조건문 내에서 타입 추론을 하는 역할을 한다.

Utility Type 들 중 ReturnType 을 살펴보자.

```tsx
type ReturnType<T extends (...args:any) => any> = T extends (...args:any) => infer R ? R : any;
```

ReturnType의 정의를 해석해보면, 먼저 인자로 받는 T는 `(…args:any) => any` 를 extends 하고있다. 즉 인자 T는 함수의 형태여야한다는 뜻이다.

반환 부분을 살펴보자. 이 타입의 반환값은 T가 `(...args:any) => infer R` 를 extends 한다면 R 이 되고, 그렇지 않다면 any 가 되는 삼항 연산자로 이루어져있다. 이 즉슨 T 가 특정 함수**(근데 이제 이함수의 반환값 타입이 R)** 형태로 존재한다면 ReturnType의 반환값은 R 이 되고, 그렇지 않다면 any 를 반환하라는 의미와 같다.

참고

https://velog.io/@from_numpy/TypeScript-infer

나중에 이글 번역해보자!

https://levelup.gitconnected.com/using-typescript-infer-like-a-pro-f30ab8ab41c7

